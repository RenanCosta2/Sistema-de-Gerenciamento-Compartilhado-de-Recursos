import React, { useState, useEffect } from "react";
import type { EspacoFormValues } from "./EspacoAddModal";

interface EditEspacoModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: EspacoFormValues;
  onSubmit: (dados: EspacoFormValues) => void;
}

const EditEspacoModal: React.FC<EditEspacoModalProps> = ({
  open,
  onClose,
  initialValues,
  onSubmit,
}) => {
  const [nome, setNome] = useState(initialValues.nome);
  const [tipo, setTipo] = useState(initialValues.tipo);
  const [bloco, setBloco] = useState(initialValues.bloco || "");
  const [areaExterna, setAreaExterna] = useState(initialValues.areaExterna);

  // Atualiza os estados se initialValues mudarem
  useEffect(() => {
    setNome(initialValues.nome);
    setTipo(initialValues.tipo);
    setBloco(initialValues.bloco || "");
    setAreaExterna(initialValues.areaExterna);
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dadosEspaco: EspacoFormValues = {
      nome,
      tipo,
      bloco: areaExterna ? undefined : bloco,
      areaExterna,
    };

    onSubmit(dadosEspaco);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-semibold mb-4">Editar Espaço</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium">Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border p-2 rounded"
              placeholder="Ex: Sala de Aula 01"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium">Tipo *</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione...</option>
              <option value="sala_aula">Sala de Aula</option>
              <option value="laboratorio">Laboratório</option>
              <option value="auditorio">Auditório</option>
              <option value="professores">Sala de Professor / Projeto</option>
              <option value="ginásio">Ginásio / Quadra</option>
              <option value="administrativo">Sala Administrativa / Reunião</option>
              <option value="externo">Área Externa</option>
            </select>
          </div>

          {/* Bloco (só se não for área externa) */}
          {!areaExterna && (
            <div>
              <label className="block text-sm font-medium">Bloco</label>
              <input
                type="text"
                value={bloco}
                onChange={(e) => setBloco(e.target.value)}
                required
                className="w-full border p-2 rounded"
                placeholder="Ex: Bloco de Aulas 01"
              />
            </div>
          )}

          {/* Área Externa */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={areaExterna}
              onChange={(e) => setAreaExterna(e.target.checked)}
              id="areaExterna"
              className="h-4 w-4"
            />
            <label htmlFor="areaExterna" className="text-sm font-medium">
              Área Externa
            </label>
          </div>

          {/* Botões */}
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
};

export default EditEspacoModal;
