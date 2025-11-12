import React, { useMemo } from "react";
import MultiFilterDropdown from "./MultiFilterDropdown";
import SearchBar from "./SearchBar";
import itensData from "../data/itens.json";

interface ManutencaoFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    tipos: string[];
    status: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      tipos: string[];
      status: string[];
    }>
  >;
}

const ManutencaoFilters: React.FC<ManutencaoFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const tipos = useMemo(
    () => Array.from(new Set(itensData.map((i) => i.categoria))),
    []
  );
  const statusList = useMemo(
    () => Array.from(new Set(itensData.map((i) => i.status))),
    []
  );

  const updateFilter = (key: keyof typeof filters, values: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const clearFilters = () => {
    setFilters({ tipos: [], status: []});
    setSearchTerm("");
  };

  return (
    <div className="w-full flex flex-nowrap items-center gap-4 mb-6">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="flex-grow min-w-[200px]"
        placeholder="Pesquisar por item ou ID"
      />
      <MultiFilterDropdown
        label="Tipos"
        options={tipos}
        selected={filters.tipos}
        onChange={(v) => updateFilter("tipos", v)}
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
