import React, { useState } from "react";
import { createEspaco } from "../../services/espaco";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

const EspacoAddModal: React.FC<Props> = ({ open, onClose, onCreated }) => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [bloco, setBloco] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        nome,
        tipo,
        bloco: bloco
      };

      await createEspaco(payload);
      onCreated?.();

      // reset
      setNome("");
      setTipo("");
      setBloco("");

      onClose();
    } catch (err) {
      console.error("Erro ao criar espaço:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative">

        <h2 className="text-2xl font-bold text-[#2E3A59] mb-4">
          Novo Espaço Físico
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Nome */}
          <div>
            <label className="block font-medium text-sm mb-1">Nome *</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Sala 101"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Bloco */}
          <div>
            <label className="block font-medium text-sm mb-1">Bloco</label>
            <input
              type="text"
              value={bloco}
              onChange={(e) => setBloco(e.target.value)}
              placeholder="Ex: Bloco A"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block font-medium text-sm mb-1">Tipo *</label>
            <select
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Selecione...</option>
              <option value="Sala de Aula">Sala de Aula</option>
              <option value="Laboratório">Laboratório</option>
              <option value="Auditório">Auditório</option>
              <option value="Sala de Professor / Projeto">
                Sala de Professor / Projeto
              </option>
              <option value="Ginásio">Ginásio / Quadra</option>
              <option value="Sala Administrativa">
                Sala Administrativa / Reunião
              </option>
              <option value="Área Externa">Área Externa</option>
            </select>
          </div>

          {/* Ações */}
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
