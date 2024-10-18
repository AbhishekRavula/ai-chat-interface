import React, { useState } from "react";
import { Sun, Moon, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const getTheme = () => {
  let theme = localStorage.getItem("theme");
  if (theme) {
    document.documentElement.classList.add(theme);
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      theme = "dark";
    } else {
      document.documentElement.classList.add("light");
      theme = "light";
    }
    localStorage.setItem("theme", theme);
  }
  return theme;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState(getTheme);

  const toggleDarkMode = () => {
    document.documentElement.classList.remove(theme);

    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity sm:hidden z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`rounded-lg sm:my-2 sm:ml-2  fixed inset-y-0 left-0 w-64 bg-surface shadow-xl transform transition-transform sm:translate-x-0 sm:static sm:inset-0 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Menu
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2 sm:hidden"
              onClick={onClose}
            >
              <X className="text-gray-800 dark:text-gray-200" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 rounded-md hover:bg-paper dark:hover:bg-paper text-dark dark:text-white"
                >
                  Export Chat
                </a>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 mr-2" />
              ) : (
                <Moon className="h-5 w-5 mr-2" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
