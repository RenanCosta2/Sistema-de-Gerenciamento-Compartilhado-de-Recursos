import React from "react";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

interface ChamadosFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ChamadosFilters: React.FC<ChamadosFiltersProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="flex flex-nowrap items-center mb-6 relative w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px]">
      {/* Ícone de lupa */}
      <Search
        size={18}
        className="absolute left-3 text-gray-500 pointer-events-none"
      />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        className="flex-grow pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        placeholder="Buscar por ID ou título..."
      />
    </div>
  );
};

export default ChamadosFilters;
