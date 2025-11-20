import React, { useState, useEffect } from "react";
import type { ManutencaoFormValues } from "./ManutencaoAddModal";

interface EditManutencaoFormsProps {
  initialValues: ManutencaoFormValues;
  onSubmit: (dados: ManutencaoFormValues) => void;
  onCancel: () => void;
}

const EditManutencaoForms: React.FC<EditManutencaoFormsProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [patrimonio, setPatrimonio] = useState(initialValues.patrimonio ? String(initialValues.patrimonio) : "");
  const [usuario, setUsuario] = useState(initialValues.usuario ? String(initialValues.usuario) : "");
  const [descricao, setDescricao] = useState(initialValues.descricao);
  const [dataInicio, setDataInicio] = useState(initialValues.data_inicio || "");
  const [dataFim, setDataFim] = useState(initialValues.data_fim || "");
  const [status, setStatus] = useState(initialValues.status);

  useEffect(() => {
    setPatrimonio(initialValues.patrimonio ? String(initialValues.patrimonio) : "");
    setUsuario(initialValues.usuario ? String(initialValues.usuario) : "");
    setDescricao(initialValues.descricao);
    setDataInicio(initialValues.data_inicio || "");
    setDataFim(initialValues.data_fim || "");
    setStatus(initialValues.status);
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dados: ManutencaoFormValues = {
      patrimonio: Number(patrimonio),
      usuario: usuario ? Number(usuario) : undefined,
      descricao,
      data_inicio: dataInicio,
      data_fim: dataFim || undefined,
      status,
    };
    onSubmit(dados);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '8px' }}>
      <div>
        <label>ID do Patrimônio</label>
        <input
          type="number"
          value={patrimonio}
          onChange={(e) => setPatrimonio(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          placeholder="ID do patrimônio"
        />
      </div>
      <div>
        <label>ID do Usuário (opcional)</label>
        <input
          type="number"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="ID do usuário"
        />
      </div>
      <div>
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          rows={3}
          placeholder="Descreva a manutenção"
        />
      </div>
      <div>
        <label>Data de Início</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label>Data de Fim (opcional)</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
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
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluída</option>
        </select>
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

export default EditManutencaoForms;
