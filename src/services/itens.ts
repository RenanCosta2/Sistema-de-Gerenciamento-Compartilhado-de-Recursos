import api from "./api";

export interface Item {
  id: string;
  nome: string;
  categoria: string;
  localizacao: string;
  status: string;
  data_aquisicao: string;
}

export async function getItens() {
  try {
    const response = await api.get("patrimonios/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar patrimonios:", error);
    throw error;
  }
}