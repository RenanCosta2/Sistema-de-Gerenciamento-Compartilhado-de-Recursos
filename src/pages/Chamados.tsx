import React, { useState, useMemo, useEffect } from "react";
import ChamadosFilters from "../components/ChamadosFilters";
import ChamadosTable from "../components/ChamadosTable";
import ChamadosForm from "../components/ChamadosForm";
import { getChamados } from "../services/chamados";
import type { Chamado } from "../services/chamados";

const Chamados: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [chamados, setItens] = useState<Chamado[]>([]);
    const [loading, setLoading] = useState(true); // controle de carregamento

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await getChamados();
            setItens(data);
          } catch (error) {
            console.error("Erro ao carregar chamados:", error);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }, []);

    const filteredChamados = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return chamados.filter((item) => {
      const matchesSearch =
        item.id.toString().toLowerCase().includes(term) ||
        item.descricao.toLowerCase().includes(term);

        return matchesSearch
    });
  }, [searchTerm, chamados]);

  if (loading) {
    return (
      <section className="pt-4 px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
            Central de Chamados e Solicitações
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-[#2E3A59]">
                Abrir um Novo Chamado
            </h2>
            <ChamadosForm />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
          <p>Carregando dados...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 px-4">
        <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
            Central de Chamados e Solicitações
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-[#2E3A59]">
                Abrir um Novo Chamado
            </h2>
            <ChamadosForm />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mb-6 text-[#2E3A59]">
                    Chamados
                </h2>
                <ChamadosFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            <ChamadosTable key={filteredChamados.length} data={filteredChamados} />
      </div>
    </section>
  );
};

export default Chamados;
