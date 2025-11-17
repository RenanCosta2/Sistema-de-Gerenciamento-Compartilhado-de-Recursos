// ViewManutencaoModal.tsx
import React from "react";
import type { ManutencaoFormValues } from "./CreateManutencaoForms";

interface ViewManutencaoModalProps {
  manutencao: ManutencaoFormValues;
  onClose: () => void;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  const [ano, mes, dia] = dateString.split("-");
  return `${dia}/${mes}/${ano}`;
};

const ViewManutencaoModal: React.FC<ViewManutencaoModalProps> = ({ manutencao, onClose }) => {
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
          Detalhes da Manutenção
        </h3>

        <div className="space-y-2">
          <p>
            <strong>ID do Patrimônio:</strong> {manutencao.patrimonio || "-"}
          </p>
          <p>
            <strong>ID do Usuário:</strong> {manutencao.usuario !== undefined ? manutencao.usuario : "-"}
          </p>
          <p>
            <strong>Descrição:</strong> {manutencao.descricao || "-"}
          </p>
          <p>
            <strong>Data de Início:</strong> {formatDate(manutencao.data_inicio)}
          </p>
          <p>
            <strong>Data de Fim:</strong> {formatDate(manutencao.data_fim)}
          </p>
          <p>
            <strong>Status:</strong> {manutencao.status || "-"}
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

export default ViewManutencaoModal;
