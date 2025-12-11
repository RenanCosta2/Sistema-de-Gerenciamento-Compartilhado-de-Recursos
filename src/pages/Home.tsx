import React, { useState, useEffect } from "react";
import { Boxes, Wrench, MessageSquare, Clock, CheckCircle } from "lucide-react";
import Card from "../components/Dashboard/Card";
import ListPanel from "../components/Dashboard/ListPanel";
import ColumnChart from "../components/Dashboard/ColumnChart";
import { useAuth } from "../components/Auth/AuthContext";

import { getChamados } from "../services/chamados";
import { getMeusChamados } from "../services/chamados";
import type { Chamado } from "../services/chamados";
import { getManutencoes } from "../services/manutencoes";
import type { Manutencao as ManutencaoModel } from "../services/manutencoes";
import { getItens } from "../services/itens";
import type { Item } from "../services/itens";

const STATUS_CORRECTIONS: Record<string, string> = {
  "aberto": "Aberto",
  "em analise": "Em Análise",
  "em_andamento": "Em Andamento",
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
  const [itens, setItens] = useState<Item[]>([]);

  const isPrivileged = user?.tipo_usuario === "admin" || user?.tipo_usuario === "servidor";

  useEffect(() => {
    fetchChamados();
    fetchManutencoes();
    fetchItens();
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

  const fetchItens = async () => {
    const data = await getItens();
    setItens(data);
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

  const chamadosResolvidos = chamados
  .filter((c) => {
    const s = c.status.toLowerCase();
    return s === "resolvido";
  })
  .map((c) => ({
    id: c.id,
    name: c.titulo + " - " + c.patrimonio_nome,
    date: c.data_criacao
      ? new Date(c.data_criacao).toLocaleString("pt-BR")
      : "Sem data",
    status: formatStatus(c.status),
  }));

  const manutencoesList = manutencoes
  .filter((m) => {
    const s = m.status.toLowerCase();
    return s !== "concluido";
  })
  .map((m) => ({
    id: m.id,
    name: m.patrimonio_nome,
    date: new Date(m.data_inicio).toLocaleDateString("pt-BR"),
    status: formatStatus(m.status),
  }));

  const CHAM_STATUS = ["aberto", "em_analise", "resolvido", "cancelado"];
  const MANUT_STATUS = ["pendente", "em_andamento", "concluido"];

  const STATUS_COLORS: Record<string, string> = {
    "aberto": "#1D4ED8",
    "pendente": "#1D4ED8",
    "em_analise": "#B45309",
    "em_andamento": "#B45309",
    "resolvido": "#15803D",
    "concluido": "#15803D",
    "cancelado": "#B91C1C",
  };


  // Conta os status existentes
  const rawChamStatusCount = chamados.reduce((acc, c) => {
    const status = c.status?.toLowerCase() || "desconhecido";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const rawManutStatusCount = manutencoes.reduce((acc, m) => {
    const status = m.status?.toLowerCase() || "desconhecido";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Garante todos os status com mínimo 0
  const chamStatusCountData = CHAM_STATUS.map((s) => {
    const rawLabel = s.replace(/_/g, " ");
    return {
      name: formatStatus(rawLabel),
      value: rawChamStatusCount[s] || 0,
      color: STATUS_COLORS[s] || "#374151",
    };
  });

  const manutStatusCountData = MANUT_STATUS.map((s) => {
    const rawLabel = s.replace(/_/g, " ");
    return {
      name: formatStatus(rawLabel),
      value: rawManutStatusCount[s] || 0,
      color: STATUS_COLORS[s] || "#374151",
    };
  });


  return (
    <section className="pt-4 px-4">
      
      {isPrivileged ? (
        // SE for admin/servidor
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
          <Card 
            title="Total de Itens" 
            value={itens.length} 
            icon={<Boxes size={36} />} 
            iconColor="text-blue-600" 
          />
          <Card 
            title="Chamados Pendentes" 
            value={chamadosList.length} 
            icon={<MessageSquare size={36} />} 
            iconColor="text-green-500" 
          />
          <Card 
            title="Manutenções Ativas" 
            value={manutencoes.filter((m) => m.status.toLowerCase() === "em_andamento").length} 
            icon={<Wrench size={36} />} 
            iconColor="text-orange-500" 
          />
        </div>
      ) : (
        // SENÃO (não é admin)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 py-4">
          <Card 
            title="Chamados Pendentes" 
            value={chamadosList.length} 
            icon={<Clock size={36} />} 
            iconColor="text-blue-500" 
          />

          <Card 
            title="Chamados Resolvidos" 
            value={chamadosResolvidos.length} 
            icon={<CheckCircle size={36} />} 
            iconColor="text-green-500" 
          />
        </div>
      )}

      {isPrivileged ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
          <div className="flex flex-col gap-8">
            <ColumnChart 
              data={chamStatusCountData} 
              titulo="Chamados por Status"
            />

            <ListPanel
              title="Chamados Pendentes"
              items={chamadosList.slice(0, 5)}
            />
          </div>

          <div className="flex flex-col gap-8">
            <ColumnChart 
              data={manutStatusCountData} 
              titulo="Manutenções por Status"
            />

            <ListPanel
              title="Manutenções Pendentes"
              items={manutencoesList.slice(0, 5)}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
          <ColumnChart 
            data={chamStatusCountData} 
            titulo="Chamados por Status"
          />

          <ListPanel
            title="Chamados Pendentes"
            items={chamadosList.slice(0, 5)}
          />
        </div>
      )}

    </section>
  );
};

export default Home;
