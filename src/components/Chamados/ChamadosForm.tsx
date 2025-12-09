import React, { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import { getItens } from "../../services/itens";
import type { Item } from "../../services/itens";
import { createChamado } from "../../services/chamados";

const ChamadosForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
  const [tipoChamado, setTipoChamado] = useState("");
  const [itemPrimordial, setItemPrimordial] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [anexos, setAnexos] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [inputKey, setInputKey] = useState(0); // 🔑 força recriação do input

  const [itens, setItens] = useState<Item[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getItens();
          setItens(data);
        } catch (error) {
          console.error("Erro ao carregar itens:", error);
        }
      }
      fetchData();
    }, []);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setAnexos((prev) => [...prev, ...Array.from(files)]);
    // força recriação do input para aceitar o mesmo arquivo novamente
    setInputKey((prev) => prev + 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (index: number) => {
    setAnexos((prev) => prev.filter((_, i) => i !== index));
    setInputKey((prev) => prev + 1); // recria input para permitir novo upload
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        titulo,
        tipo: tipoChamado,
        descricao,
        patrimonio: Number(itemPrimordial),
      };

      console.log(payload)

      const response = await createChamado(payload);

      if (onCreated) onCreated();

      // reset
      setTipoChamado("");
      setItemPrimordial("");
      setTitulo("");
      setDescricao("");
      setAnexos([]);

      if (inputRef.current) inputRef.current.value = "";

    } catch (error) {
      console.error("Erro ao enviar chamado:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tipo de Chamado */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Tipo de Chamado
        </label>
        <select
          value={tipoChamado}
          onChange={(e) => setTipoChamado(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        >
          <option value="">Selecione...</option>
          <option value="falta">Falta</option>
          <option value="dano">Dano</option>
          <option value="manutencao">Manutenção</option>
          <option value="substituicao">Substituição</option>
        </select>
      </div>

      {/* Item Primordial */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Item Primordial
        </label>
        <select
          value={itemPrimordial}
          onChange={(e) => setItemPrimordial(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        >
          <option value="">Selecione...</option>
          {itens.map((item) =>{
            return (
              <option value={item.id}>{item.nome} | {item.localizacao_nome_bloco}</option>
            )
          })}
        </select>
      </div>

      {/* Título / Assunto */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Título / Assunto
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Informe o título do chamado..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        />
      </div>

      {/* Descrição detalhada */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Descrição detalhada
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          placeholder="Descreva o problema ou solicitação com detalhes..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
          required
        />
      </div>

      {/* Anexos */}
      {/* <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Anexos
        </label>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-32 rounded-lg transition cursor-pointer ${
            dragActive
              ? "border-indigo-500 bg-indigo-50 border-2 border-dashed"
              : "border-gray-300 border-2 border-dashed bg-white"
          } p-4`}
        >
          <input
            key={inputKey} // 🔑 força recriação
            ref={inputRef}
            id="file-upload"
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />

          <Upload size={28} className="text-indigo-500 mb-2 pointer-events-none" />
          <p className="text-sm text-gray-700 text-center pointer-events-none">
            <span className="font-semibold text-indigo-600">Clique</span> ou
            arraste arquivos aqui para anexar
          </p>
          <p className="text-xs text-gray-400 text-center pointer-events-none">
            Suporta múltiplos arquivos
          </p>
        </div>

        {anexos.length > 0 && (
          <ul className="mt-3 space-y-2">
            {anexos.map((file, idx) => (
              <li
                key={`${file.name}-${idx}`}
                className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
              >
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* Botão Enviar */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-[#415085] hover:bg-[#303a63] text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
        >
          Enviar Chamado
        </button>
      </div>
    </form>
  );
};

export default ChamadosForm;
