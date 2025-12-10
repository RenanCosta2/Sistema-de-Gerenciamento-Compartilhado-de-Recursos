import React, { useMemo } from "react";
import { Search } from "lucide-react";
import MultiFilterDropdown from "../Utils/MultiFilterDropdown";
import SearchBar from "../Utils/SearchBar";
import type { Manutencao } from "../../services/manutencoes";

interface ManutencaoFiltersProps {
  data: Manutencao[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    status: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string[];
    }>
  >;
}

const ManutencaoFilters: React.FC<ManutencaoFiltersProps> = ({
  data,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const statusMap: Record<string, string> = {
    pendente: "Pendente",
    em_andamento: "Em Andamento",
    concluido: "Concluído",
  };

  const statusList = useMemo(() => {
      const unique = Array.from(new Set(data.map((i) => i.status)));
      return unique.map((status) => ({
        value: status,
        label: statusMap[status] || status,
      }));
    }, [data]);

  const updateFilter = (key: keyof typeof filters, values: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const clearFilters = () => {
    setFilters({ status: []});
    setSearchTerm("");
  };

  return (
    <div className="w-full flex flex-nowrap items-center gap-4 mb-6 relative">
      {/* Ícone de lupa */}
      <Search
        size={18}
        className="absolute left-3 text-gray-500 pointer-events-none"
      />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="min-w-[200px] flex-grow pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Buscar por ID ou item..."
      />
      <MultiFilterDropdown
        label="Status"
        options={statusList}
        selected={filters.status}
        onChange={(v) => updateFilter("status", v)}
      />
      <button
        onClick={clearFilters}
        className="cursor-pointer bg-gray-200 select-none border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:border-gray-400 min-w-[150px] hover:bg-gray-300"
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export default ManutencaoFilters;
