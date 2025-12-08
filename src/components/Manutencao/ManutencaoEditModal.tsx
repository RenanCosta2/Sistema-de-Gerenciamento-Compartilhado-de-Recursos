import { useEffect, useState } from "react";
import { updateManutencao } from "../../services/manutencoes";
import type { Item } from "../../services/itens";
import { useAuth } from "../Auth/AuthContext";

interface Manutencao {
  id: number;
  descricao: string;
  data_inicio: string;
  data_fim: string | null;
  status: "pendente" | "em_andamento" | "concluido";
  patrimonio: number;
}

interface ManutencaoEditModalProps {
  open: boolean;
  onClose: () => void;
  manutencao: Manutencao | null;
  patrimonios: Item[];
  onUpdated?: () => void;
}

export default function ManutencaoEditModal({
  open,
  onClose,
  manutencao,
  patrimonios,
  onUpdated,
}: ManutencaoEditModalProps) {
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState<"pendente" | "em_andamento" | "concluido">(
    "pendente"
  );
  const [patrimonio, setPatrimonio] = useState<number | "">("");
  const { user } = useAuth();

  // Preenche os campos quando abrir
  useEffect(() => {
    if (!manutencao) return;

    setDescricao(manutencao.descricao);
    setDataInicio(manutencao.data_inicio);
    setDataFim(manutencao.data_fim ?? "");
    setStatus(manutencao.status);
    setPatrimonio(manutencao.patrimonio);
  }, [manutencao]);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }

      const payload = {
        descricao,
        data_inicio: dataInicio,
        data_fim: dataFim || null,
        status,
        patrimonio: Number(patrimonio),
        usuario: user.id
      };

      await updateManutencao(manutencao!.id, payload);

      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar manutenção:", err);
    }
  };

  if (!open || !manutencao) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[450px]">
        <h2 className="text-lg font-semibold mb-4">Editar Manutenção</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium">Patrimônio*</label>
            <select
              required
              className="w-full border p-2 rounded"
              value={patrimonio}
              onChange={(e) => setPatrimonio(Number(e.target.value))}
            >
              <option value="">Selecione</option>
              {patrimonios.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição*</label>
            <textarea
              required
              className="w-full border p-2 rounded"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Data início*</label>
            <input
              type="date"
              required
              className="w-full border p-2 rounded"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>

          {/* data fim */}
          {status === "concluido" && (
            <div>
              <label className="block font-medium text-sm mb-1">Data de fim *</label>
              <input
                type="date"
                required
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Status*</label>
            <select
              className="w-full border p-2 rounded"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "pendente" | "em_andamento" | "concluido"
                )
              }
              required
            >
              <option value="pendente">Pendente</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded cursor-pointer"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
