import React from "react";
import Header from "../LayoutPublic/Header/Header";
import { MdPendingActions } from "react-icons/md";
import { DataProcesos } from "../LayoutPublic/Header/DataSidebar";
import { useHistory } from "react-router-dom";

const DashboardProcesos = () => {
  const history = useHistory();
  return (
    <div>
      <Header>
        <h1 className="dashboard-tituloPrincipal">
          <MdPendingActions />
          Procesos
        </h1>
        <div className="dashboard_container">
          {DataProcesos.map((e, i) => {
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

export default DashboardProcesos;
