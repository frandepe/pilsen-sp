import React from "react";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { DiTrello } from "react-icons/di";
import { VscServerProcess } from "react-icons/vsc";
import { MdAddTask, MdSecurity } from "react-icons/md";

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

export const DataConfiguracion = [
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
    link: "/maquinas",
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
    link: "/depositos",
  },
  {
    icon: <MdAddTask />,
    title: "Etapas Productivas",
    link: "/",
  },
];

export const DataSeguridad = [
  {
    icon: <MdSecurity />,
    title: "Roles",
    link: "/roles",
  },
  {
    icon: <MdSecurity />,
    title: "Usuarios",
    link: "/usuarios",
  },
];

export const DataProcesos = [
  {
    icon: <VscServerProcess />,
    title: "Consulta de órdenes",
    link: "/",
  },
];
