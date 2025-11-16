import api from "./api";

export interface Chamado {
  id: string;
  tipo: string;
  descricao: string;
  data_registro?: Date;
  status: string;
  data_criacao?: string;
  usuario?: number;
  patrimonio: number;
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

export async function createChamado(payload: Omit<Chamado, "id" | "data_registro" | "status">) {
  try {
    const response = await api.post("solicitacoes/", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar solicitação:", error);
    throw error;
  }
}