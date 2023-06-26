import React from "react";
import { useState } from "react";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar";
import StylesAdmin from "./DashboardAdmin.module.css"

const Users = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={StylesAdmin.containerAdmin}>
      <Sidebar />
      <div
        className={StylesAdmin.containerHomeAdmin}
        style={{ marginLeft: isOpen ? "120px" : !isOpen && "60px" }}
      >
        <div className={StylesAdmin.containerSuperior}></div>
      </div>
    </div>
  );
};

export default Users;
