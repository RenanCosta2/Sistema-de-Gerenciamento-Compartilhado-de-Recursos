import { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import { Box, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const [view, setView] = useState<"login" | "register" | "forgot">("login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6E9F2]">
      
      {/* O CARD PRECISA SER relative */}
      <div className={`
        relative bg-white w-full p-10 rounded-2xl shadow-xl border border-gray-200
        ${view === "login" ? "max-w-lg" : ""}
        ${view === "register" ? "max-w-3xl" : ""}
        ${view === "forgot" ? "max-w-md" : ""}
      `}>

        {/* ÍCONE CENTRAL NO TOPO */}
        <div className="flex justify-center mb-6">
          <Box size={48} className="text-blue-700" strokeWidth={1.5} />
        </div>

        {/* BOTÃO DE VOLTAR AGORA FICA DENTRO DO CARD CORRETAMENTE */}
        {view === "register" && (
          <button
            onClick={() => setView("login")}
            className="absolute top-4 left-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        )}

        {view === "login" && (
          <LoginForm
            onForgot={() => setView("forgot")}
            onRegister={() => setView("register")}
          />
        )}

        {view === "register" && <RegisterForm />}

        {view === "forgot" && (
          <ForgotPasswordForm
            onBack={() => setView("login")}
          />
        )}
      </div>
    </div>
  );
}
