import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Boxes, Home, Wrench, MessageSquare, LogOut, Building } from "lucide-react";
import { logout } from "../../services/auth";
import clsx from "clsx";
import ConfirmLogout from "./ConfirmLogout";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/itens", label: "Itens Patrimoniais", icon: Boxes },
    { path: "/manutencao", label: "Manutenção", icon: Wrench },
    { path: "/chamados", label: "Chamados", icon: MessageSquare },
    { path: "/espacos", label: "Espaços Físicos", icon: Building },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogoutClick = () => {
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    logout(); 
    setConfirmOpen(false);
  };

  const cancelLogout = () => {
    setConfirmOpen(false);
  };

  const getInitials = (name: string = "") =>
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#E6E9F2] border-r border-gray-300 shadow-lg flex flex-col justify-between z-40">
      <div>
        {/* Avatar e dados do usuário */}
        <div className="flex items-center gap-3 h-24 border-b border-gray-300 px-4">
          <div className="w-12 h-12 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold text-lg">
            {getInitials(user?.username ?? "")}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#2E3A59]">{user?.username ?? "Usuário"}</span>
            <span className="text-xs text-gray-600">{user?.email ?? ""}</span>
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
          onClick={handleLogoutClick}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-black hover:bg-[#c7d2f0]/50 hover:text-[#415085] transition-colors duration-200 cursor-pointer"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>

      <ConfirmLogout
        open={confirmOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </aside>
  );
};

export default Navbar;
