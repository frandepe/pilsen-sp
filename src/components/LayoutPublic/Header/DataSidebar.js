import React from "react";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { DiTrello } from "react-icons/di";

export const DataSidebar = [
  {
    icon: <AiFillHome />,
    title: "Home",
    link: "/",
  },
  {
    icon: <DiTrello />,
    title: "Tablero",
    link: "/tablero",
  },
  {
    icon: <FiUserCheck />,
    title: "Login",
    link: "/login",
  },
  {
    icon: <FiUserPlus />,
    title: "Register",
    link: "/register",
  },
];
