import { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function LoginForm({ onForgot, onRegister }: { onForgot: () => void, onRegister: () => void }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { user } = await login({ username: usuario, password: senha });
      setUser(user);
      navigate("/", { replace: true });
    } catch {
     setError("Usuário e/ou senha incorreto(s)");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Acesso ao Sistema de Patrimônio
      </h1>

      <p className="text-center text-gray-600 text-sm mb-8">
        Utilize suas credenciais institucionais (SIGAA / SIAPE)
      </p>

      <form onSubmit={handleLogin} className="w-full">
        {/* Usuário */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Digite seu usuário"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {/* Senha */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300 focus:ring-2 focus:ring-indigo-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-600 text-sm font-medium mb-3 text-center">
            {error}
          </p>
        )}
        {/* Entrar */}
        <button
          type="submit"
          className="w-full py-2.5 mt-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 cursor-pointer"
        >
          Entrar
        </button>
      </form>

      {/* Links */}
      <div className="mt-4">
        <button 
        onClick={onForgot} 
        className="text-sm text-blue-700 underline cursor-pointer">
          Esqueceu a senha?
        </button>
      </div>

      <div className="my-4 border-t border-gray-300" />

      <div className="mt-2 text-center text-sm">
        Não tem uma conta?{" "}
        <button onClick={onRegister} className="text-blue-700 font-medium underline cursor-pointer">
          Cadastre-se aqui
        </button>
      </div>
    </>
  );
}
