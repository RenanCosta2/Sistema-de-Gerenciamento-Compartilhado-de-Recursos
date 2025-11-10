import React, { useState, useMemo } from "react";
import ItensTable from "../components/ItensTable";
import ItensFilters from "../components/ItensFilters";
import itensData from "../data/itens.json";

const ItensPatrimoniais: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categorias: [] as string[],
    status: [] as string[],
    localizacoes: [] as string[],
  });

  const filteredItens = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return itensData.filter((item) => {
      const matchesSearch =
        item.id.toString().toLowerCase().includes(term) ||
        item.nome.toLowerCase().includes(term);

      const matchesCategoria =
        filters.categorias.length === 0 ||
        filters.categorias.includes(item.categoria);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(item.status);

      const matchesLocalizacao =
        filters.localizacoes.length === 0 ||
        filters.localizacoes.includes(item.local_instalacao);

      return matchesSearch && matchesCategoria && matchesStatus && matchesLocalizacao;
    });
  }, [searchTerm, filters]);

  return (
    <section className="pt-24 px-4">
      <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
        Gerenciamento de Itens Patrimoniais
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <ItensFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />
        {/* Adicione uma key baseada no filteredItens para forçar resetar a página */}
        <ItensTable key={filteredItens.length} data={filteredItens} />
      </div>
    </section>
  );
};

export default ItensPatrimoniais;
