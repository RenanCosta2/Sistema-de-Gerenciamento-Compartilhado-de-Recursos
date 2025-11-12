import React, { useState, useMemo } from "react";
import ManutencaoTable from "../components/ManutencaoTable";
import manutencaoData from "../data/manutencao.json";
import ManutencaoFilters from "../components/ManutencaoFilters";

const Manutencao: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
      tipos: [] as string[],
      status: [] as string[],
    });

  const filteredManutencao = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return manutencaoData.filter((item) => {
      const matchesSearch =
        item.id.toString().toLowerCase().includes(term) ||
        item.item.toLowerCase().includes(term);

      const matchesTipo =
        filters.tipos.length === 0 ||
        filters.tipos.includes(item.tipo);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(item.status);

      return matchesSearch && matchesTipo && matchesStatus;
    });
  }, [searchTerm, filters]);

  return (
    <section className="pt-4 px-4">
      <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
        Gerenciamento de Manutenções
      </h2>
      
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <ManutencaoFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />
        {/* Adicione uma key baseada no filteredManutencao para forçar resetar a página */}
        <ManutencaoTable key={filteredManutencao.length} data={filteredManutencao} />
      </div>
    </section>
  );
};

export default Manutencao;
