import React, { useState, useEffect } from "react";
import type { ItemFormValues } from "./CreateItensForm";

interface EditItensFormProps {
  initialValues: ItemFormValues;
  onSubmit: (dados: ItemFormValues) => void;
  onCancel: () => void;
}

const EditItensForm: React.FC<EditItensFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(initialValues.nome);
  const [descricao, setDescricao] = useState(initialValues.descricao);
  const [numeroTombo, setNumeroTombo] = useState(initialValues.numero_tombo || "");
  const [localizacao, setLocalizacao] = useState(initialValues.localizacao);
  const [status, setStatus] = useState(initialValues.status);
  const [dataAquisicao, setDataAquisicao] = useState(initialValues.data_aquisicao || "");
  const [responsavel, setResponsavel] = useState(initialValues.responsavel ? String(initialValues.responsavel) : "");

  useEffect(() => {
    setNome(initialValues.nome);
    setDescricao(initialValues.descricao);
    setNumeroTombo(initialValues.numero_tombo);
    setLocalizacao(initialValues.localizacao);
    setStatus(initialValues.status);
    setDataAquisicao(initialValues.data_aquisicao || "");
    setResponsavel(initialValues.responsavel ? String(initialValues.responsavel) : "");
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dadosItem: ItemFormValues = {
      nome,
      descricao,
      numero_tombo: numeroTombo,
      localizacao,
      status,
      data_aquisicao: dataAquisicao || undefined,
      responsavel: responsavel ? Number(responsavel) : undefined,
    };

    onSubmit(dadosItem);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '8px' }}>
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <div>
        <label>Número do Tombo</label>
        <input
          type="text"
          value={numeroTombo}
          onChange={(e) => setNumeroTombo(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Localização</label>
        <input
          type="text"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {/* Responsável */}
      <div>
        <label>Responsável (ID do usuário)</label>
        <input
          type="number"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          placeholder="ID do usuário (opcional)"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Selecione...</option>
          <option value="ativo">Ativo</option>
          <option value="em_manutencao">Em Manutenção</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>

      <div>
        <label>Data de Aquisição</label>
        <input
          type="date"
          value={dataAquisicao}
          onChange={(e) => setDataAquisicao(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded">
          Salvar Alterações
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditItensForm;
