import React, { useState, useMemo, useEffect } from "react";

import HistoricoTable from "../components/Historico/HistoricoTable";
import HistoricoFilters from "../components/Historico/HistoricoFilters";
import { getHistorico } from "../services/historico";
import type { Historico } from "../services/historico";

import ManutencaoViewModal from "../components/Manutencao/ManutencaoViewModal";

const Historico: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({ 
      status: [] as string[],
      tipo: [] as string[],
      localizacao: [] as string[],
    });

    const [historico, setHistorico] = useState<Historico[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchManutencoes = async () => {
        const data = await getHistorico();
        setHistorico(data);
      };
    
      useEffect(() => {
        fetchManutencoes().finally(() => setLoading(false));
      }, []);

    const [viewOpen, setViewOpen] = useState(false);

    const [selected, setSelected] = useState<Historico | null>(null);

    const handleView = (registro: Historico) => {
        setSelected(registro);
        setViewOpen(true);
      };
    

    const filteredHistorico = useMemo(() => {
        const term = searchTerm.toLowerCase();
    
        return historico.filter((h) => {
          const matchesSearch =
            h.numero_tombo.toString().includes(term) ||
            h.nome_item.toLowerCase().includes(term);
    
          const matchesStatus =
            filters.status.length === 0 || filters.status.includes(h.status);
    
          const matchesTipo =
            filters.tipo.length === 0 || filters.tipo.includes(h.tipo);
    
          const matchesLocalizacao =
            filters.localizacao.length === 0 || filters.localizacao.includes(h.localizacao);
    
          return matchesSearch && matchesStatus && matchesTipo && matchesLocalizacao;
        });
      }, [searchTerm, filters, historico]);

    if (loading) {
        return (
        <section className="pt-4 px-4">
            <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
            Histórico de Ações
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <p>Carregando dados...</p>
            </div>
        </section>
        );
    }


  return (

    <section className="pt-4 px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
            Histórico de Ações
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            {/* filtros */}
            <HistoricoFilters
              data={historico}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
            />
            {/* botão */}
            <div className="mt-4 mb-4">
            </div>
            <HistoricoTable
              data={filteredHistorico}
              onView={handleView}
            />
          </div>

          {/* VIEW */}
          <ManutencaoViewModal
            open={viewOpen}
            data={selected}
            onClose={() => setViewOpen(false)}
          />
    </section>
  );
};

export default Historico;
