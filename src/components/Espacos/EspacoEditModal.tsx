import { useEffect, useState } from "react";
import { updateEspaco } from "../../services/espaco";
import type { Espaco } from "../../services/espaco";

interface EditEspacoModalProps {
  open: boolean;
  onClose: () => void;
  espaco: Espaco | null;
  onUpdated?: () => void;
}

export default function EditEspacoModal({
  open,
  onClose,
  espaco,
  onUpdated,
}: EditEspacoModalProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [bloco, setBloco] = useState("");

  // Preenche campos quando abrir
  useEffect(() => {
    if (!espaco) return;

    setNome(espaco.nome);
    setTipo(espaco.tipo);
    setBloco(espaco.bloco ?? "");
  }, [espaco]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        nome,
        tipo,
        bloco,
      };

      await updateEspaco(espaco!.id, payload);

      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar espaço:", err);
    }
  };

  if (!open || !espaco) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[450px]">
        <h2 className="text-lg font-semibold mb-4">Editar Espaço</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium">Nome *</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tipo *</label>
            <select
              required
              className="w-full border p-2 rounded"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Sala de Aula">Sala de Aula</option>
              <option value="Laboratório">Laboratório</option>
              <option value="Auditório">Auditório</option>
              <option value="Sala Professor / Projeto">Sala Professor / Projeto</option>
              <option value="Ginásio">Ginásio / Quadra</option>
              <option value="Sala Administrativa">Administrativo / Reunião</option>
              <option value="Área Externa">Área Externa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Bloco</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={bloco}
              onChange={(e) => setBloco(e.target.value)}
              placeholder="Ex: Bloco A"
            />
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
