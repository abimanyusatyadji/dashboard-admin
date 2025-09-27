import { NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; // pastikan sudah install lucide-react
import useDarkMode from "../hooks/useDarkMode";
import AdminLogo from "./AdminLogo";

export default function Sidebar() {
  const [isDark, setIsDark] = useDarkMode();

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-blue-700 dark:bg-blue-900 text-white fixed left-0 top-0 p-6 flex flex-col justify-between transition-colors">
      <div>
        <AdminLogo size={32} accentClassName="text-white dark:text-white" />
        <nav className="space-y-4">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-900 dark:bg-blue-800"
                    : "hover:bg-blue-600 dark:hover:bg-blue-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </aside>
  );
}
