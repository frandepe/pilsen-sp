import React from "react";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { DiTrello } from "react-icons/di";
import { MdAddTask } from "react-icons/md";

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

export const DataSubMenu = [
  {
    icon: <MdAddTask />,
    title: "Tipos de Articulos",
    link: "/tipo-de-articulos",
  },
  {
    icon: <MdAddTask />,
    title: "Tipos de Medidas",
    link: "/tipos-de-medidas",
  },
  {
    icon: <MdAddTask />,
    title: "Maquinas",
    link: "/",
  },
  {
    icon: <MdAddTask />,
    title: "Insumos/Productos",
    link: "/",
  },
  {
    icon: <MdAddTask />,
    title: "Recursos Productivos",
    link: "/",
  },
  {
    icon: <MdAddTask />,
    title: "Clientes y Proveedores",
    link: "/",
  },
  {
    icon: <MdAddTask />,
    title: "Depositos",
    link: "/",
  },
  {
    icon: <MdAddTask />,
    title: "Etapas Productivas",
    link: "/",
  },
];
