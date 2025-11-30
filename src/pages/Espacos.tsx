import React, { useState, useMemo } from "react";
import EspacoAddModal from "../components/Espacos/EspacoAddModal";
import EspacoFilters from "../components/Espacos/EspacoFilters";
import EspacoTable from "../components/Espacos/EspacoTable";
interface Espaco {
  id: number;
  nome: string;
  tipo: string;
  bloco?: string;
  areaExterna: boolean;
}

const Espacos: React.FC = () => {
  const [espacos, setEspacos] = useState<Espaco[]>([]); // dados locais
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    tipos: [] as string[],
    blocos: [] as string[],
    areaExterna: null as boolean | null,
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filtragem
  const filteredEspacos = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return espacos.filter((e) => {
      const matchesSearch = e.nome.toLowerCase().includes(term);
      const matchesTipo =
        filters.tipos.length === 0 || filters.tipos.includes(e.tipo);
      const matchesBloco =
        filters.blocos.length === 0 || (e.bloco && filters.blocos.includes(e.bloco));
      const matchesAreaExterna =
        filters.areaExterna === null || e.areaExterna === filters.areaExterna;
      return matchesSearch && matchesTipo && matchesBloco && matchesAreaExterna;
    });
  }, [searchTerm, filters, espacos]);

  return (
    <section className="pt-4 px-4">
      <h2 className="text-3xl font-bold mb-6 text-[#2E3A59]">
        Gerenciamento de Espaços Físicos
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <EspacoFilters
          data={espacos}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="mt-6 flex justify-start">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Adicionar novo Espaço Físico
          </button>
        </div>

        {/* Modal de Criar */}
        {showCreateModal && (
          <EspacoAddModal
            open={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          />
        )}

        <EspacoTable
          key={filteredEspacos.length}
          data={filteredEspacos}
          // onEdit={(espaco) => {null}}
          // onDelete={(espaco) => {null}}
          // onView={(espaco) => {null}}
        />
      </div>
    </section>
  );
};

export default Espacos;
