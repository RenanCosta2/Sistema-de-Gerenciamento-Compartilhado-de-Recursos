import { useEffect, useState } from "react";
import type { Item } from "../../services/itens";
import { updateChamado, type Chamado } from "../../services/chamados";
import { useAuth } from "../Auth/AuthContext";

interface ChamadoEditModalProps {
  open: boolean;
  onClose: () => void;
  chamado: Chamado | null;
  patrimonios: Item[];
  onUpdated?: () => void;
}

export default function ChamadoEditModal({
  open,
  onClose,
  chamado,
  patrimonios,
  onUpdated,
}: ChamadoEditModalProps) {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataRegistro, setDataRegistro] = useState("");
  const [status, setStatus] = useState("");
  const [patrimonio, setPatrimonio] = useState<number | "">("");
  const { user } = useAuth();

  // Preenche ao abrir
  useEffect(() => {
    if (!chamado) return;

    setTitulo(chamado.titulo);
    setTipo(chamado.tipo);
    setDescricao(chamado.descricao);
    setDataRegistro(
    chamado.data_registro 
        ? chamado.data_registro.toString() 
        : ""
    );
    setStatus(chamado.status);
    setPatrimonio(chamado.patrimonio);
  }, [chamado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        titulo,
        tipo,
        descricao,
        data_registro: dataRegistro ? new Date(dataRegistro) : undefined,
        status,
        patrimonio: Number(patrimonio),
        usuario: user!.id,
      };

      await updateChamado(chamado!.id, payload);

      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar chamado:", err);
    }
  };

  if (!open || !chamado) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[450px]">
        <h2 className="text-lg font-semibold mb-4">Editar Chamado</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium">Título*</label>
            <input
              required
              className="w-full border p-2 rounded"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tipo de Chamado*</label>
            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
                >
                <option value="">Selecione...</option>
                <option value="falta">Falta</option>
                <option value="dano">Dano</option>
                <option value="manutencao">Manutenção</option>
                <option value="substituicao">Substituição</option>
            </select>
          </div>

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
            <label className="block text-sm font-medium">Status*</label>
            <select
              className="w-full border p-2 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="aberto">Aberto</option>
              <option value="em_analise">Em análise</option>
              <option value="resolvido">Resolvido</option>
              <option value="cancelado">Cancelado</option>
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
