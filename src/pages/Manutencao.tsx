import React, { useState, useMemo, useEffect } from "react";
import ManutencaoTable from "../components/ManutencaoTable";
import ManutencaoFilters from "../components/ManutencaoFilters";
import { getManutencoes } from "../services/manutencoes";
import type { Manutencao } from "../services/manutencoes";
import CreateManutencaoForms, { type ManutencaoFormValues } from "../components/CreateManutencaoForms";
import EditManutencaoForms from "../components/EditManutencaoForms";
import DeleteManutencaoModal from "../components/DeleteManutencaoModal";
import ViewManutencaoModal from "../components/ViewManutencaoModal";

const Manutencao: React.FC = () => {
      // Funções de manipulação
      const handleCreateManutencao = async (dados: ManutencaoFormValues) => {
        try {
          // Substitua pela chamada de criação na API
          // const newManutencao = await createManutencao(dados);
          // setManutencoes((prev) => [...prev, newManutencao]);
          setShowCreateModal(false);
        } catch (error) {
          console.error("Erro ao criar manutenção:", error);
          alert("Erro ao criar manutenção.");
        }
      };

      const handleEditManutencao = async (dados: ManutencaoFormValues) => {
        if (!editingManutencao) return;
        try {
          // Substitua pela chamada de edição na API
          // const updated = await updateManutencao(editingManutencao.id, dados);
          // setManutencoes((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
          setEditingManutencao(null);
        } catch (error) {
          console.error("Erro ao editar manutenção:", error);
          alert("Erro ao editar manutenção.");
        }
      };
  const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
      tipos: [] as string[],
      status: [] as string[],
    });

    const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para modais
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingManutencao, setEditingManutencao] = useState<Manutencao | null>(null);
    const [deletingManutencao, setDeletingManutencao] = useState<Manutencao | null>(null);
    const [viewingManutencao, setViewingManutencao] = useState<Manutencao | null>(null);

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

        <div className="mt-6 flex justify-start">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Adicionar Nova Manutenção
          </button>
        </div>

        {/* Modal de Criar */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[450px] relative">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4 text-[#2E3A59]">
                Adicionar Nova Manutenção
              </h3>
              <CreateManutencaoForms onSubmit={handleCreateManutencao} />
            </div>
          </div>
        )}

        {/* Modal de Edição */}
        {editingManutencao && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[450px] relative">
              <button
                onClick={() => setEditingManutencao(null)}
                className="absolute top-2 right-2 text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4 text-[#2E3A59]">
                Editar Manutenção
              </h3>
              <EditManutencaoForms
                initialValues={{
                  patrimonio: editingManutencao.patrimonio,
                  usuario: editingManutencao.usuario,
                  descricao: editingManutencao.descricao,
                  data_inicio: editingManutencao.data_inicio,
                  data_fim: editingManutencao.data_fim,
                  status: editingManutencao.status,
                }}
                onSubmit={handleEditManutencao}
                onCancel={() => setEditingManutencao(null)}
              />
            </div>
          </div>
        )}

        {/* Modal de Exclusão */}
        {deletingManutencao && (
          <DeleteManutencaoModal
            manutencaoDescricao={deletingManutencao.descricao}
            onCancel={() => setDeletingManutencao(null)}
            onConfirm={async () => {
              // Substitua pela lógica de exclusão
              setDeletingManutencao(null);
            }}
          />
        )}

        {/* Modal de Visualização */}
        {viewingManutencao && (
          <ViewManutencaoModal
            manutencao={viewingManutencao}
            onClose={() => setViewingManutencao(null)}
          />
        )}

        <div className="mt-6"></div>

        <ManutencaoTable
          key={filteredManutencao.length}
          data={filteredManutencao}
          onEdit={(manutencao) => setEditingManutencao(manutencao)}
          onDelete={(manutencao) => setDeletingManutencao(manutencao)}
          onView={(manutencao) => setViewingManutencao(manutencao)}
        />
      </div>
    </section>
  );
};

export default Manutencao;
