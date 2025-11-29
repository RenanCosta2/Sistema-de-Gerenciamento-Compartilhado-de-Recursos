import api from "./api";

export interface Espaco {
  id: number;
  nome: string;
}

export async function getEspacos() {
  try {
    const response = await api.get("localizacoes/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar espaços físicos:", error);
    throw error;
  }
}
