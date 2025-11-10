import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ItensPatrimoniais from "./pages/ItensPatrimoniais";

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
              <Route path="/itens" element={<ItensPatrimoniais />} />
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
