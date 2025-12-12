import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  data: any | null;
}

const HistoricoViewModal: React.FC<Props> = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";

    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "-";

    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const ano = d.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };

  const mapStatus = (value: string) => {
    if (!value) return "-";
    const v = value.toLowerCase();

    if (v === "em_andamento") return "Em andamento";
    if (v === "concluido") return "Concluído";
    if (v === "em_analise") return "Em análise";
    if (v === "pendente") return "Pendente";
    if (v === "aberto") return "Aberto";

    return value;
  };

  const mapTipo = (value: string) => {
    if (!value) return "-";
    const v = value.toLowerCase();

    return v === "solicitacao"
      ? "Chamado"
      : v === "manutencao"
      ? "Manutenção"
      : value;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 rounded-xl shadow-xl relative">
        
        <h2 className="text-xl font-bold text-[#2E3A59] mb-4">
          Detalhes do Histórico
        </h2>

        <div className="space-y-3 text-sm">

          <div>
            <strong>ID:</strong> {data.id}
          </div>

          <div>
            <strong>Item Patrimonial:</strong> {data.nome_item}
          </div>

          <div>
            <strong>Número do Tombo:</strong> {data.numero_tombo}
          </div>

          <div>
            <strong>Localização:</strong> {data.localizacao}
          </div>

          <div>
            <strong>Status:</strong> {mapStatus(data.status)}
          </div>

          <div>
            <strong>Tipo:</strong> {mapTipo(data.tipo)}
          </div>

          <div>
            <strong>Data de Abertura:</strong> {formatDate(data.data_abertura)}
          </div>

          <div>
            <strong>Data de Atualização:</strong> {formatDate(data.data_atualizacao)}
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

export default HistoricoViewModal;
