import React, { useState, useMemo } from "react";
import {Eye } from "lucide-react";
import type { Historico } from "../../services/historico";

interface HistoricoTableProps {
  data: Historico[];
  rowsPerPage?: number;
  onView?: (data: Historico) => void;
}

const HistoricoTable: React.FC<HistoricoTableProps> = ({
  data,
  rowsPerPage = 10,
  onView,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const pages = useMemo(() => {
    const delta = 2;
    const result: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        if (l && i - l > 1) result.push("...");
        result.push(i);
        l = i;
      }
    }
    return result;
  }, [totalPages, currentPage]);

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-500">
        Nenhum item encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white rounded-xl border border-gray-200 shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-left">
            <tr className="text-[#2E3A59]">
              <th className="py-3 px-4 font-semibold">Código</th>
              <th className="py-3 px-4 font-semibold">Item Patrimonial</th>
              <th className="py-3 px-4 font-semibold">Número do Tombo</th>
              <th className="py-3 px-4 font-semibold">Localização</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Tipo</th>
              <th className="py-3 px-4 font-semibold">Data de Abertura</th>
              <th className="py-3 px-4 font-semibold">Data de Atualização</th>
              <th className="py-3 px-4 font-semibold text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((historico) => {
              const rawStatus = historico.status?.toLowerCase() || "";
              const status =
                rawStatus === "em_andamento"
                  ? "em andamento"
                  : rawStatus === "concluido"
                  ? "concluído"
                  : rawStatus === "em_analise"
                  ? "em análise"
                  : rawStatus;

              const statusClasses =
                status === "concluído"
                  ? "text-green-700 border border-green-400 bg-green-50"
                  : status === "em andamento" || status === "em análise"
                  ? "text-yellow-700 border border-yellow-400 bg-yellow-50"
                  : status === "pendente" || status === "aberto"
                  ? "text-blue-700 border border-blue-400 bg-blue-50"
                  : "text-gray-700 border border-gray-300 bg-gray-50";

              const tipoMap: Record<string, string> = {
                solicitacao: "Chamado",
                manutencao: "Manutenção",
              };

              const tipo =
                tipoMap[historico.tipo?.toLowerCase()] ?? historico.tipo;

              // Converte todas as palavras para Title Case
              const formatTitleCase = (text: string) =>
                text
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

              const formatDate = (dateString: string) => {
                if (!dateString) return "";

                const d = new Date(dateString);
                if (isNaN(d.getTime())) return "";

                const dia = String(d.getDate()).padStart(2, "0");
                const mes = String(d.getMonth() + 1).padStart(2, "0");
                const ano = d.getFullYear();

                return `${dia}/${mes}/${ano}`;
              };

              return (
                <tr
                  key={historico.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{historico.id}</td>
                  <td className="py-3 px-4">{historico.nome_item}</td>
                  <td className="py-3 px-4">{historico.numero_tombo}</td>
                  <td className="py-3 px-4">{historico.localizacao}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClasses}`}
                    >
                      {formatTitleCase(status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">{tipo}</td>
                  <td className="py-3 px-4">{formatDate(historico.data_abertura)}</td>
                  <td className="py-3 px-4">{formatDate(historico.data_atualizacao)}</td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => onView?.(historico)}
                      className="p-1.5 rounded hover:bg-indigo-100 transition-colors cursor-pointer"
                      title="Visualizar histórico"
                    >
                      <Eye size={17} className="text-indigo-600" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-2 select-none">
        <div className="flex gap-2 justify-center min-w-[350px]">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 cursor-pointer disabled:opacity-50"
          >
            &lt;
          </button>

          {pages.map((p, idx) =>
            typeof p === "number" ? (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 cursor-pointer font-semibold ${
                  currentPage === p ? "text-[#1E40AF]" : "text-black"
                } hover:text-[#1E40AF] transition-colors`}
              >
                {p}
              </button>
            ) : (
              <span key={`dots-${idx}`} className="px-2 py-1 text-black">
                {p}
              </span>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 cursor-pointer disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricoTable;
