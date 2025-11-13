import api from "./api";

export interface Manutencao {
  id: string;
  patrimonio_nome: string;
  tipo: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  status: string;
  patrimonio: Int16Array;
  usuario: Int16Array;
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