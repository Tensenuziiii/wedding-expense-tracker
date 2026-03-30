import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import Summary from "./pages/Summary";          // 🔥 ADD THIS
import Invitation from "./pages/Invitation";    // 🔥 ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category/:name" element={<CategoryPage />} />

        {/* 🔥 NEW ROUTES */}
        <Route path="/summary" element={<Summary />} />
        <Route path="/invitation" element={<Invitation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;