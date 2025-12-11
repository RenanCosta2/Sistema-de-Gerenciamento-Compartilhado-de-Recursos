import React from "react";

interface Item {
  id: number | string;
  name: string;
  date: string;
  status?: string;
  tipo?: string;
}

interface ListPanelProps {
  title: string;
  items: Item[];
}

const mapStatusForColor = (raw?: string): string => {
  const s = raw?.toLowerCase() || "";

  if (s === "em_analise" || s === "em análise") return "em andamento";
  if (s === "aberto") return "pendente";
  if (s === "concluído") return "resolvido";

  return s;
};

const tipoMap: Record<string, string> = {
  falta: "Falta",
  dano: "Dano",
  manutencao: "Manutenção",
  substituicao: "Substituição",
};

const mapTipo = (raw?: string): string => {
  if (!raw) return "Não informado";
  const key = raw.toLowerCase();
  return tipoMap[key] || raw;
};


const getStatusClasses = (status: string): string => {
  switch (status) {
    case "pendente":
      return "text-blue-700 border border-blue-400 bg-blue-50";
    case "em andamento":
      return "text-yellow-700 border border-yellow-400 bg-yellow-50";
    case "resolvido":
      return "text-green-700 border border-green-400 bg-green-50";
    case "cancelado":
      return "text-red-700 border border-red-400 bg-red-50";
    default:
      return "text-gray-700 border border-gray-300 bg-gray-50";
  }
};

const ListPanel: React.FC<ListPanelProps> = ({ title, items }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <ul>
        {items.map((item, index) => {
          const normalizedStatus = mapStatusForColor(item.status);
          const statusClasses = item.status ? getStatusClasses(normalizedStatus) : "";

          return (
            <li
              key={item.id}
              className={`py-3 transition ${
                index !== items.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="flex justify-between items-start">

                <div className="flex flex-col gap-1">
                  {/* Nome */}
                  <p className="font-semibold text-gray-800">{item.name}</p>

                  {/* Tipo */}
                  {item.tipo && (
                    <span className="text-xs text-gray-600 italic">
                      Tipo: {mapTipo(item.tipo)}
                    </span>
                  )}

                  {/* Data */}
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>

                {item.status && (
                  <span
                    className={`text-sm px-2 py-1 rounded-md font-medium capitalize whitespace-nowrap ${statusClasses}`}
                  >
                    {item.status}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListPanel;
