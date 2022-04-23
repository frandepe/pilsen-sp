import React from "react";
import { DataDashboard } from "./DataDashboard";
import { useHistory } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import Header from "../LayoutPublic/Header/Header";
import "./dashboard.css";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div>
      <Header>
        <h1 className="dashboard-tituloPrincipal">
          <AiFillDashboard />
          Dashboard
        </h1>
        <div className="dashboard_container">
          {DataDashboard.map((e, i) => {
            return (
              <div className="dashboard_container-card" key={i}>
                <h3 className="dashboard_title">{e.title}</h3>
                <span className="dashboard_icon">{e.icon}</span>
                <button
                  onClick={() => history.push(e.link)}
                  className="dashboard_btn"
                >
                  Ir
                </button>
              </div>
            );
          })}
        </div>
      </Header>
    </div>
  );
};

export default Dashboard;
