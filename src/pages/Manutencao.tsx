import React, { useState, useMemo, useEffect } from "react";
import ManutencaoTable from "../components/ManutencaoTable";
import ManutencaoFilters from "../components/ManutencaoFilters";
import { getManutencoes } from "../services/manutencoes";
import type { Manutencao } from "../services/manutencoes";

const Manutencao: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
      tipos: [] as string[],
      status: [] as string[],
    });

    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [loading, setLoading] = useState(true); // controle de carregamento

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await getManutencoes();
            setManutencoes(data);
          } catch (error) {
            console.error("Erro ao carregar manutenções:", error);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }, []);

    const filteredManutencao = useMemo(() => {
      const term = searchTerm.toLowerCase();

    return manutencoes.filter((manutencao) => {
      const matchesSearch =
        manutencao.id.toString().toLowerCase().includes(term) ||
        manutencao.patrimonio_nome.toLowerCase().includes(term);

      const matchesTipo =
        filters.tipos.length === 0 
        || filters.tipos.includes(manutencao.tipo);

      const matchesStatus =
        filters.status.length === 0 
        || filters.status.includes(manutencao.status);

      return matchesSearch && matchesTipo && matchesStatus;
    });
  }, [searchTerm, filters, manutencoes]);

  if (loading) {
    return (
      <section className="pt-4 px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
          Gerenciamento de Manutenções
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
        Gerenciamento de Manutenções
      </h2>
      
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <ManutencaoFilters
          data={manutencoes}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />
        <ManutencaoTable key={filteredManutencao.length} data={filteredManutencao} />
      </div>
    </section>
  );
};

export default Manutencao;
