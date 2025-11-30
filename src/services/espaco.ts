import api from "./api";

export interface Espaco {
  id: number;
  nome: string;
  bloco: string;
  tipo: string;
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

export async function createEspaco(payload: Omit<Espaco, "id">) {
  try {
    const response = await api.post("localizacoes/", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar espaço físico:", error);
    throw error;
  }
}

export async function updateEspaco(id: number, payload: Omit<Espaco, "id">) {
  try {
    const response = await api.patch(`localizacoes/${id}/`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar espaço físico:", error);
    throw error;
  }
}