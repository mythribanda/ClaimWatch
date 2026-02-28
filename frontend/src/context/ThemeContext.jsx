import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const theme = {
    isDark,
    setIsDark,
    colors: {
      bg: isDark ? "#0f172a" : "#f8fafc",
      bgSecondary: isDark ? "#1e293b" : "#f1f5f9",
      bgTertiary: isDark ? "#334155" : "#e2e8f0",
      text: isDark ? "#e5e7eb" : "#1f2937",
      textSecondary: isDark ? "#9ca3af" : "#6b7280",
      textTertiary: isDark ? "#6b7280" : "#9ca3af",
      primary: "#6366f1",
      primaryDim: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)",
      border: isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(203, 213, 225, 0.5)",
      success: "#10b981",
      danger: "#ef4444",
      warning: "#f59e0b",
    },
    gradients: {
      bg: isDark
        ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
        : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 800,
        lineHeight: "1.2",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: "1.3",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: "1.4",
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: "1.5",
      },
      body: {
        fontSize: "1.0625rem",
        fontWeight: 400,
        lineHeight: "1.6",
      },
      bodySmall: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: "1.5",
      },
      label: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: "1.5",
      },
      button: {
        fontSize: "1.0625rem",
        fontWeight: 600,
        lineHeight: "1.5",
      },
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
