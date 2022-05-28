import React from "react";
import { DataDashboard } from "./DataDashboard";
import { useHistory } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import Header from "../LayoutPublic/Header/Header";
import "./dashboard.css";
import ButtonsNavigation from "../ButtonsNavigation/ButtonsNavigation";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div>
      <Header>
        <div className="dashboard_allContainer">
          <h1 className="dashboard-tituloPrincipal">
            <AiFillDashboard />
            Dashboard
          </h1>
          <ButtonsNavigation label1="Dashboard" icon1={<AiFillDashboard />} />
          <div className="dashboard_container">
            <h5>Menú de navegación</h5>
            <div className="dashboard_grid">
              {DataDashboard.map((e, i) => {
                return (
                  <div
                    className="dashboard_container-card"
                    key={i}
                    onClick={() => history.push(e.link)}
                  >
                    <h3 className="dashboard_title">{e.title}</h3>
                    <span className="dashboard_icon">{e.icon}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default Dashboard;
