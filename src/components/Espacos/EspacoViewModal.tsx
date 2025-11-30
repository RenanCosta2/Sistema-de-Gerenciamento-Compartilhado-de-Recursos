import React from "react";
import type { Espaco } from "../../services/espaco";

interface Props {
  open: boolean;
  onClose: () => void;
  data: (Espaco & { id: number }) | null;
}

const EspacoViewModal: React.FC<Props> = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">

        <h2 className="text-xl font-bold text-[#2E3A59] mb-4">
          Detalhes do Espaço
        </h2>

        <div className="space-y-3 text-sm">
          <div>
            <strong>ID:</strong> {data.id}
          </div>

          <div>
            <strong>Nome:</strong> {data.nome}
          </div>

          <div>
            <strong>Tipo:</strong> {data.tipo}
          </div>

          <div>
            <strong>Bloco:</strong> {data.bloco || "-"}
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

export default EspacoViewModal;
