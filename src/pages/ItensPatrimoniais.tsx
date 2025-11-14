import React, { useState, useMemo } from "react";
import ItensTable from "../components/ItensTable";
import ItensFilters from "../components/ItensFilters";
import ItensForm from "../components/ItensForm";
import ConfirmacaoExclusao from "../components/ItensDeleteModal";
import itensDataJson from "../data/itens.json";

export interface Item {
  id: string;
  nome: string;
  categoria: string;
  local_instalacao: string;
  status: string;
  data_aquisicao: string;
}

// Tipo para os dados do formulário
type ItemFormValues = {
  codigo: string;
  nomeItem: string;
  categoria: string;
  localizacao: string;
  status: string;
};

const ItensPatrimoniais: React.FC = () => {
  const [itensData, setItensData] = useState<Item[]>(itensDataJson);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    categorias: [] as string[],
    status: [] as string[],
    localizacoes: [] as string[],
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [itemEditando, setItemEditando] = useState<Item | null>(null);
  const [itemVisualizando, setItemVisualizando] = useState<Item | null>(null);

  // Estado do modal de exclusão
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState<Item | null>(null);

  // Abrir modal de edição
  const abrirModalEdicao = (item: Item) => {
    setItemEditando(item);
    setModalAberto(true);
  };

  // Abrir modal de criação
  const abrirModalCriacao = () => {
    setItemEditando(null);
    setModalAberto(true);
  };

  // Abrir modal de visualização
  const abrirModalVisualizacao = (item: Item) => {
    setItemVisualizando(item);
  };

  // Salvar ou atualizar item
  const handleSalvarItem = (dados: ItemFormValues) => {
    if (itemEditando) {
      // Atualiza item existente
      setItensData((prev) =>
        prev.map((it) =>
          it.id === itemEditando.id
            ? {
                ...it,
                id: dados.codigo,
                nome: dados.nomeItem,
                categoria: dados.categoria,
                local_instalacao: dados.localizacao,
                status: dados.status,
              }
            : it
        )
      );
    } else {
      // Cria novo item
      const novoItem: Item = {
        id: dados.codigo,
        nome: dados.nomeItem,
        categoria: dados.categoria,
        local_instalacao: dados.localizacao,
        status: dados.status,
        data_aquisicao: new Date().toISOString().split("T")[0],
      };
      setItensData((prev) => [...prev, novoItem]);
    }

    setModalAberto(false);
    setItemEditando(null);
  };

  // Confirmar exclusão
  const confirmarExclusao = () => {
    if (!itemParaExcluir) return;

    setItensData((prev) =>
      prev.filter((it) => it.id !== itemParaExcluir.id)
    );

    setItemParaExcluir(null);
    setConfirmacaoAberta(false);
  };

  const filteredItens = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return itensData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(term) ||
        item.nome.toLowerCase().includes(term);

      const matchesCategoria =
        filters.categorias.length === 0 ||
        filters.categorias.includes(item.categoria);

      const matchesStatus =
        filters.status.length === 0 ||
        filters.status.includes(item.status);

      const matchesLocalizacao =
        filters.localizacoes.length === 0 ||
        filters.localizacoes.includes(item.local_instalacao);

      return (
        matchesSearch &&
        matchesCategoria &&
        matchesStatus &&
        matchesLocalizacao
      );
    });
  }, [searchTerm, filters, itensData]);

  return (
    <section className="pt-4 px-4">
      <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
        Gerenciamento de Itens Patrimoniais
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <ItensFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="my-4">
          <button
            onClick={abrirModalCriacao}
            className="bg-[#415085] text-white px-4 py-2 rounded-lg hover:bg-[#303a63] transition-colors"
          >
            Adicionar Novo Item
          </button>
        </div>

        <ItensTable
          data={filteredItens}
          onEdit={abrirModalEdicao}
          onView={abrirModalVisualizacao}
          onDelete={(item) => {
            setItemParaExcluir(item);
            setConfirmacaoAberta(true);
          }}
        />

        {/* Modal de criação/edição */}
        {modalAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
              <button
                onClick={() => {
                  setModalAberto(false);
                  setItemEditando(null);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-2xl"
              >
                ×
              </button>

              <h3 className="text-xl font-bold mb-4 text-[#2E3A59]">
                {itemEditando ? "Editar Item" : "Criar Novo Item"}
              </h3>

              <ItensForm
                initialValues={
                  itemEditando
                    ? {
                        codigo: itemEditando.id,
                        nomeItem: itemEditando.nome,
                        categoria: itemEditando.categoria,
                        localizacao: itemEditando.local_instalacao,
                        status: itemEditando.status,
                      }
                    : undefined
                }
                onSubmit={handleSalvarItem}
              />
            </div>
          </div>
        )}

        {/* Modal de visualização */}
        {itemVisualizando && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
              <button
                onClick={() => setItemVisualizando(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-2xl"
              >
                ×
              </button>

              <h3 className="text-xl font-bold mb-4 text-[#2E3A59]">
                Visualização do Item
              </h3>

              <div className="space-y-2">
                <p><strong>Código:</strong> {itemVisualizando.id}</p>
                <p><strong>Nome:</strong> {itemVisualizando.nome}</p>
                <p><strong>Categoria:</strong> {itemVisualizando.categoria}</p>
                <p><strong>Localização:</strong> {itemVisualizando.local_instalacao}</p>
                <p><strong>Status:</strong> {itemVisualizando.status}</p>
                <p><strong>Data de Aquisição:</strong> {itemVisualizando.data_aquisicao}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de exclusão */}
        {confirmacaoAberta && itemParaExcluir && (
          <ConfirmacaoExclusao
            itemNome={itemParaExcluir.nome}
            onConfirmar={confirmarExclusao}
            onCancelar={() => {
              setItemParaExcluir(null);
              setConfirmacaoAberta(false);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ItensPatrimoniais;
