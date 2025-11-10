import { Link, useLocation } from "react-router-dom";
import { Boxes } from "lucide-react";
import clsx from "clsx";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/itens", label: "Itens Patrimoniais", icon: Boxes },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#E6E9F2] border-r border-gray-300 shadow-lg flex flex-col justify-between">
      <div>
        {/* Logo / título */}
        <div className="flex items-center justify-center h-20 border-b border-gray-300">
          <h1 className="text-2xl font-bold text-indigo-400">SGCR</h1>
        </div>

        {/* Links de navegação */}
        <ul className="flex flex-col mt-6 space-y-2 px-4">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                  location.pathname === path
                    ? "bg-[#415085]/20 text-[#415085] font-semibold"
                    : "text-black hover:bg-gray-200"
                )}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Rodapé opcional */}
      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-300">
        © 2025 SGCR
      </div>
    </aside>
  );
};

export default Navbar;
