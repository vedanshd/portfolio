import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const THEME_KEY = "portfolio-theme-preference";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (theme) {
      const root = window.document.documentElement;
      const isDark = theme === "dark";
      
      root.classList.toggle("dark", isDark);
      
      // Save to localStorage
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  // Don't render until initial theme is determined
  if (theme === null) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[999] rounded-full p-2 shadow-md bg-background border-2 border-border hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-primary"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === "dark" ? 
        <Moon className="h-5 w-5 text-primary" /> : 
        <Sun className="h-5 w-5 text-primary" />
      }
    </Button>
  );
}
