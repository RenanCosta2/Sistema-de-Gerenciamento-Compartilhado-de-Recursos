import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  data: any | null;
}

const ChamadoViewModal: React.FC<Props> = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "-";
    const [ano, mes, dia] = date.split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const mapStatus = (value: string) => {
    switch (value) {
      case "aberto":
        return "Aberto";
      case "em_analise":
        return "Em Análise";
      case "resolvido":
        return "Resolvido";
      case "cancelado":
        return "Cancelado";
      default:
        return "-";
    }
  };

  const mapTipo = (value: string) => {
    switch (value) {
      case "manutencao":
        return "Manutenção";
      case "suporte":
        return "Suporte";
      case "outro":
        return "Outro";
      default:
        return value;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative">

        <h2 className="text-xl font-bold text-[#2E3A59] mb-4">
          Detalhes do Chamado
        </h2>

        <div className="space-y-3 text-sm">

          <div>
            <strong>ID:</strong> {data.id}
          </div>

          <div>
            <strong>Tipo:</strong> {mapTipo(data.tipo)}
          </div>

          <div>
            <strong>Descrição:</strong> {data.descricao}
          </div>

          <div>
            <strong>Data de Criação:</strong> {formatDate(data.data_criacao)}
          </div>

          <div>
            <strong>Status:</strong> {mapStatus(data.status)}
          </div>

          <div>
            <strong>Patrimônio:</strong> {data.patrimonio_nome}
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

export default ChamadoViewModal;
