import api from "./api";

export interface Chamado {
  id: string;
  tipo: string;
  descricao: string;
  data_registro: string;
  status: string;
  data_criacao: string;
  usuario: Int16Array;
  patrimonio: Int16Array;
}

export async function getChamados() {
  try {
    const response = await api.get("solicitacoes/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar solicitações:", error);
    throw error;
  }
}