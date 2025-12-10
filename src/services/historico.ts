import api from "./api";

export interface Historico {
  id: number;
  tipo: string;
  item_id: number;
  nome_item: string;
  numero_tombo: string;
  localizacao: string;
  status: string;
  data_abertura: string;
  data_atualizacao: string;
  criado_em: string;
}

export async function getHistorico() {
  try {
    const response = await api.get("historico/historico/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    throw error;
  }
}
