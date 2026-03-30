import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    "Marriage Hall",
    "Catering",
    "Decoration"
  ]);

  const [newCategory, setNewCategory] = useState("");

  // 🔥 LOAD SAVED DATA
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // ➕ Add Category
  const addCategory = () => {
    if (newCategory.trim() === "") return;
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };

  // ❌ Delete Category
  const deleteCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  // 💾 SAVE BUTTON FUNCTION
  const saveCategories = () => {
    localStorage.setItem("categories", JSON.stringify(categories));
    alert("Categories Saved ✅");
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* 🔥 TOP ACTION BUTTONS */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => navigate("/summary")}>
          📊 Summary
        </button>

        <button
          onClick={() => navigate("/invitation")}
          style={{ marginLeft: "10px" }}
        >
          💌 Invitation
        </button>
      </div>

      {/* ADD SECTION */}
      <div className="add-section">
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add</button>
      </div>

      {/* CATEGORY CARDS */}
      <div className="grid">
        {categories.map((cat, index) => (
          <div className="card" key={index}>
            <h3 onClick={() => navigate(`/category/${cat}`)}>
              {cat}
            </h3>
            <button onClick={() => deleteCategory(index)}>Delete</button>
          </div>
        ))}
      </div>

      <br />

      {/* 💾 SAVE BUTTON */}
      <button onClick={saveCategories}>💾 Save Categories</button>
    </div>
  );
}

export default Dashboard;