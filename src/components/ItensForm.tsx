// src/components/ItensForm.tsx
import React, { useState, useEffect } from "react";

export interface ItemFormValues {
  codigo: string;
  nomeItem: string;
  categoria: string;
  localizacao: string;
  status: string;
}

interface ItensFormProps {
  initialValues?: ItemFormValues;
  onSubmit?: (dados: ItemFormValues) => void;
}

const ItensForm: React.FC<ItensFormProps> = ({ initialValues, onSubmit }) => {
  const [codigo, setCodigo] = useState("");
  const [nomeItem, setNomeItem] = useState("");
  const [categoria, setCategoria] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialValues) {
      setCodigo(initialValues.codigo);
      setNomeItem(initialValues.nomeItem);
      setCategoria(initialValues.categoria);
      setLocalizacao(initialValues.localizacao);
      setStatus(initialValues.status);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dadosItem: ItemFormValues = {
      codigo,
      nomeItem,
      categoria,
      localizacao,
      status,
    };
    onSubmit?.(dadosItem);

    // Resetar somente se for criação
    if (!initialValues) {
      setCodigo("");
      setNomeItem("");
      setCategoria("");
      setLocalizacao("");
      setStatus("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Código */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Código
        </label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ex: NT006"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        />
      </div>

      {/* Nome do Item */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Nome do Item
        </label>
        <input
          type="text"
          value={nomeItem}
          onChange={(e) => setNomeItem(e.target.value)}
          placeholder="Ex: Monitor Samsung 24'"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        />
      </div>

      {/* Categoria */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Categoria
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        >
          <option value="">Selecione...</option>
          <option value="computador">Computador</option>
          <option value="impressora">Impressora</option>
          <option value="projetor">Projetor</option>
        </select>
      </div>

      {/* Localização */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Localização
        </label>
        <select
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        >
          <option value="">Selecione...</option>
          <option value="sala1">Sala 1</option>
          <option value="sala2">Sala 2</option>
          <option value="almoxarifado">Almoxarifado</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        >
          <option value="">Selecione...</option>
          <option value="ativo">Ativo</option>
          <option value="manutencao">Em Manutenção</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-[#415085] hover:bg-[#303a63] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Salvar Item
        </button>
      </div>
    </form>
  );
};

export default ItensForm;
