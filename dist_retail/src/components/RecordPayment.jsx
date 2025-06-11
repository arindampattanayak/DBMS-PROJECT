import React, { useState, useEffect } from "react";
import "./RecordPayment.css";

const RecordPayment = () => {
  const [payment, setPayment] = useState({
    retailerName: "",
    contactNumber: "",
    amount: "",
    date: "",
    payment_method: "",
    payment_status: ""
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setPayment((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payment)
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Payment recorded successfully!");
      console.log("Server response:", data);
      setPayment({
        retailerName: "",
        contactNumber: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        payment_method: "",
        payment_status: ""
      });
    } else {
      alert("❌ Error: " + data.error);
      console.error("Server returned an error:", data);
    }
  } catch (error) {
    alert("❌ Network error! See console for details.");
    console.error("Fetch error:", error);
  }
};


  return (
    <div className="payment-form-container">
      <h2>Record Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label>Retailer Name:</label>
        <input
          type="text"
          name="retailerName"
          value={payment.retailerName}
          onChange={handleChange}
          required
        />

        <label>Retailer Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={payment.contactNumber}
          onChange={handleChange}
          required
        />

        <label>Amount Given (₹):</label>
        <input
          type="number"
          name="amount"
          value={payment.amount}
          onChange={handleChange}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={payment.date}
          onChange={handleChange}
          required
        />

        <label>Payment Method:</label>
        <select
          name="payment_method"
          value={payment.payment_method}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Method --</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="bank transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
        </select>

        <label>Payment Status / Notes:</label>
        <textarea
          name="payment_status"
          value={payment.payment_status}
          onChange={handleChange}
          placeholder="Optional remarks or status..."
        ></textarea>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default RecordPayment;
