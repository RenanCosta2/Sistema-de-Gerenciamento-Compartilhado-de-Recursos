import React, { useMemo } from "react";
import { Search } from "lucide-react";
import MultiFilterDropdown from "../Utils/MultiFilterDropdown";
import SearchBar from "../Utils/SearchBar";
import type { Historico } from "../../services/historico";

interface HistoricoFiltersProps {
  data: Historico[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: {
    status: string[];
    tipo: string[];
    localizacao: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      status: string[];
      tipo: string[];
      localizacao: string[];
    }>
  >;
}

const HistoricoFilters: React.FC<HistoricoFiltersProps> = ({
  data,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
}) => {
  const statusMap: Record<string, string> = {
    pendente: "Pendente",
    aberto: "Aberto",
    em_andamento: "Em Andamento",
    em_analise: "Em Análise",
    resolvido: "Resolvido",
    concluido: "Concluído",
  };

  const tipoMap: Record<string, string> = {
    manutencao: "Manutenção",
    solicitacao: "Chamado"
  };

  const statusList = useMemo(() => {
      const unique = Array.from(new Set(data.map((i) => i.status)));
      return unique.map((status) => ({
        value: status,
        label: statusMap[status] || status,
      }));
    }, [data]);

  const tipoList = useMemo(() => {
      const unique = Array.from(new Set(data.map((i) => i.tipo)));
      return unique.map((tipo) => ({
        value: tipo,
        label: tipoMap[tipo] || tipo,
      }));
    }, [data]);

  const localizacaoList = useMemo(() => {
      const unique = Array.from(new Set(data.map((i) => i.localizacao)));
      return unique.map((localizacao) => ({
        value: localizacao,
        label: localizacao,
      }));
    }, [data]);

  const updateFilter = (key: keyof typeof filters, values: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const clearFilters = () => {
    setFilters({ 
      status: [], 
      tipo: [],
      localizacao: [],
    });
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
        placeholder="Buscar por item ou número do tombo..."
      />
      
      <MultiFilterDropdown
        label="Localização"
        options={localizacaoList}
        selected={filters.localizacao}
        onChange={(v) => updateFilter("localizacao", v)}
      />

      <MultiFilterDropdown
        label="Status"
        options={statusList}
        selected={filters.status}
        onChange={(v) => updateFilter("status", v)}
      />
      
      <MultiFilterDropdown
        label="Tipo"
        options={tipoList}
        selected={filters.tipo}
        onChange={(v) => updateFilter("tipo", v)}
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

export default HistoricoFilters;
