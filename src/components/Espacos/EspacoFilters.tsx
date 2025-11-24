import React, { useMemo } from "react";
import { Search } from "lucide-react";
import MultiFilterDropdown from "../Utils/MultiFilterDropdown";
import SearchBar from "../Utils/SearchBar";


interface Espaco {
  id: number;
  nome: string;
  tipo: string;
  bloco?: string;
  areaExterna: boolean;
}

interface EspacoFiltersProps {
  data: Espaco[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    tipos: string[];
    blocos: string[];
    areaExterna: boolean | null;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      tipos: string[];
      blocos: string[];
      areaExterna: boolean | null;
    }>
  >;
}

const EspacoFilters: React.FC<EspacoFiltersProps> = ({
  data,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const tipos = useMemo(
    () => Array.from(new Set(data.map((i) => i.tipo))),
    [data]
  );

  const blocos = useMemo(
    () => Array.from(new Set(data.filter(i => !i.areaExterna).map(i => i.bloco || ""))),
    [data]
  );

  const updateFilter = (key: keyof typeof filters, values: any) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const clearFilters = () => {
    setFilters({ tipos: [], blocos: [], areaExterna: null });
    setSearchTerm("");
  };

  return (
    <div className="w-full flex flex-nowrap items-center gap-4 mb-6 relative">
      <Search
        size={18}
        className="absolute left-3 text-gray-500 pointer-events-none"
      />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="flex-grow min-w-[200px] pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Buscar por nome..."
      />

      <MultiFilterDropdown
        label="Tipo"
        options={tipos.map((c) => ({ value: c, label: c }))}
        selected={filters.tipos}
        onChange={(v) => updateFilter("tipos", v)}
      />

      <MultiFilterDropdown
        label="Bloco"
        options={blocos.map((b) => ({ value: b, label: b }))}
        selected={filters.blocos}
        onChange={(v) => updateFilter("blocos", v)}
      />

      <MultiFilterDropdown
        label="Área"
        options={[
          { value: "true", label: "Área Externa" },
          { value: "false", label: "Área Interna" },
        ]}
        selected={
          filters.areaExterna === null
            ? []
            : [filters.areaExterna ? "true" : "false"]
        }
        onChange={(v) => updateFilter("areaExterna", v.length ? v[0] === "true" : null)}
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

export default EspacoFilters;
