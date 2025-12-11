import React, { useState, useMemo, useEffect } from "react";
import ItensTable from "../components/Item/ItensTable";
import ItensFilters from "../components/Item/ItensFilters";
import DeleteItemModal from "../components/Item/ItemDeleteModal";
import ItemAddModal, { type ItemFormValues } from "../components/Item/ItemAddModal";
import EditItensModal from "../components/Item/ItemEditModal";
import { getItens, createItem, updateItem, deleteItem } from "../services/itens";
import type { Item } from "../services/itens";
import ViewItemModal from "../components/Item/ItemViewModal";


const ItensPatrimoniais: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categorias: [] as string[],
    status: [] as string[],
    localizacoes: [] as string[],
  });
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);
  const [viewingItem, setViewingItem] = useState<Item | null>(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  // Criar item
  const handleCreateItem = async (dados: ItemFormValues) => {
    try {
      await createItem(dados);
      await fetchData();
      setShowCreateModal(false);
    } catch (error) {
      console.error("Erro ao criar item:", error);
      alert("Erro ao criar item.");
    }
  };

  // Atualizar item
  const handleEditItem = async (dados: ItemFormValues) => {
    if (!editingItem) return;

    try {
      await updateItem(editingItem.id, dados);
      await fetchData();
      setEditingItem(null);
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      alert("Erro ao atualizar item.");
    }
  };

  // Filtragem
  const filteredItens = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return itens.filter((item) => {
      const idStr = item.id?.toString().toLowerCase() ?? "";
      const nomeStr = item.nome?.toLowerCase() ?? "";

      const matchesSearch =
        idStr.includes(term) || nomeStr.includes(term);

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(item.status);

      const matchesLocalizacao =
        filters.localizacoes.length === 0 ||
        filters.localizacoes.includes(item.localizacao_nome_bloco);

      return matchesSearch && matchesStatus && matchesLocalizacao;
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

        <div className="mt-6 flex justify-start">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Adicionar Novo Item
          </button>
        </div>

        {/* Modal de Criar */}
        {showCreateModal && (
          <ItemAddModal
            open={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateItem}
          />
        )}

       {/* Modal de Edição */}
      {editingItem && (
        <EditItensModal
          open={!!editingItem}
          onClose={() => setEditingItem(null)}
          initialValues={{
            nome: editingItem.nome,
            descricao: editingItem.descricao,
            numero_tombo: editingItem.numero_tombo,
            localizacao: editingItem.localizacao,
            status: editingItem.status,
            data_aquisicao: editingItem.data_aquisicao,
            responsavel: editingItem.responsavel,
          }}
          onSubmit={handleEditItem}
        />
      )}

        {/* Modal de Exclusão */}
        {deletingItem && (
          <DeleteItemModal
            itemName={deletingItem.nome}
            onCancel={() => setDeletingItem(null)}
            onConfirm={async () => {
              try {
                await deleteItem(deletingItem.id);
                setItens((prev) =>
                  prev.filter((item) => item.id !== deletingItem.id)
                );
                setDeletingItem(null);
              } catch (error) {
                console.error("Erro ao excluir item:", error);
                alert("Erro ao excluir item.");
              }
            }}
          />
        )}

        <ViewItemModal
          open={!!viewingItem}
          data={viewingItem}
          onClose={() => setViewingItem(null)}
        />

        <div className="mt-6"></div>

        <ItensTable
          key={filteredItens.length}
          data={filteredItens}
          onEdit={(item) => setEditingItem(item)}
          onDelete={(item) => setDeletingItem(item)}
          onView={(item) => setViewingItem(item)}
        />
      </div>
    </section>
  );
};

export default ItensPatrimoniais;
