import "./CategoryPage.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function CategoryPage() {
  const { name } = useParams();

  const [rows, setRows] = useState([
    { date: "", head: "", total: "", advance: "", balance: 0 }
  ]);

  // 🔥 LOAD DATA
  useEffect(() => {
    const savedData = localStorage.getItem(name);
    if (savedData) {
      setRows(JSON.parse(savedData));
    }
  }, [name]);

  // ➕ Add Row
  const addRow = () => {
    setRows([
      ...rows,
      { date: "", head: "", total: "", advance: "", balance: 0 }
    ]);
  };

  // ❌ Delete Row
  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(
      updated.length
        ? updated
        : [{ date: "", head: "", total: "", advance: "", balance: 0 }]
    );
  };

  // ✏️ Handle Input
  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    const total = parseFloat(updated[index].total) || 0;
    const advance = parseFloat(updated[index].advance) || 0;

    updated[index].balance = total - advance;

    setRows(updated);
  };

  // 💾 SAVE DATA
  const saveData = () => {
    localStorage.setItem(name, JSON.stringify(rows));
    alert("Data Saved Successfully ✅");
  };

  // 📥 EXPORT TO EXCEL
  const exportToExcel = () => {
    const data = rows.map((row, index) => ({
      "Sl.No": index + 1,
      "Date": row.date,
      "Head of Account": row.head,
      "Total Payment": row.total,
      "Advance Payment": row.advance,
      "Balance Payment": row.balance
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, name);

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(file, `${name}.xlsx`);
  };

  // 🔢 Totals
  const totalAdvance = rows.reduce(
    (sum, row) => sum + (parseFloat(row.advance) || 0),
    0
  );

  const totalBalance = rows.reduce(
    (sum, row) => sum + (parseFloat(row.balance) || 0),
    0
  );

  return (
    <div className="container">
      <h2>{name}</h2>

      <table>
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Date</th> {/* 🔥 NEW COLUMN */}
            <th>Head of Account</th>
            <th>Total Payment</th>
            <th>Advance Payment</th>
            <th>Balance Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              {/* 🔥 DATE INPUT */}
              <td>
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) =>
                    handleChange(index, "date", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  value={row.head}
                  placeholder="Enter item"
                  onChange={(e) =>
                    handleChange(index, "head", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.total}
                  onChange={(e) =>
                    handleChange(index, "total", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.advance}
                  onChange={(e) =>
                    handleChange(index, "advance", e.target.value)
                  }
                />
              </td>

              <td>{row.balance}</td>

              <td>
                <button onClick={() => deleteRow(index)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="4"><b>Total</b></td>
            <td><b>{totalAdvance}</b></td>
            <td><b>{totalBalance}</b></td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <br />

      <button onClick={addRow}>+ Add Row</button>

      <br /><br />

      <button onClick={saveData}>💾 Save Data</button>

      <br /><br />

      <button onClick={exportToExcel}>📥 Export to Excel</button>
    </div>
  );
}

export default CategoryPage;