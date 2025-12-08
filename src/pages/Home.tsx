import React, { useState, useEffect } from "react";
import { Boxes, Wrench, MessageSquare, AlertTriangle } from "lucide-react";
import Card from "../components/Dashboard/Card";
import ListPanel from "../components/Dashboard/ListPanel";
import ColumnChart from "../components/Dashboard/ColumnChart";
import { useAuth } from "../components/Auth/AuthContext";

import { getChamados } from "../services/chamados";
import { getMeusChamados } from "../services/chamados";
import type { Chamado } from "../services/chamados";
import { getManutencoes } from "../services/manutencoes";
import type { Manutencao as ManutencaoModel } from "../services/manutencoes";

const chartData = [
  { name: "Seg", value: 12 },
  { name: "Ter", value: 19 },
  { name: "Qua", value: 7 },
  { name: "Qui", value: 15 },
  { name: "Sex", value: 9 },
];

const Home: React.FC = () => {
  const { user } = useAuth();
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [manutencoes, setManutencoes] = useState<ManutencaoModel[]>([]);

  const isPrivileged = user?.tipo_usuario === "admin" || user?.tipo_usuario === "servidor";

  // -------------------------------
  // Carregar tudo ao montar a página
  // -------------------------------
  useEffect(() => {
    fetchChamados();
    fetchManutencoes();
  }, []);

  const fetchChamados = async () => {
    if (isPrivileged) {
      const data = await getChamados();
      setChamados(data);
    } else{
      const data = await getMeusChamados();
      setChamados(data);
    }
  };

  const fetchManutencoes = async () => {
    const data = await getManutencoes();
    setManutencoes(data);
  };

  const chamadosList = chamados
  .filter((c) => {
    const s = c.status.toLowerCase();
    return s !== "cancelado" && s !== "resolvido";
  })
  .map((c) => ({
    id: c.id,
    name: c.titulo + " - " + c.patrimonio_nome,
    date: c.data_criacao
      ? new Date(c.data_criacao).toLocaleString("pt-BR")
      : "Sem data",
    status: c.status,
  }));

  const manutencoesList = manutencoes.map((m) => ({
    id: m.id,
    name: m.patrimonio_nome,
    date: new Date(m.data_inicio).toLocaleDateString("pt-BR"),
    status: m.status, // "pendente", "em_andamento", "concluido"
  }));

  const statusCountData = Object.entries(
    chamados.reduce((acc, c) => {
      const status = c.status || "Desconhecido";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <section className="pt-4 px-4">
      
      {/* SOMENTE admin/servidor veem cards */}
      {isPrivileged && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
          <Card title="Total de Itens" value={248} icon={<Boxes size={36} />} iconColor="text-blue-600" />
          <Card title="Chamados Pendentes" value={7} icon={<MessageSquare size={36} />} iconColor="text-green-500" />
          <Card title="Manutenções Ativas" value={12} icon={<Wrench size={36} />} iconColor="text-orange-500" />
          <Card title="Itens em Manutenção" value={34} icon={<AlertTriangle size={36} />} iconColor="text-red-500" />
        </div>
      )}

      {/* Card exclusivo para usuário comum */}
      {!isPrivileged && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
          <Card
            title="Minhas Solicitações"
            value={chamados.length}
            icon={<MessageSquare size={36} />}
            iconColor="text-blue-600"
          />
        </div>
      )}

      <div className={`grid grid-cols-1 ${isPrivileged ? "lg:grid-cols-2" : ""} gap-8 py-4`}>
        
        <div>
          {isPrivileged ? (
            <ColumnChart data={chartData} />
          ) : (
            <ColumnChart data={statusCountData} />
          )}
        </div>

        {/* Painéis */}
        <div className="flex flex-col gap-8">

          <ListPanel
            title="Chamados Pendentes"
            items={chamadosList.slice(0, 5)}
          />

          {/* Manutenções só para admin/servidor */}
          {isPrivileged && (
            <ListPanel
              title="Manutenções Pendentes"
              items={manutencoesList.slice(0, 5)}
            />
          )}

        </div>
      </div>

    </section>
  );
};

export default Home;
