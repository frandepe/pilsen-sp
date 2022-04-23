import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataSidebar, DataSubMenu } from "./DataSidebar";
import "./Sidebar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Profile from "./Profile";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <div className="sidebar_sidebar">
        <div className="sidebar_menu-bars">
          <GiHamburgerMenu onClick={showSidebar} />
        </div>
        <div className="sidebar-profile">
          <Profile />
        </div>
      </div>
      <nav className={sidebar ? "sidebar_nav-menu active" : "sidebar_nav-menu"}>
        <ul className="sidebar_nav-menu--items">
          <li className="sidebar_sidebar-toggle">
            <div className="sidebar_menu-bars">
              <AiOutlineClose onClick={showSidebar} />
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
          <List
            sx={{ width: "100%", maxWidth: 360 }}
            component="nav"
            className="sidebar_submenu"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <FaTasks style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="AMB/Sub menu" />
              {open ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {DataSubMenu.map((e, i) => {
                  return (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      key={i}
                      className="sidebar_data--items"
                    >
                      <Link to={e.link}>
                        <span>{e.icon}</span>
                        <span>{e.title}</span>
                      </Link>
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
