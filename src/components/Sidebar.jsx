import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";
import AdminLogo from "./AdminLogo";

export default function Sidebar() {
  const [isDark, setIsDark] = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Settings", path: "/settings" },
  ];

  // Lock scroll saat sidebar terbuka di mobile
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <>
      {/* Tombol toggle hanya muncul di mobile (pojok kanan atas) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 bg-blue-700 dark:bg-blue-900 text-white p-2 rounded-md shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar utama */}
      <aside
        className={`fixed top-0 h-screen w-64 bg-blue-700 dark:bg-blue-900 text-white p-6 flex flex-col justify-between transition-transform duration-300 z-40
        lg:left-0 lg:translate-x-0 
        ${isOpen ? "translate-x-0 right-0" : "translate-x-full right-0"} 
        lg:right-auto lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            <AdminLogo size={32} accentClassName="text-white dark:text-white" />
            {/* Tombol close (hanya muncul di mobile) */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-white hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-4">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)} // auto close saat klik link di mobile
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

      {/* Overlay background di mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
