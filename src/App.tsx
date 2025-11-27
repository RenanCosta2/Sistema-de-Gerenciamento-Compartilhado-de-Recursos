// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Utils/Navbar";

import Home from "./pages/Home";
import ItensPatrimoniais from "./pages/ItensPatrimoniais";
import Manutencao from "./pages/Manutencao";
import Chamados from "./pages/Chamados";
import Espacos from "./pages/Espacos";
import AuthPage from "./pages/AuthPage";
import { GlobalToast } from "./components/Utils/GlobalToast";

import RequireAuth from "./components/Auth/RequireAuth";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="flex min-h-screen text-gray-900 bg-[#E6E9F2]">

      <GlobalToast />

      {!hideNavbar && <Navbar />}

      <div className={`flex flex-col flex-1 ${!hideNavbar ? "ml-60 px-8 py-10" : ""}`}>
        <main className="flex-1">

          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<AuthPage />} />

            {/* Rotas privadas */}
            <Route path="/" element={
              <RequireAuth><Home /></RequireAuth>
            } />
            <Route path="/itens" element={
              <RequireAuth><ItensPatrimoniais /></RequireAuth>
            } />
            <Route path="/manutencao" element={
              <RequireAuth><Manutencao /></RequireAuth>
            } />
            <Route path="/chamados" element={
              <RequireAuth><Chamados /></RequireAuth>
            } />
            <Route path="/espacos" element={
              <RequireAuth><Espacos /></RequireAuth>
            } />
          </Routes>

        </main>

        {!hideNavbar && (
          <footer className="text-center py-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Sistema de Gerenciamento Compartilhado de Recursos
          </footer>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
