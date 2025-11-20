import React, { useState, useMemo, useEffect } from "react";
import ManutencaoTable from "../components/ManutencaoTable";
import ManutencaoFilters from "../components/ManutencaoFilters";
import ManutencaoAddModal from "../components/ManutencaoAddModal";
import { getManutencoes } from "../services/manutencoes";
import type { Manutencao } from "../services/manutencoes";
import { getItens } from "../services/itens";
import type { Item } from "../services/itens";

const Manutencao: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: [] as string[],
  });
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [loading, setLoading] = useState(true);

  const [itens, setItens] = useState<Item[]>([]);
    
    useEffect(() => {
    async function fetchData() {
        try {
        const data = await getItens();
        setItens(data);
        } catch (error) {
        console.error("Erro ao carregar itens:", error);
        }
    }
    fetchData();
    }, []);

  useEffect(() => {
    fetchManutencoes();
  }, []);

  async function fetchManutencoes() {
    const data = await getManutencoes();
    setManutencoes(data);
  }

  // controle modal
  const [openAddModal, setOpenAddModal] = useState(false);

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

    return manutencoes.filter((m) => {
      const matchesSearch =
        m.id.toString().includes(term) ||
        m.patrimonio_nome.toLowerCase().includes(term);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(m.status);

      return matchesSearch && matchesStatus;
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

        {/* filtros */}
        <ManutencaoFilters
          data={manutencoes}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        {/* botão */}
        <div className="mt-4 mb-4">
          <button
            onClick={() => setOpenAddModal(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Adicionar nova manutenção
          </button>
        </div>

        <ManutencaoTable
          key={filteredManutencao.length}
          data={filteredManutencao}
        />
      </div>

      {/* modal */}
      <ManutencaoAddModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        itens={itens}
        onCreated={fetchManutencoes}
      />
    </section>
  );
};

export default Manutencao;
