import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createUser } from "../../services/auth";
import type { RegisterPayload } from "../../services/auth";

export default function RegisterForm() {
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirma, setShowConfirma] = useState(false);

  const [form, setForm] = useState<RegisterPayload & { confirmar: string }>({
    nome: "",
    email: "",
    username: "",
    siape: "",
    password: "",
    departamento: "",
    cargo: "",
    confirmar: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmar) {
      alert("As senhas não coincidem.");
      return;
    }

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      tipo_usuario: "aluno"
    };

    try {
      createUser(payload)
    } catch (err) {
      alert("Erro ao registrar usuário.");
      console.error(err);
    }
  };

  return (
    <form  onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
        Cadastro de Usuário
      </h1>

      <p className="text-center text-gray-600 text-sm mb-8">
        Preencha os dados para criar sua conta no sistema de patrimônio.
      </p>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Nome */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo *
          </label>
          <input
            name="nome"
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            placeholder="Digite seu nome completo"
            onChange={handleChange}
            value={form.nome}
          />
        </div>

        {/* Email Institucional */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Institucional *
          </label>
          <input
            name="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            placeholder="seu.email@universidade.edu"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        {/* Usuário SIGAA / SIAPE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usuário SIGAA / SIAPE *
          </label>
          <input
            name="username"
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            placeholder="Digite seu usuário"
            onChange={handleChange}
            value={form.username}
          />
        </div>

        {/* SIAPE Opcional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SIAPE (Opcional)
          </label>
          <input
            name="siape"
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            placeholder="Número SIAPE"
            onChange={handleChange}
            value={form.siape}
          />
        </div>

        {/* Senha */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha *
          </label>
          <input
            name="password"
            type={showSenha ? "text" : "password"}
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 pr-10"
            placeholder="Digite a senha"
            onChange={handleChange}
            value={form.password}
          />
          <button
            type="button"
            onClick={() => setShowSenha(!showSenha)}
            className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
          >
            {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirmar Senha */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Senha *
          </label>
          <input
            name="confirmar"
            type={showConfirma ? "text" : "password"}
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 pr-10"
            placeholder="Digite a senha novamente"
            onChange={handleChange}
            value={form.confirmar}
          />
          <button
            type="button"
            onClick={() => setShowConfirma(!showConfirma)}
            className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
          >
            {showConfirma ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Departamento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departamento *
          </label>
          <select
            name="departamento"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            onChange={handleChange}
            value={form.departamento}
          >
            <option value="">Selecione...</option>
            <option>Departamento de Computação</option>
            <option>Departamento de Engenharia</option>
            <option>Departamento Administrativo</option>
          </select>
        </div>

        {/* Cargo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cargo *
          </label>
          <select
            name="cargo"
            className="w-full px-4 py-2 rounded-lg bg-[#E6E9F2] border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
            onChange={handleChange}
            value={form.cargo}
          >
            <option value="">Selecione...</option>
            <option>Servidor</option>
            <option>Professor</option>
            <option>Técnico</option>
          </select>
        </div>
      </div>

      {/* Botão Criar Conta */}
      <button
        className="w-full py-2.5 mt-8 bg-blue-700 text-white rounded-lg font-semibold 
        hover:bg-blue-800 transition cursor-pointer"
      >
        Criar Conta
      </button>

      {/* NOTA FINAL */}
      <div className="mt-6 bg-[#EFF6FF] border border-[#C7DBF8] rounded-lg p-4 text-sm text-gray-700">
        <span className="font-semibold">Nota:</span> Sua conta será criada com permissões
        básicas. Para permissões administrativas, entre em contato com o suporte.
      </div>
    </form>
  );
}
