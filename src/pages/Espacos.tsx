import React, { useState, useMemo, useEffect } from "react";

import EspacoAddModal from "../components/Espacos/EspacoAddModal";
import EspacoViewModal from "../components/Espacos/EspacoViewModal";
import EspacoEditModal from "../components/Espacos/EspacoEditModal";
import EspacoDeleteModal from "../components/Espacos/EspacoDeleteModal";

import EspacoFilters from "../components/Espacos/EspacoFilters";
import EspacoTable from "../components/Espacos/EspacoTable";

import { getEspacos, type Espaco } from "../services/espaco";

const Espacos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    tipos: [] as string[],
    blocos: [] as string[]
  });

  const [espacos, setEspacos] = useState<Espaco[]>([]);
  const [loading, setLoading] = useState(true);

  // --------------------------
  // Fetch inicial
  // --------------------------
  const fetchEspacos = async () => {
    const data = await getEspacos();
    setEspacos(data);
  };

  useEffect(() => {
    fetchEspacos().finally(() => setLoading(false));
  }, []);

  // --------------------------
  // Modal States
  // --------------------------
  const [openAddModal, setOpenAddModal] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Espaco | null>(null);

  // --------------------------
  // Handlers (iguais manutenção)
  // --------------------------
  const handleView = (registro: Espaco) => {
    setSelected(registro);
    setViewOpen(true);
  };

  const handleEdit = (registro: Espaco) => {
    setSelected(registro);
    setEditOpen(true);
  };

  const handleDelete = (registro: Espaco) => {
    setSelected(registro);
    setDeleteOpen(true);
  };

  const handleUpdated = async () => {
    setEditOpen(false);
    setSelected(null);
    await fetchEspacos();
  };

  const handleDeleted = async () => {
    setDeleteOpen(false);
    setSelected(null);
    await fetchEspacos();
  };

  // --------------------------
  // Filtragem
  // --------------------------
  const filteredEspacos = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return espacos.filter((e) => {
      const matchesSearch = e.nome.toLowerCase().includes(term);

      const matchesTipo =
        filters.tipos.length === 0 || filters.tipos.includes(e.tipo);

      const matchesBloco =
        filters.blocos.length === 0 ||
        (e.bloco && filters.blocos.includes(e.bloco));

      return matchesSearch && matchesTipo && matchesBloco;
    });
  }, [searchTerm, filters, espacos]);

  // --------------------------
  // Loading state
  // --------------------------
  if (loading) {
    return (
      <section className="pt-4 px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
          Gerenciamento de Espaços Físicos
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
        Gerenciamento de Espaços Físicos
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

        {/* Filtros */}
        <EspacoFilters
          data={espacos}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        {/* Botão adicionar */}
        <div className="mt-4 mb-4">
          <button
            onClick={() => setOpenAddModal(true)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Adicionar novo Espaço Físico
          </button>
        </div>

        {/* Tabela */}
        <EspacoTable
          data={filteredEspacos}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* ADD */}
      <EspacoAddModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onCreated={fetchEspacos}
      />

      {/* VIEW */}
      <EspacoViewModal
        open={viewOpen}
        data={selected}
        onClose={() => setViewOpen(false)}
      />

      {/* EDIT */}
      <EspacoEditModal
        open={editOpen}
        espaco={selected}
        onClose={() => setEditOpen(false)}
        onUpdated={handleUpdated}
      />

      {/* DELETE */}
      <EspacoDeleteModal
        open={deleteOpen}
        espaco={selected}
        onClose={() => setDeleteOpen(false)}
        onDeleted={handleDeleted}
      />
    </section>
  );
};

export default Espacos;
