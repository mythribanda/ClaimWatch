import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Predict from "./pages/Predict.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#e5e7eb" }}>
      <Navbar />
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1rem 3rem" }}>
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

