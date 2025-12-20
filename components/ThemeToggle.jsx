// components/ThemeToggle.jsx
import React from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded hover:bg-gray-700"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-900" />
      )}
    </button>
  );
}
