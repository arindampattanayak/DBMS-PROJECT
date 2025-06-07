import React, { useState } from "react";
import axios from "axios";
import "./AddRetailer.css";

const AddRetailer = () => {
  const [retailer, setRetailer] = useState({
    name: "",
    address: "",
    openingBalance: "",
    contactNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRetailer({ ...retailer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/retailers", retailer);
      console.log("Retailer added:", res.data);
      alert("Retailer successfully added!");

      setRetailer({
        name: "",
        address: "",
        openingBalance: "",
        contactNumber: ""
      });
    } catch (error) {
      console.error("Error adding retailer:", error);
      alert("Failed to add retailer");
    }
  };

  return (
    <div className="retailer-form-container">
      <h2>Add New Retailer</h2>
      <form className="retailer-form" onSubmit={handleSubmit}>
        <label>Retailer Name:</label>
        <input
          type="text"
          name="name"
          value={retailer.name}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={retailer.address}
          onChange={handleChange}
          required
        />

        <label>Opening Balance (₹):</label>
        <input
          type="number"
          name="openingBalance"
          value={retailer.openingBalance}
          onChange={handleChange}
          required
        />

        <label>Contact Number:</label>
        <input
          type="text"
          name="contactNumber"
          value={retailer.contactNumber}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Retailer</button>
      </form>
    </div>
  );
};

export default AddRetailer;
