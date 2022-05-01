import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DataSidebar,
  DataConfiguracion,
  DataSeguridad,
  DataProcesos,
} from "./DataSidebar";
import "./Sidebar.css";
import { GiHamburgerMenu, GiSecurityGate } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdPendingActions } from "react-icons/md";
import Profile from "./Profile";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
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
              <ListItemText primary="Configuración" />
              {open ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List
                sx={{
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                {DataConfiguracion.map((e, i) => {
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
          <List
            sx={{
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
            className="sidebar_submenu"
          >
            <ListItemButton onClick={handleClick2}>
              <ListItemIcon>
                <GiSecurityGate style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Seguridad" />
              {open2 ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {DataSeguridad.map((e, i) => {
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

          <List
            sx={{
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
            className="sidebar_submenu"
          >
            <ListItemButton onClick={handleClick3}>
              <ListItemIcon>
                <MdPendingActions style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Procesos" />
              {open3 ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={open3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {DataProcesos.map((e, i) => {
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
