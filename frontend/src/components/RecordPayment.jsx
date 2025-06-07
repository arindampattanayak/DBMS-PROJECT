import React, { useState, useEffect } from "react";
import "./RecordPayment.css";

const RecordPayment = () => {
  const [payment, setPayment] = useState({
    retailerName: "",
    retailerId: "",
    amount: "",
    date: ""
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    setPayment((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: send data to backend here
    console.log("Payment Recorded:", payment);

    setPayment({
      retailerName: "",
      retailerId: "",
      amount: "",
      date: new Date().toISOString().split("T")[0]
    });
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

        <label>Retailer ID:</label>
        <input
          type="text"
          name="retailerId"
          value={payment.retailerId}
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

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default RecordPayment;
