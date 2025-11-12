import React, { useState, useMemo } from "react";
import chamadosData from "../data/chamados.json"
import ChamadosFilters from "../components/ChamadosFilters";
import ChamadosTable from "../components/ChamadosTable";
import ChamadosForm from "../components/ChamadosForm";

const Chamados: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredChamados = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return chamadosData.filter((item) => {
      const matchesSearch =
        item.id.toString().toLowerCase().includes(term) ||
        item.titulo.toLowerCase().includes(term);

        return matchesSearch
    });
  }, [searchTerm]);

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

            {/* Adicione uma key baseada no filteredChamados para forçar resetar a página */}
            <ChamadosTable key={filteredChamados.length} data={filteredChamados} />
      </div>
    </section>
  );
};

export default Chamados;
