import { Link, useLocation, useNavigate } from "react-router-dom";
import { Boxes, Home, Wrench, MessageSquare, LogOut } from "lucide-react";
import clsx from "clsx";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/itens", label: "Itens Patrimoniais", icon: Boxes },
    { path: "/manutencao", label: "Manutenção", icon: Wrench },
    { path: "/chamados", label: "Chamados", icon: MessageSquare },
  ];

  const user = {
    nome: "Renan Costa",
    email: "renan.costa@example.com",
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleLogout = () => {
    console.log("Logout");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#E6E9F2] border-r border-gray-300 shadow-lg flex flex-col justify-between">
      <div>
        {/* Avatar e dados do usuário */}
        <div className="flex items-center gap-3 h-24 border-b border-gray-300 px-4">
          <div className="w-12 h-12 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-lg">
            {getInitials(user.nome)}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#2E3A59]">{user.nome}</span>
            <span className="text-xs text-gray-600">{user.email}</span>
          </div>
        </div>

        {/* Links de navegação */}
        <ul className="flex flex-col mt-6 space-y-2 px-4">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200",
                  location.pathname === path
                    ? "bg-[#415085]/20 text-[#415085] font-semibold"
                    : "text-black hover:bg-[#c7d2f0]/50 hover:text-[#415085]"
                )}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Rodapé + botão de logout */}
      <div className="px-4 py-4 border-t border-gray-300 flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-black hover:bg-[#c7d2f0]/50 hover:text-[#415085] transition-colors duration-200 cursor-pointer"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
