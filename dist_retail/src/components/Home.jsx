import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // optional styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Distributor Dashboard</h1>
      <div className="card-container">
        <div className="card" onClick={() => navigate("/add-retailer")}>
          Add Retailer
        </div>
        <div className="card" onClick={() => navigate("/add-purchase")}>
          Add Purchase
        </div>
        <div className="card" onClick={() => navigate("/record-payment")}>
          Record Payment
        </div>
      </div>
    </div>
  );
};

export default Home;
