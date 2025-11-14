import React from "react";

interface ItensDeleteModalProps {
  itemNome: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

const ItensDeleteModal: React.FC<ItensDeleteModalProps> = ({
  itemNome,
  onConfirmar,
  onCancelar,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-lg border border-gray-200">

        {/* Botão fechar */}
        <button
          onClick={onCancelar}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-2xl"
        >
          ×
        </button>

        {/* Título */}
        <h3 className="text-xl font-bold mb-4 text-[#2E3A59]">
          Confirmar Exclusão
        </h3>

        {/* Texto da confirmação */}
        <p className="text-gray-700 mb-6">
          Tem certeza que deseja excluir o item <strong>{itemNome}</strong>?
        </p>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItensDeleteModal;
