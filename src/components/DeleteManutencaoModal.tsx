// DeleteManutencaoModal.tsx
import React from "react";

interface DeleteManutencaoModalProps {
  manutencaoDescricao: string; // descrição da manutenção a ser exibida no modal
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteManutencaoModal: React.FC<DeleteManutencaoModalProps> = ({
  manutencaoDescricao,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-600"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-4 text-[#2E3A59]">
          Confirmar Exclusão
        </h3>

        <p className="mb-6">
          Tem certeza que deseja excluir a manutenção: <strong>{manutencaoDescricao}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteManutencaoModal;
