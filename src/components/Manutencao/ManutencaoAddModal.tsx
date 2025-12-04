import React, { useState } from "react";
import type { Item } from "../../services/itens";
import { createManutencao } from "../../services/manutencoes";
import { useAuth } from "../Auth/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
  itens: Item[];
  onCreated?: () => void;
};

const ManutencaoAddModal: React.FC<Props> = ({
  open,
  onClose,
  itens,
  onCreated,
}) => {
  const { user } = useAuth();
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [itemPrimordial, setItemPrimordial] = useState("");

  const mapStatus = (value: string): "pendente" | "em_andamento" | "concluido" => {
    switch (value) {
        case "Pendente":
        return "pendente";
        case "Em andamento":
        return "em_andamento";
        case "Concluído":
        return "concluido";
        default:
        return "pendente";
    }
    };


  if (!open) return null;

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
        status: mapStatus(status),
        patrimonio: Number(itemPrimordial),
        usuario: user.id,
      };

      await createManutencao(payload);
      onCreated?.();

      // reset...
      setDescricao("");
      setDataInicio("");
      setDataFim("");
      setStatus("Pendente");
      setItemPrimordial("");
      onClose();
    } catch (err) {
      console.error("Erro ao criar manutenção:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative">

        <h2 className="text-2xl font-bold text-[#2E3A59] mb-4">
          Nova Manutenção
        </h2>

        {/* form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* patrimônio */}
          <div>
            <label className="block font-medium text-sm mb-1">Patrimônio *</label>
            <select
              required
              value={itemPrimordial}
              onChange={(e) => setItemPrimordial(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Selecione...</option>
              {itens.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>

          {/* descrição */}
          <div>
            <label className="block font-medium text-sm mb-1">Descrição *</label>
            <textarea
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* data início */}
          <div>
            <label className="block font-medium text-sm mb-1">
              Data de início *
            </label>
            <input
              type="date"
              required
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* data fim */}
          <div>
            <label className="block font-medium text-sm mb-1">Data de fim</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* status */}
          <div>
            <label className="block font-medium text-sm mb-1">Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>

          {/* ações */}
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

export default ManutencaoAddModal;
