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

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (dados: ItemFormValues) => void;
};

const ItemAddModal: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [numeroTombo, setNumeroTombo] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [status, setStatus] = useState("");
  const [dataAquisicao, setDataAquisicao] = useState("");
  const [responsavel, setResponsavel] = useState("");

  if (!open) return null;

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
    onClose();

    setNome("");
    setDescricao("");
    setNumeroTombo("");
    setLocalizacao("");
    setStatus("");
    setDataAquisicao("");
    setResponsavel("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative">

        {/* Título */}
        <h2 className="text-2xl font-bold text-[#2E3A59] mb-4">
          Adicionar Item Patrimonial
        </h2>

        {/* Conteúdo */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Nome */}
          <div>
            <label className="block font-medium text-sm mb-1">Nome *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Monitor Samsung 24'"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block font-medium text-sm mb-1">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição do item (opcional)"
              rows={3}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Número do Tombo */}
          <div>
            <label className="block font-medium text-sm mb-1">
              Número do Tombo *
            </label>
            <input
              type="text"
              value={numeroTombo}
              onChange={(e) => setNumeroTombo(e.target.value)}
              placeholder="Ex: NT006"
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Localização */}
          <div>
            <label className="block font-medium text-sm mb-1">Localização *</label>
            <select
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              required
              className="w-full border rounded-lg p-2"
            >
              <option value="">Selecione...</option>

              {/* opções mantidas */}
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

              <option value="Sala de Aula 01 - Laboratório de Tecnologia da Informação">
                Sala de Aula 01 - Laboratório de Tecnologia da Informação
              </option>
              <option value="Sala de Aula 02 - Laboratório de Tecnologia da Informação">
                Sala de Aula 02 - Laboratório de Tecnologia da Informação
              </option>
              <option value="Sala de Aula 03 - Laboratório de Tecnologia da Informação">
                Sala de Aula 03 - Laboratório de Tecnologia da Informação
              </option>
              <option value="Sala de Aula 04 - Laboratório de Tecnologia da Informação">
                Sala de Aula 04 - Laboratório de Tecnologia da Informação
              </option>

              <option value="Auditório - Laboratório de Tecnologia da Informação">
                Auditório - Laboratório de Tecnologia da Informação
              </option>

              <option value="Laboratório de Eletrônica - Laboratório de Tecnologia da Informação">
                Laboratório de Eletrônica - Laboratório de Tecnologia da Informação
              </option>
              <option value="Laboratório de Automação - Laboratório de Tecnologia da Informação">
                Laboratório de Automação - Laboratório de Tecnologia da Informação
              </option>

              <option value="Auditório Administrativo - Administrativo">
                Auditório Administrativo - Administrativo
              </option>
              <option value="Sala de Reuniões - Administrativo">Sala de Reuniões - Administrativo</option>

              <option value="Ginásio - Ginásio">Ginásio - Ginásio</option>
              <option value="Sala de Lutas / Atividades Físicas - Centro de Convivência">
                Sala de Lutas / Atividades Físicas - Centro de Convivência
              </option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium text-sm mb-1">Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full border rounded-lg p-2"
            >
              <option value="">Selecione...</option>
              <option value="ativo">Ativo</option>
              <option value="em_manutencao">Em Manutenção</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          {/* Responsável */}
          <div>
            <label className="block font-medium text-sm mb-1">
              Responsável (ID do usuário)
            </label>
            <input
              type="number"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="ID do usuário (opcional)"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Data de Aquisição */}
          <div>
            <label className="block font-medium text-sm mb-1">
              Data de Aquisição
            </label>
            <input
              type="date"
              value={dataAquisicao}
              onChange={(e) => setDataAquisicao(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
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

export default ItemAddModal;
