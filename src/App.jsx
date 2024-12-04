import  { useState } from "react";
// import TransactionList from "./TransactionList";
import { fetchTransactions } from "./fetchTransactions";

const App = () => {
  const [address, setAddress] = useState("");
  // const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const txs = await fetchTransactions(address);
      console.log(txs);
      // setTransactions(txs);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("Failed to fetch transactions. Check the console for details.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Ethereum Transactions Explorer</h1>
      <input
        type="text"
        placeholder="Enter Ethereum address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleFetch} style={{ padding: "10px 20px" }}>
        {loading ? "Loading..." : "Fetch Transactions"}
      </button>
      {/* <TransactionList transactions={transactions} /> */}
    </div>
  );
};

export default App;
