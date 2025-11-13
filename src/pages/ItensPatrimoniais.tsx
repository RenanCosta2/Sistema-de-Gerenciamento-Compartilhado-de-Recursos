import React, { useState, useMemo, useEffect } from "react";
import ItensTable from "../components/ItensTable";
import ItensFilters from "../components/ItensFilters";
import { getItens } from "../services/itens";
import type { Item } from "../services/itens";

const ItensPatrimoniais: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categorias: [] as string[],
    status: [] as string[],
    localizacoes: [] as string[],
  });

  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true); // controle de carregamento

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getItens();
        setItens(data);
      } catch (error) {
        console.error("Erro ao carregar itens:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredItens = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return itens.filter((item) => {
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
        filters.localizacoes.includes(item.localizacao);

      return (
        matchesSearch &&
        matchesCategoria &&
        matchesStatus &&
        matchesLocalizacao
      );
    });
  }, [searchTerm, filters, itens]);

  if (loading) {
    return (
      <section className="pt-4 px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
          Gerenciamento de Itens Patrimoniais
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
        Gerenciamento de Itens Patrimoniais
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <ItensFilters
          data={itens}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        <ItensTable key={filteredItens.length} data={filteredItens} />
      </div>
    </section>
  );
};

export default ItensPatrimoniais;
