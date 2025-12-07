import React, { useState, useEffect } from "react";
import { Boxes, Wrench, MessageSquare, AlertTriangle } from "lucide-react";
import Card from "../components/Dashboard/Card";
import ListPanel from "../components/Dashboard/ListPanel";
import ColumnChart from "../components/Dashboard/ColumnChart";

import { getChamados } from "../services/chamados";
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
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [manutencoes, setManutencoes] = useState<ManutencaoModel[]>([]);

  // -------------------------------
  // Carregar tudo ao montar a página
  // -------------------------------
  useEffect(() => {
    fetchChamados();
    fetchManutencoes();
  }, []);

  const fetchChamados = async () => {
    const data = await getChamados();
    setChamados(data);
  };

  const fetchManutencoes = async () => {
    const data = await getManutencoes();
    setManutencoes(data);
  };

  // -----------------------------------------
  // Transformar CHAMADOS -> formato ListPanel
  // -----------------------------------------
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

  // -----------------------------------------
  // Transformar MANUTENÇÕES -> formato ListPanel
  // -----------------------------------------
  const manutencoesList = manutencoes.map((m) => ({
    id: m.id,
    name: m.patrimonio_nome,
    date: new Date(m.data_inicio).toLocaleDateString("pt-BR"),
    status: m.status, // "pendente", "em_andamento", "concluido"
  }));

  return (
    <section className="pt-4 px-4">

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
        <Card title="Total de Itens" value={248} icon={<Boxes size={36} />} iconColor="text-blue-600" />
        <Card title="Chamados Pendentes" value={7} icon={<MessageSquare size={36} />} iconColor="text-green-500" />
        <Card title="Manutenções Ativas" value={12} icon={<Wrench size={36} />} iconColor="text-orange-500" />
        <Card title="Itens em Manutenção" value={34} icon={<AlertTriangle size={36} />} iconColor="text-red-500" />
      </div>

      {/* Gráfico à esquerda e listas à direita */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">

        {/* Gráfico */}
        <div>
          <ColumnChart data={chartData} />
        </div>

        {/* Listas */}
        <div className="flex flex-col gap-8">

          <ListPanel
            title="Chamados Recentes"
            items={chamadosList.slice(0, 5)} // mostra só os 5 mais recentes
          />

          <ListPanel
            title="Manutenções Recentes"
            items={manutencoesList.slice(0, 5)}
          />

        </div>

      </div>

    </section>
  );
};

export default Home;
