import React, { useState } from "react";
import { createEspaco } from "../../services/espaco";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EspacoAddModal: React.FC<Props> = ({ open, onClose }) => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState(""); // Sala, Laboratório, Auditório etc.
  const [bloco, setBloco] = useState("");

  

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        nome,
        tipo,
        bloco
      };

    await createEspaco(payload)
    onClose();

    // Resetar campos
    setNome("");
    setTipo("");
    setBloco("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
        <h2 className="text-2xl font-bold text-[#2E3A59] mb-4">
          Adicionar novo Espaço Físico
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block font-medium text-sm mb-1">Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Sala de Aula 01"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Bloco / Área externa */}
          <div>
            <label className="block font-medium text-sm mb-1">Bloco</label>
            <input
              type="text"
              value={bloco}
              required
              onChange={(e) => setBloco(e.target.value)}
              placeholder="Ex: Bloco de Aulas 01"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block font-medium text-sm mb-1">Tipo *</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="w-full border rounded-lg p-2"
            >
              <option value="">Selecione...</option>
              <option value="Sala de Aula">Sala de Aula</option>
              <option value="Laboratório">Laboratório</option>
              <option value="Auditório">Auditório</option>
              <option value="Sala de Professor / Projeto">Sala de Professor / Projeto</option>
              <option value="Ginásio">Ginásio / Quadra</option>
              <option value="Sala Administrativa">Sala Administrativa / Reunião</option>
              <option value="Área Externa">Área Externa</option>
            </select>
          </div>

          

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EspacoAddModal;
