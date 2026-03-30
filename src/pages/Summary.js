import { useEffect, useState } from "react";

// 🔥 FIREBASE IMPORT
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Summary() {
  const [summary, setSummary] = useState({
    totalAdvance: 0,
    totalBalance: 0,
    totalPayment: 0,
    categoryData: []
  });

  // 🔥 FORMAT ₹
  const formatCurrency = (num) => {
    return num.toLocaleString("en-IN");
  };

  // 🔥 LOAD FROM FIREBASE
  useEffect(() => {
    const fetchSummary = async () => {
      let advanceSum = 0;
      let balanceSum = 0;
      let totalSum = 0;
      let categoryDetails = [];

      try {
        const querySnapshot = await getDocs(collection(db, "categories"));

        querySnapshot.forEach((docSnap) => {
          const rows = docSnap.data().rows || [];

          let catAdvance = 0;
          let catBalance = 0;
          let catTotal = 0;

          rows.forEach((row) => {
            const adv = Number(row.advance) || 0;
            const bal = Number(row.balance) || 0;
            const tot = Number(row.total) || 0;

            catAdvance += adv;
            catBalance += bal;
            catTotal += tot;
          });

          advanceSum += catAdvance;
          balanceSum += catBalance;
          totalSum += catTotal;

          categoryDetails.push({
            name: docSnap.id,
            advance: catAdvance,
            balance: catBalance,
            total: catTotal
          });
        });

        setSummary({
          totalAdvance: advanceSum,
          totalBalance: balanceSum,
          totalPayment: totalSum,
          categoryData: categoryDetails
        });

      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div style={containerStyle}>
      <h2>Summary</h2>

      {/* 🔥 OVERALL TOTALS */}
      <div style={cardContainer}>
        <div style={cardStyle}>
          <h3>Total Payment</h3>
          <p>₹ {formatCurrency(summary.totalPayment)}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Advance</h3>
          <p>₹ {formatCurrency(summary.totalAdvance)}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Balance</h3>
          <p>₹ {formatCurrency(summary.totalBalance)}</p>
        </div>
      </div>

      {/* 🔥 CATEGORY TABLE */}
      <h3>Category Breakdown</h3>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
            <th>Advance</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {summary.categoryData.length > 0 ? (
            summary.categoryData.map((cat, index) => (
              <tr key={index}>
                <td>{cat.name}</td>
                <td>₹ {formatCurrency(cat.total)}</td>
                <td>₹ {formatCurrency(cat.advance)}</td>
                <td>₹ {formatCurrency(cat.balance)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// 🔥 STYLES
const containerStyle = {
  padding: "30px",
  textAlign: "center"
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "30px",
  flexWrap: "wrap"
};

const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  minWidth: "180px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const tableStyle = {
  margin: "auto",
  width: "80%",
  borderCollapse: "collapse"
};

export default Summary;