import React, { useMemo } from "react";
import { Search } from "lucide-react";
import MultiFilterDropdown from "./MultiFilterDropdown";
import SearchBar from "./SearchBar";
import itensData from "../data/itens.json";

interface ItensFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    categorias: string[];
    status: string[];
    localizacoes: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      categorias: string[];
      status: string[];
      localizacoes: string[];
    }>
  >;
}

const ItensFilters: React.FC<ItensFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const categorias = useMemo(
    () => Array.from(new Set(itensData.map((i) => i.categoria))),
    []
  );
  const statusList = useMemo(
    () => Array.from(new Set(itensData.map((i) => i.status))),
    []
  );
  const localizacoes = useMemo(
    () => Array.from(new Set(itensData.map((i) => i.local_instalacao))),
    []
  );

  const updateFilter = (key: keyof typeof filters, values: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const clearFilters = () => {
    setFilters({ categorias: [], status: [], localizacoes: [] });
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
        className="flex-grow min-w-[200px] pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Buscar por ID ou nome..."
      />
      <MultiFilterDropdown
        label="Categorias"
        options={categorias}
        selected={filters.categorias}
        onChange={(v) => updateFilter("categorias", v)}
      />
      <MultiFilterDropdown
        label="Status"
        options={statusList}
        selected={filters.status}
        onChange={(v) => updateFilter("status", v)}
      />
      <MultiFilterDropdown
        label="Localizações"
        options={localizacoes}
        selected={filters.localizacoes}
        onChange={(v) => updateFilter("localizacoes", v)}
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

export default ItensFilters;
