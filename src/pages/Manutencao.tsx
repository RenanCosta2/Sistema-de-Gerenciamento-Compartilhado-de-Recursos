import React, { useState, useMemo, useEffect } from "react";
import ManutencaoTable from "../components/Manutencao/ManutencaoTable";
import ManutencaoFilters from "../components/Manutencao/ManutencaoFilters";
import ManutencaoAddModal from "../components/Manutencao/ManutencaoAddModal";
import ManutencaoViewModal from "../components/Manutencao/ManutencaoViewModal";
import ManutencaoEditModal from "../components/Manutencao/ManutencaoEditModal";
import ManutencaoDeleteModal from "../components/Manutencao/ManutencaoDeleteModal";

import { getManutencoes } from "../services/manutencoes";
import type { Manutencao } from "../services/manutencoes";

import { getItens } from "../services/itens";
import type { Item } from "../services/itens";

const Manutencao: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: [] as string[] });

  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [loading, setLoading] = useState(true);

  const [itens, setItens] = useState<Item[]>([]);

  const fetchManutencoes = async () => {
    const data = await getManutencoes();
    setManutencoes(data);
  };

  useEffect(() => {
    getItens().then(setItens).catch(console.error);
    fetchManutencoes().finally(() => setLoading(false));
  }, []);

  // --------------------------
  // Modal States
  // --------------------------
  const [openAddModal, setOpenAddModal] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Manutencao | null>(null);

  // --------------------------
  // Handlers
  // --------------------------
  const handleView = (registro: Manutencao) => {
    setSelected(registro);
    setViewOpen(true);
  };

  const handleEdit = (registro: Manutencao) => {
    setSelected(registro);
    setEditOpen(true);
  };

  const handleDelete = (registro: Manutencao) => {
    setSelected(registro);
    setDeleteOpen(true);
  };

  const handleUpdated = async () => {
    setEditOpen(false);
    setSelected(null);
    await fetchManutencoes();
  };

  const handleDeleted = async () => {
    setDeleteOpen(false);
    setSelected(null);
    await fetchManutencoes();
  };

  // --------------------------
  // Filtro e busca
  // --------------------------
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

  // --------------------------
  // Loading
  // --------------------------
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

  // --------------------------
  // Render
  // --------------------------
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
          data={filteredManutencao}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* ADD */}
      <ManutencaoAddModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        itens={itens}
        onCreated={fetchManutencoes}
      />

      {/* VIEW */}
      <ManutencaoViewModal
        open={viewOpen}
        data={selected}
        onClose={() => setViewOpen(false)}
      />

      {/* EDIT */}
      <ManutencaoEditModal
        open={editOpen}
        manutencao={selected}
        patrimonios={itens}
        onClose={() => setEditOpen(false)}
        onUpdated={handleUpdated}
      />

      {/* DELETE */}
      <ManutencaoDeleteModal
        open={deleteOpen}
        manutencao={selected}
        onClose={() => setDeleteOpen(false)}
        onDeleted={handleDeleted}
      />
    </section>
  );
};

export default Manutencao;
