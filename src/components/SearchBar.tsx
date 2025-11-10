import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, className }) => {
  return (
    <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Buscar por nome ou código do item..."
    className={`w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 flex-grow min-w-[200px] ${className}`}
    />
  );
};

export default SearchBar;
