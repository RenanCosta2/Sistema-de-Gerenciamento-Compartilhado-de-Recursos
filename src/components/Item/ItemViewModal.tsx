import React from "react";
import type { Item } from "../../services/itens";

interface Props {
  open: boolean;
  onClose: () => void;
  data: Item | null;
}

const ViewItemModal: React.FC<Props> = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "-";
    const [ano, mes, dia] = date.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative">

        <h2 className="text-xl font-bold text-[#2E3A59] mb-4">
          Detalhes do Item
        </h2>

        <div className="space-y-3 text-sm">

          <div>
            <strong>ID:</strong> {data.id}
          </div>

          <div>
            <strong>Nome:</strong> {data.nome}
          </div>

          <div>
            <strong>Descrição:</strong> {data.descricao || "-"}
          </div>

          <div>
            <strong>Número do Tombo:</strong> {data.numero_tombo}
          </div>

          <div>
            <strong>Localização:</strong> {data.localizacao}
          </div>

          <div>
            <strong>Status:</strong> {data.status}
          </div>

          <div>
            <strong>Responsável:</strong> {data.responsavel ?? "-"}
          </div>

          <div>
            <strong>Data de Aquisição:</strong> {formatDate(data.data_aquisicao)}
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewItemModal;
