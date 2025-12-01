import api from "./api";

export interface Chamado {
  id: number;
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

export async function deleteChamado(id: number) {
  try {
    const response = await api.delete(`solicitacoes/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar solicitação:", error);
    throw error;
  }
}

export async function updateChamado(id: number, payload: Omit<Chamado, "id">) {
  try {
    const response = await api.patch(`solicitacoes/${id}/`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar solicitação:", error);
    throw error;
  }
}