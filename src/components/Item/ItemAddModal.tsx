import React, { useState } from "react";

export interface ItemFormValues {
  nome: string;
  descricao: string;
  numero_tombo: string;
  localizacao: string;
  status: string;
  data_aquisicao?: string;
  responsavel?: number;
}

interface CreateItensFormProps {
  onSubmit?: (dados: ItemFormValues) => void;
}

const CreateItensForm: React.FC<CreateItensFormProps> = ({ onSubmit }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [numeroTombo, setNumeroTombo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState("");
  const [dataAquisicao, setDataAquisicao] = useState("");
  const [responsavel, setResponsavel] = useState("");

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

    onSubmit?.(dadosItem);

    // Reset após criar
    setNome("");
    setDescricao("");
    setNumeroTombo("");
    setLocalizacao("");
    setStatus("");
    setDataAquisicao("");
    setResponsavel("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      style={{
        maxHeight: '80vh',
        overflowY: 'auto',
        paddingRight: '8px',
      }}
    >
      {/* Nome */}
      <div>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Monitor Samsung 24'"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Descrição */}
      <div>
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição do item (opcional)"
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      {/* Número do Tombo */}
      <div>
        <label>Número do Tombo</label>
        <input
          type="text"
          value={numeroTombo}
          onChange={(e) => setNumeroTombo(e.target.value)}
          placeholder="Ex: NT006"
          required
          className="w-full border rounded px-3 py-2"
        />
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
          <option value="Sala de Aula 01 - Central de Aulas I">Sala de Aula 01 - Central de Aulas I</option>
          <option value="Sala de Aula 02 - Central de Aulas I">Sala de Aula 02 - Central de Aulas I</option>
          <option value="Sala de Aula 03 - Central de Aulas I">Sala de Aula 03 - Central de Aulas I</option>
          <option value="Sala de Aula 04 - Central de Aulas I">Sala de Aula 04 - Central de Aulas I</option>
          <option value="Sala de Aula 05 - Central de Aulas I">Sala de Aula 05 - Central de Aulas I</option>
          <option value="Sala de Aula 06 - Central de Aulas I">Sala de Aula 06 - Central de Aulas I</option>
          <option value="Sala de Aula 07 - Central de Aulas I">Sala de Aula 07 - Central de Aulas I</option>
          <option value="Sala de Aula 08 - Central de Aulas I">Sala de Aula 08 - Central de Aulas I</option>
          <option value="Sala de Aula 09 - Central de Aulas I">Sala de Aula 09 - Central de Aulas I</option>
          <option value="Sala de Aula 10 - Central de Aulas I">Sala de Aula 10 - Central de Aulas I</option>
          <option value="Sala de Aula 01 - Central de Aulas II">Sala de Aula 01 - Central de Aulas II</option>
          <option value="Sala de Aula 02 - Central de Aulas II">Sala de Aula 02 - Central de Aulas II</option>
          <option value="Sala de Aula 03 - Central de Aulas II">Sala de Aula 03 - Central de Aulas II</option>
          <option value="Sala de Aula 04 - Central de Aulas II">Sala de Aula 04 - Central de Aulas II</option>
          <option value="Sala de Aula 05 - Central de Aulas II">Sala de Aula 05 - Central de Aulas II</option>
          <option value="Sala de Aula 06 - Central de Aulas II">Sala de Aula 06 - Central de Aulas II</option>
          <option value="Sala de Aula 07 - Central de Aulas II">Sala de Aula 07 - Central de Aulas II</option>
          <option value="Sala de Aula 08 - Central de Aulas II">Sala de Aula 08 - Central de Aulas II</option>
          <option value="Sala de Aula 11 - Central de Aulas II">Sala de Aula 11 - Central de Aulas II</option>
          <option value="Sala de Aula 12 - Central de Aulas II">Sala de Aula 12 - Central de Aulas II</option>
          <option value="Sala de Aula 14 - Central de Aulas II">Sala de Aula 14 - Central de Aulas II</option>
          <option value="Sala de Aula 15 - Central de Aulas II">Sala de Aula 15 - Central de Aulas II</option>
          <option value="Sala de Aula 16 - Central de Aulas II">Sala de Aula 16 - Central de Aulas II</option>
          <option value="Ateliê de Desenho I - Central de Aulas II">Ateliê de Desenho I - Central de Aulas II</option>
          <option value="Ateliê de Desenho II - Central de Aulas II">Ateliê de Desenho II - Central de Aulas II</option>
          <option value="Laboratório de Informática 01 (IMD) - Central de Aulas II">Laboratório de Informática 01 (IMD) - Central de Aulas II</option>
          <option value="Laboratório de Informática 02 (IMD) - Central de Aulas II">Laboratório de Informática 02 (IMD) - Central de Aulas II</option>
          <option value="Sala de Aula 01 - Laboratório de Tecnologia da Informação">Sala de Aula 01 - Laboratório de Tecnologia da Informação</option>
          <option value="Sala de Aula 02 - Laboratório de Tecnologia da Informação">Sala de Aula 02 - Laboratório de Tecnologia da Informação</option>
          <option value="Sala de Aula 03 - Laboratório de Tecnologia da Informação">Sala de Aula 03 - Laboratório de Tecnologia da Informação</option>
          <option value="Sala de Aula 04 - Laboratório de Tecnologia da Informação">Sala de Aula 04 - Laboratório de Tecnologia da Informação</option>
          <option value="Auditório - Laboratório de Tecnologia da Informação">Auditório - Laboratório de Tecnologia da Informação</option>
          <option value="Laboratório de Eletrônica - Laboratório de Tecnologia da Informação">Laboratório de Eletrônica - Laboratório de Tecnologia da Informação</option>
          <option value="Laboratório de Automação - Laboratório de Tecnologia da Informação">Laboratório de Automação - Laboratório de Tecnologia da Informação</option>
          <option value="Auditório Administrativo - Administrativo">Auditório Administrativo - Administrativo</option>
          <option value="Sala de Reuniões - Administrativo">Sala de Reuniões - Administrativo</option>
          <option value="Ginásio - Ginásio">Ginásio - Ginásio</option>
          <option value="Sala de Lutas / Atividades Físicas - Centro de Convivência">Sala de Lutas / Atividades Físicas - Centro de Convivência</option>
        </select>
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
          <option value="">Selecione...</option>
          <option value="ativo">Ativo</option>
          <option value="em_manutencao">Em Manutenção</option>
          <option value="inativo">Inativo</option>
        </select>
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

      {/* Data de Aquisição */}
      <div>
        <label>Data de Aquisição</label>
        <input
          type="date"
          value={dataAquisicao}
          onChange={(e) => setDataAquisicao(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded"
      >
        Salvar Item
      </button>
    </form>
  );
};

export default CreateItensForm;
