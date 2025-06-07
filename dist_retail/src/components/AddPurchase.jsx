import React, { useState, useEffect } from "react";
import "./AddPurchase.css";
import axios from "axios";

const AddPurchase = () => {
  const [purchase, setPurchase] = useState({
    retailerName: "",
    contactNumber: "",
    purchaseId: "",
    amount: "",
    date: ""
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setPurchase((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchase({ ...purchase, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/purchases", purchase);
      console.log("Purchase Recorded:", res.data);
      alert("Purchase recorded successfully!");
      setPurchase({ retailerName: "", contactNumber: "", purchaseId: "", amount: "", date: new Date().toISOString().split("T")[0] });
    } catch (err) {
      console.error("Error adding purchase:", err.message);
      alert("Error recording purchase");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Record Purchase</h3>
      <input
        name="retailerName"
        placeholder="Retailer Name"
        value={purchase.retailerName}
        onChange={handleChange}
        required
      />
      <input
        name="contactNumber"
        placeholder="Contact Number"
        value={purchase.contactNumber}
        onChange={handleChange}
        required
      />
      <input
        name="purchaseId"
        placeholder="Purchase ID"
        value={purchase.purchaseId}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        placeholder="Amount"
        type="number"
        value={purchase.amount}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={purchase.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Record Purchase</button>
    </form>
  );
};

export default AddPurchase;
