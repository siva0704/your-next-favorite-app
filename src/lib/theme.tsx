import React, { createContext, useContext, useEffect, useState } from "react";
import { Icon } from "@/components/Reveal";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("byk_theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      const root = document.documentElement;
      if (stored === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState("dark");
      const root = document.documentElement;
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("byk_theme", theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeToggle({
  className = "",
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl p-2.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary active:scale-95 ${
        isDark
          ? "bg-slate-800/90 text-amber-300 border border-slate-700 hover:bg-slate-700 shadow-md shadow-black/20"
          : "bg-white/90 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-brand-primary shadow-sm"
      } ${className}`}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        {isDark ? (
          <Icon
            name="light_mode"
            className="text-[20px] text-amber-300 transition-transform duration-300 rotate-0 scale-100 animate-spin-slow"
          />
        ) : (
          <Icon
            name="dark_mode"
            className="text-[20px] text-slate-700 transition-transform duration-300 rotate-0 scale-100"
          />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
