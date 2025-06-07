import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddRetailer from "./components/AddRetailer";
import AddPurchase from "./components/AddPurchase";
import RecordPayment from "./components/RecordPayment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/add-retailer" element={<AddRetailer />} />
        
<Route path="/add-purchase" element={<AddPurchase />} />
        <Route path="/record-payment" element={<RecordPayment />} />
        
      </Routes>
    </Router>
  );
};

export default App;
