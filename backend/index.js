const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "distributor_db",
  
  password: "Sanjib@567"
});

// POST route to add a retailer
app.post("/api/retailers", (req, res) => {
  const { name, address, openingBalance, contactNumber } = req.body;
  const id = uuidv4();

  const q = `INSERT INTO retailers (id, name, address, opening_balance, contact_number)
             VALUES (?, ?, ?, ?, ?)`;
  connection.query(q, [id, name, address, openingBalance, contactNumber], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add retailer" });
    }
    res.status(201).json({ message: "Retailer added successfully", id });
  });
});

// POST /api/purchases - add purchase linked to retailer by name+contactNumber
// ✅ Add Purchase

// ✅ Add Purchase Endpoint
app.post("/api/purchases", (req, res) => {
  const { retailerName, contactNumber, purchaseId, amount,date } = req.body;

  if (!retailerName || !contactNumber || !purchaseId || !amount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Step 1: Get retailer_id from retailerName & contactNumber
  const getRetailerQuery = `
    SELECT id FROM retailers 
    WHERE name = ? AND contact_number = ?
  `;

  connection.query(getRetailerQuery, [retailerName, contactNumber], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error while fetching retailer" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Retailer not found" });
    }

    const retailerId = result[0].id;

    // Step 2: Insert into purchases
    const id = uuidv4();
    console.log("Inserting purchase with values:", {
  id, retailerId, purchaseId, amount, date
});

   const insertPurchaseQuery = `
  INSERT INTO purchases (id, retailer_id, purchase_id, amount, purchase_date)
  VALUES (?, ?, ?, ?, ?)
`;

connection.query(insertPurchaseQuery, [id, retailerId, purchaseId, amount, date], (err2, result2) => {
  if (err2) {
    console.error("Insert error:", err2);
    return res.status(500).json({ error: "Error inserting purchase" });
  }

  res.status(200).json({ message: "Purchase added successfully", purchaseId: result2.insertId });
});

  });
});
app.listen(5000, () => {
  console.log("Backend server running at http://localhost:5000");
});

