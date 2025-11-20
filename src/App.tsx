import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Utils/Navbar";
import ItensPatrimoniais from "./pages/ItensPatrimoniais";
import Manutencao from "./pages/Manutencao";
import Home from "./pages/Home";
import Chamados from "./pages/Chamados";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen text-gray-900 bg-[#E6E9F2]">
        {/* Sidebar fixa */}
        <Navbar />

        {/* Área principal */}
        <div className="flex flex-col flex-1 ml-60">
          <main className="flex-1 px-8 py-10">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="/itens" element={<ItensPatrimoniais />} />
            </Routes>
            <Routes>
              <Route path="/manutencao" element={<Manutencao />} />
            </Routes>
            <Routes>
              <Route path="/chamados" element={<Chamados />} />
            </Routes>
          </main>

          {/* Rodapé */}
          <footer className="text-center py-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Sistema de Gerenciamento Compartilhado de Recursos
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
