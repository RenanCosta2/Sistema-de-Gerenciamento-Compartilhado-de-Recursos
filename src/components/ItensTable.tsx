import React, { useState, useMemo } from "react";
import { Edit, Trash2, Eye } from "lucide-react";

interface Item {
  id: string;
  nome: string;
  categoria: string;
  local_instalacao: string;
  status: string;
  data_aquisicao: string;
}

interface ItensTableProps {
  data: Item[];
  rowsPerPage?: number;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
  onView?: (item: Item) => void; // callback visualização
}

const ItensTable: React.FC<ItensTableProps> = ({ data, rowsPerPage = 10, onEdit, onDelete, onView }) => {
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
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        if (l && i - l > 1) result.push("...");
        result.push(i);
        l = i;
      }
    }
    return result;
  }, [totalPages, currentPage]);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white rounded-xl border border-gray-200 shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-left">
            <tr className="text-[#2E3A59]">
              <th className="py-3 px-4 font-semibold">Código</th>
              <th className="py-3 px-4 font-semibold">Nome do Item</th>
              <th className="py-3 px-4 font-semibold">Categoria</th>
              <th className="py-3 px-4 font-semibold">Local de Instalação</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Data de Aquisição</th>
              <th className="py-3 px-4 font-semibold text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => {
              const status = item.status.toLowerCase();
              const statusClasses =
                status === "ativo"
                  ? "text-green-700 border border-green-400 bg-green-50"
                  : status === "em manutenção"
                  ? "text-yellow-700 border border-yellow-400 bg-yellow-50"
                  : "text-gray-700 border border-gray-300 bg-gray-50";

              return (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.nome}</td>
                  <td className="py-3 px-4">{item.categoria}</td>
                  <td className="py-3 px-4">{item.local_instalacao}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClasses}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.data_aquisicao}</td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    {/* Botão de visualização */}
                    <button
                      onClick={() => onView?.(item)}
                      className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Visualizar histórico"
                    >
                      <Eye size={16} className="text-gray-700" />
                    </button>
                    {/* Botão de edição */}
                    <button
                      onClick={() => onEdit?.(item)}
                      className="p-1 rounded hover:bg-blue-100 transition-colors cursor-pointer"
                      title="Editar"
                    >
                      <Edit size={16} className="text-blue-500" />
                    </button>
                    {/* Botão de exclusão */}
                    <button
                      onClick={() => onDelete?.(item)}
                      className="p-1 rounded hover:bg-red-100 transition-colors cursor-pointer"
                      title="Excluir"
                    >
                      <Trash2 size={16} className="text-red-500" />
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

export default ItensTable;
