import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Box } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
        await login({ username: usuario, password: senha });
        navigate("/", { replace: true });
    } catch {
        alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6E9F2]">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-xl border border-gray-200">

        {/* Ícone topo */}
        <div className="flex justify-center mb-6">
          <Box size={48} className="text-blue-700" strokeWidth={1.5} />
        </div>

        {/* Títulos */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Acesso ao Sistema de Patrimônio
        </h1>

        <p className="text-center text-gray-600 text-sm mb-8">
          Utilize suas credenciais institucionais (SIGAA / SIAPE)
        </p>

        {/* Campo Usuário */}
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Usuário
        </label>

        <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Digite seu usuário SIGAA / SIAPE"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            required
        />
        </div>

        {/* Campo Senha */}
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha
        </label>

        <div className="relative">
            <input
            type={showPassword ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 pr-10"
            required
            />

            {/* Olho */}
            <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
            >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
        </div>

        {/* Botão Entrar */}
        <button
          onClick={handleLogin}
          className="w-full py-2.5 mt-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition cursor-pointer"
        >
          Entrar
        </button>

        {/* Links inferiores */}
        <div className="mt-4">
          <button className="text-sm text-blue-700 underline cursor-pointer">
            Esqueceu a senha?
          </button>
        </div>

        {/* Divisória */}
        <div className="my-4 border-t border-gray-300" />

        <div className="mt-2 text-center text-sm">
          Não tem uma conta?{" "}
          <button className="text-blue-700 font-medium hover:underline cursor-pointer">
            Cadastre-se aqui
          </button>
        </div>
      </div>
    </div>
  );
}
