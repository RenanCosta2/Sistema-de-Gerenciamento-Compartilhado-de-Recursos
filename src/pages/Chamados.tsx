import React, { useState, useMemo, useEffect } from "react";

import ChamadosFilters from "../components/Chamados/ChamadosFilters";
import ChamadosTable from "../components/Chamados/ChamadosTable";
import ChamadosForm from "../components/Chamados/ChamadosForm";

import ChamadoViewModal from "../components/Chamados/ChamadoViewModal";
import ChamadoDeleteModal from "../components/Chamados/ChamadoDeleteModal";
import ChamadoEditModal from "../components/Chamados/ChamadoEditModal";

import { getChamados } from "../services/chamados";
import type { Chamado } from "../services/chamados";
import { getItens } from "../services/itens";
import type { Item } from "../services/itens";

const Chamados: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [loading, setLoading] = useState(true);

  const [itens, setItens] = useState<Item[]>([]);

  const fetchChamados = async () => {
    const data = await getChamados();
    setChamados(data);
  };

  useEffect(() => {
      getItens().then(setItens).catch(console.error);
      fetchChamados().finally(() => setLoading(false));
    }, []);

  useEffect(() => {
    fetchChamados().finally(() => setLoading(false));
  }, []);

  // --------------------------
  // Modal States
  // --------------------------
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<Chamado | null>(null);

  // --------------------------
  // Handlers
  // --------------------------
  const handleView = (registro: Chamado) => {
    setSelected(registro);
    setViewOpen(true);
  };

  const handleEdit = (registro: Chamado) => {
    setSelected(registro);
    setEditOpen(true);
  };

  const handleDelete = (registro: Chamado) => {
    setSelected(registro);
    setDeleteOpen(true);
  };

  const handleUpdated = async () => {
    setEditOpen(false);
    setSelected(null);
    await fetchChamados();
  };

  const handleDeleted = async () => {
    setDeleteOpen(false);
    setSelected(null);
    await fetchChamados();
  };

  // --------------------------
  // Filtro e busca
  // --------------------------
  const filteredChamados = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return chamados.filter((c) => {
      const matchesSearch =
        c.id.toString().includes(term) ||
        c.titulo.toLowerCase().includes(term);

      return matchesSearch;
    });
  }, [searchTerm, chamados]);

  // --------------------------
  // Loading
  // --------------------------
  if (loading) {
    return (
      <section className="pt-4 px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
          Central de Chamados e Solicitações
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
        Central de Chamados e Solicitações
      </h2>

      {/* ABRIR NOVO CHAMADO */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-[#2E3A59]">
          Abrir um Novo Chamado
        </h2>
        <ChamadosForm onCreated={fetchChamados} />
      </div>

      {/* LISTA */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6 text-[#2E3A59]">Chamados</h2>

          <ChamadosFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <ChamadosTable
          data={filteredChamados}
          onView={handleView}
          onEdit={handleEdit}   // <-- adicionado
          onDelete={handleDelete}
        />
      </div>

      {/* VIEW */}
      <ChamadoViewModal
        open={viewOpen}
        data={selected}
        onClose={() => setViewOpen(false)}
      />

      {/* EDIT */}
      <ChamadoEditModal
        open={editOpen}
        chamado={selected}
        patrimonios={itens}
        onClose={() => setEditOpen(false)}
        onUpdated={handleUpdated}
      />

      {/* DELETE */}
      <ChamadoDeleteModal
        open={deleteOpen}
        chamado={selected}
        onClose={() => setDeleteOpen(false)}
        onDeleted={handleDeleted}
      />
    </section>
  );
};

export default Chamados;
