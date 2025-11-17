import React, { useState } from "react";

export interface ManutencaoFormValues {
  patrimonio: number;
  usuario?: number;
  descricao: string;
  data_inicio: string;
  data_fim?: string;
  status: string;
}

interface CreateManutencaoFormsProps {
  onSubmit?: (dados: ManutencaoFormValues) => void;
}

const CreateManutencaoForms: React.FC<CreateManutencaoFormsProps> = ({ onSubmit }) => {
  const [patrimonio, setPatrimonio] = useState("");
  const [usuario, setUsuario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("pendente");

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
    onSubmit?.(dados);
    setPatrimonio("");
    setUsuario("");
    setDescricao("");
    setDataInicio("");
    setDataFim("");
    setStatus("pendente");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      style={{ maxHeight: '80vh', overflowY: 'auto', paddingRight: '8px' }}
    >
      {/* Patrimônio */}
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
      {/* Usuário */}
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
      {/* Descrição */}
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
      {/* Data de Início */}
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
      {/* Data de Fim */}
      <div>
        <label>Data de Fim (opcional)</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {/* Status */}
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
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded"
      >
        Salvar Manutenção
      </button>
    </form>
  );
};

export default CreateManutencaoForms;
