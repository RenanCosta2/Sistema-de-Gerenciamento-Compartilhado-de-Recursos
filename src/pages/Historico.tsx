import React, { useState, useMemo, useEffect } from "react";

import ManutencaoTable from "../components/Manutencao/ManutencaoTable";
import ManutencaoFilters from "../components/Manutencao/ManutencaoFilters";
import { getManutencoes } from "../services/manutencoes";
import type { Manutencao as ManutencaoModel } from "../services/manutencoes";

import { getItens } from "../services/itens";
import type { Item } from "../services/itens";

const Historico: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({ status: [] as string[] });
    const [itens, setItens] = useState<Item[]>([]);


    const [manutencoes, setManutencoes] = useState<ManutencaoModel[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchManutencoes = async () => {
        const data = await getManutencoes();
        setManutencoes(data);
      };
    
      useEffect(() => {
        getItens().then(setItens).catch(console.error);
        fetchManutencoes().finally(() => setLoading(false));
      }, []);

    const filteredManutencao = useMemo(() => {
        const term = searchTerm.toLowerCase();
    
        return manutencoes.filter((m) => {
          const matchesSearch =
            m.id.toString().includes(term) ||
            m.patrimonio_nome.toLowerCase().includes(term);
    
          const matchesStatus =
            filters.status.length === 0 || filters.status.includes(m.status);
    
          return matchesSearch && matchesStatus;
        });
      }, [searchTerm, filters, manutencoes]);

    if (loading) {
        return (
        <section className="pt-4 px-4">
            <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
            Gerenciamento de Manutenções
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
            Gerenciamento de Manutenções
          </h2>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            {/* filtros */}
            <ManutencaoFilters
              data={manutencoes}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filters={filters}
              setFilters={setFilters}
            />
            {/* botão */}
            <div className="mt-4 mb-4">
            </div>
            <ManutencaoTable
              data={filteredManutencao}
            />
          </div>
        
        <div>
            <p>código</p>
            <p>nome do item</p>
            <p>número do tombo</p>
            <p>localização</p>
            <p>status</p>
            <p>tipo (chamado ou manutencao)</p>
            <p>data de abertura</p>
            <p>data de atualização</p>
        </div>
    </section>
  );
};

export default Historico;
