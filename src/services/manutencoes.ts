import api from "./api";

export interface Manutencao {
  id: string;
  patrimonio_nome: string;
  descricao: string;
  data_inicio: string;
  data_fim: string | null;
  status: string;
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