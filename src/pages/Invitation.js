import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Invitation() {
  const [guests, setGuests] = useState([
    { name: "", phone: "", status: "" }
  ]);

  // 🔥 LOAD DATA
  useEffect(() => {
    const saved = localStorage.getItem("invitation");
    if (saved) {
      setGuests(JSON.parse(saved));
    }
  }, []);

  // ➕ Add Guest
  const addGuest = () => {
    setGuests([...guests, { name: "", phone: "", status: "" }]);
  };

  // ✏️ Handle Input
  const handleChange = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  // 💾 SAVE
  const saveData = () => {
    localStorage.setItem("invitation", JSON.stringify(guests));
    alert("Invitation list saved ✅");
  };

  // 📥 EXPORT
  const exportToExcel = () => {
    const data = guests.map((g, i) => ({
      "Sl.No": i + 1,
      "Name": g.name,
      "Phone": g.phone,
      "Status": g.status
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invitation");

    const buffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([buffer], {
      type: "application/octet-stream"
    });

    saveAs(file, "Invitation_List.xlsx");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Invitation List</h2>

      <table border="1" style={{ margin: "auto", width: "80%" }}>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Status (Invited/Confirmed)</th>
          </tr>
        </thead>

        <tbody>
          {guests.map((g, i) => (
            <tr key={i}>
              <td>{i + 1}</td>

              <td>
                <input
                  value={g.name}
                  onChange={(e) =>
                    handleChange(i, "name", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={g.phone}
                  onChange={(e) =>
                    handleChange(i, "phone", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={g.status}
                  placeholder="Invited / Confirmed"
                  onChange={(e) =>
                    handleChange(i, "status", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={addGuest}>+ Add Guest</button>

      <br /><br />

      <button onClick={saveData}>💾 Save</button>

      <br /><br />

      <button onClick={exportToExcel}>📥 Export Excel</button>
    </div>
  );
}

export default Invitation;