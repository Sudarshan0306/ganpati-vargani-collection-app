// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const [form, setForm] = useState({
    campaignId: "", // Optional, update if needed
    donorId: "",
    amount: "",
    mode: "cash",
    receiptNo: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/contributions?mine=true");
      setContributions(res.data);
    } catch (err) {
      alert("Failed to fetch contributions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, amount: Number(form.amount) };
      await axios.post("/contributions", payload);
      alert("Contribution submitted successfully");
      setForm((prev) => ({ ...prev, donorId: "", amount: "", notes: "" }));
      fetchContributions();
    } catch (err) {
      alert("Failed to submit contribution");
    }
  };

  const totalAmount = Array.isArray(contributions)
    ? contributions.reduce((sum, c) => sum + c.amount, 0)
    : 0;

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <h1 className="text-2xl font-bold mb-4">🙏 Welcome, {user?.name}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded mb-8"
      >
        <h2 className="text-lg font-semibold mb-3">📄 Submit Contribution</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Donor Name / ID"
            value={form.donorId}
            onChange={(e) => setForm({ ...form, donorId: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <select
            value={form.mode}
            onChange={(e) => setForm({ ...form, mode: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Receipt No (optional)"
            value={form.receiptNo}
            onChange={(e) => setForm({ ...form, receiptNo: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">📊 My Contributions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p className="mb-3 font-medium text-green-600">
              Total Collected: ₹{totalAmount}
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">Date</th>
                    <th className="p-2">Donor</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Mode</th>
                    <th className="p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((c) => (
                    <tr key={c._id} className="border-t">
                      <td className="p-2">
                        {new Date(c.date).toLocaleDateString()}
                      </td>
                      <td className="p-2">{c.donorId?.name || c.donorId}</td>
                      <td className="p-2">₹{c.amount}</td>
                      <td className="p-2">{c.mode}</td>
                      <td className="p-2">{c.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
