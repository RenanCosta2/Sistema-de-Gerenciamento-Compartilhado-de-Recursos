// ViewItemModal.tsx
import React from "react";
import type { Item } from "../services/itens";

interface ViewItemModalProps {
  item: Item;
  onClose: () => void;
}

const ViewItemModal: React.FC<ViewItemModalProps> = ({ item, onClose }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [ano, mes, dia] = dateString.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[450px] relative">
        <button
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4 text-[#2E3A59]">
          Detalhes do Item
        </h3>

        <div className="space-y-2">
          <p>
            <strong>Código:</strong> {item.id}
          </p>
          <p>
            <strong>Nome:</strong> {item.nome}
          </p>
          <p>
            <strong>Descrição:</strong> {item.descricao || "-"}
          </p>
          <p>
            <strong>Número do Tombo:</strong> {item.numeroTombo}
          </p>
          <p>
            <strong>Localização:</strong> {item.localizacao}
          </p>
          <p>
            <strong>Status:</strong> {item.status}
          </p>
          <p>
            <strong>Data de Aquisição:</strong> {formatDate(item.data_aquisicao)}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewItemModal;
