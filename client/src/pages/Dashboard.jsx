import React, { useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import "./Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-text">
            <p className="stat-label">Total Creations</p>
            <h2 className="stat-value">{creations.length}</h2>
          </div>
          <div className="stat-icon blue">
            <Sparkles className="icon" />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-text">
            <p className="stat-label">Active Plan</p>
            <h2 className="stat-value">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="stat-icon pink">
            <Gem className="icon" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="recent-creations">
          <p className="recent-title">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
