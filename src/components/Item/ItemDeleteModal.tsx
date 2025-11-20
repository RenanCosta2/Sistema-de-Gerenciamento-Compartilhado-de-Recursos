import React from "react";

interface DeleteItemModalProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  itemName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-xl shadow-xl">

        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Confirmar Exclusão
        </h2>

        <p className="mb-6">
          Tem certeza de que deseja excluir o item{" "}
          <strong>{itemName}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded cursor-pointer"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
