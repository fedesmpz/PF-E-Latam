import React from "react";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar";
import StylesAdmin from "./DashboardAdmin.module.css"

import { getUsers } from "../../redux/slice/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.user.users);
  useEffect(() => {
    dispatch(getUsers());
  },[])
  console.log(allUsers);

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
