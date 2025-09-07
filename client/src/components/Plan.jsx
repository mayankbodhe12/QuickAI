import React from "react";
import { PricingTable } from "@clerk/clerk-react";
import "./Plan.css";

const Plan = () => {
  return (
    <div className="plan-container">
      <div className="plan-header">
        <h2>Choose Your Plan</h2>
        <p>
          Start for free and scale up as you grow. Find the perfect plan for your
          content creation needs.
        </p>
      </div>

      <div className="plan-pricing">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
