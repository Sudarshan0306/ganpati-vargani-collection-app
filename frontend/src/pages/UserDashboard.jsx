import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const token = useSelector((state) => state.user.accessToken);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);

  const fetchTotal = async () => {
    try {
      const res = await axios.get("http://localhost:3000/taxonomy/total", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch total", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/taxonomy",
        { amount, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount("");
      setNote("");
      fetchTotal();
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ganpati Vargani Collection</h1>

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <input
          className="border p-2 w-full mb-3"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        <input
          className="border p-2 w-full mb-3"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note (optional)"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <div className="text-lg font-medium">
        💰 Total Collected: <span className="font-bold">₹{total}</span>
      </div>
    </div>
  );
};

export default UserDashboard;
