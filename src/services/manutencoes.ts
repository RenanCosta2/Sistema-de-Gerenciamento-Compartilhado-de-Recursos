import api from "./api";

export interface Manutencao {
  id: number;
  patrimonio_nome: string;
  descricao: string;
  data_inicio: string;
  data_fim: string | null;
  status: "pendente" | "em_andamento" | "concluido";
  patrimonio: number;
  usuario: number;
}

export async function getManutencoes() {
  try {
    const response = await api.get("manutencoes/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar manutenções:", error);
    throw error;
  }
}

export async function createManutencao(payload: Omit<Manutencao, "id" | "patrimonio_nome">) {
  try {
    const response = await api.post("manutencoes/", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar manutenção:", error);
    throw error;
  }
}

export async function updateManutencao(id: number, payload: Omit<Manutencao, "id" | "patrimonio_nome">) {
  try {
    const response = await api.patch(`manutencoes/${id}/`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar manutenção:", error);
    throw error;
  }
}

export async function deleteManutencao(id: number) {
  try {
    const response = await api.delete(`manutencoes/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar manutenção:", error);
    throw error;
  }
}