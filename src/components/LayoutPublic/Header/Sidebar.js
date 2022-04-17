import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataSidebar } from "./DataSidebar";
import "./Sidebar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import Profile from "../../SideMenu/Profile";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className="sidebar_sidebar">
        <div className="sidebar_menu-bars" onClick={showSidebar}>
          <GiHamburgerMenu />
        </div>
        <div className="sidebar-profile">
          <Profile />
        </div>
      </div>
      <nav className={sidebar ? "sidebar_nav-menu active" : "sidebar_nav-menu"}>
        <ul onClick={showSidebar} className="sidebar_nav-menu--items">
          <li className="sidebar_sidebar-toggle">
            <div className="sidebar_menu-bars">
              <AiOutlineClose />
            </div>
          </li>
          <li className="sidebar_sidebar--title">Nombre empresa</li>
          {DataSidebar.map((e, i) => {
            return (
              <li key={i} className="sidebar_data--items">
                <Link to={e.link}>
                  <span>{e.icon}</span>
                  <span>{e.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
