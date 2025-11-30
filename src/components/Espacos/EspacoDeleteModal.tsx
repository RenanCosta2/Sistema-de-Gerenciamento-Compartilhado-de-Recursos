import { deleteEspaco } from "../../services/espaco";
import type { Espaco } from "../../services/espaco";

interface EspacoDeleteModalProps {
  open: boolean;
  onClose: () => void;
  espaco: Espaco | null;
  onDeleted?: () => void;
}

export default function EspacoDeleteModal({
  open,
  onClose,
  espaco,
  onDeleted,
}: EspacoDeleteModalProps) {
  if (!open || !espaco) return null;

  const handleDelete = async () => {
    try {
      await deleteEspaco(espaco.id);

      onDeleted?.();
      onClose();
    } catch (err) {
      console.error("Erro ao excluir espaço:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[400px] rounded-xl shadow-xl">

        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Confirmar Exclusão
        </h2>

        <p className="mb-6">
          Tem certeza de que deseja excluir o espaço{" "}
          <strong>{espaco.nome}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
