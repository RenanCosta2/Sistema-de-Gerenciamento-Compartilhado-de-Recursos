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

const STATUS_CORRECTIONS: Record<string, string> = {
  "aberto": "Aberto",
  "em analise": "Em Análise",
  "em andamento": "Em Andamento",
  "aguardando atendimento": "Aguardando Atendimento",
  "pendente": "Pendente",
  "resolvido": "Resolvido",
  "cancelado": "Cancelado",
};

const formatStatus = (text: string) => {
  if (!text) return "";
  const normalized = text.toLowerCase().replace(/_/g, " ");

  // Se existir correção com acento, usa
  if (STATUS_CORRECTIONS[normalized]) {
    return STATUS_CORRECTIONS[normalized];
  }

  // fallback: title case puro
  return normalized
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

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
    status: formatStatus(c.status),
  }));

  const manutencoesList = manutencoes.map((m) => ({
    id: m.id,
    name: m.patrimonio_nome,
    date: new Date(m.data_inicio).toLocaleDateString("pt-BR"),
    status: m.status, // "pendente", "em_andamento", "concluido"
  }));

  const ALL_STATUS = ["aberto", "em_analise", "resolvido", "cancelado"];

  const STATUS_COLORS: Record<string, string> = {
    "aberto": "#1D4ED8",
    "em_analise": "#B45309",
    "resolvido": "#15803D",
    "cancelado": "#B91C1C",
  };


  // Conta os status existentes
  const rawStatusCount = chamados.reduce((acc, c) => {
    const status = c.status?.toLowerCase() || "desconhecido";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Garante todos os status com mínimo 0
  const statusCountData = ALL_STATUS.map((s) => {
    const rawLabel = s.replace(/_/g, " ");
    return {
      name: formatStatus(rawLabel),
      value: rawStatusCount[s] || 0,
      color: STATUS_COLORS[s] || "#374151",
    };
  });

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">

        <div className="flex flex-col gap-6">

          {!isPrivileged && (
            <Card
              title="Meus Chamados"
              value={chamados.length}
              icon={<MessageSquare size={36} />}
              iconColor="text-blue-600"
            />
          )}

          <div>
            {isPrivileged ? (
              <ColumnChart data={chartData} titulo="Visão Geral"/>
            ) : (
              <ColumnChart data={statusCountData} titulo="Chamados por Status"/>
            )}
          </div>

        </div>

          
        <div className="flex flex-col gap-8">
          <ListPanel
            title="Chamados Pendentes"
            items={chamadosList.slice(0, 5)}
          />

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
