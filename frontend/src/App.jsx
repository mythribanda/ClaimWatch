import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Predict from "./pages/Predict.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

const App = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.colors.bg,
        color: theme.colors.text,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Navbar />
      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "2rem 1rem 3rem",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

