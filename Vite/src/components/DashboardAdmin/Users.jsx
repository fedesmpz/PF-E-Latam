import React from "react";
import Sidebar from "../ComponentsAdmin/SideBar/SideBar";
import AllUsers from "../ComponentsAdmin/Users/AllUsers"
import TableUsers from "../ComponentsAdmin/Users/TableUsers"
import StylesAdmin from "./DashboardAdmin.module.css"
import { getUsers } from "../../redux/slice/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarAdmin from "../NavBarAdmin/NavbarAdmin"

const Users = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5)
  
  useEffect(() => {
    dispatch(getUsers());
  },[])

  const allUsers = useSelector((state) => state.user.users);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  return (
    <div className={StylesAdmin.containerAdmin} >
      <Sidebar />
      <div className={StylesAdmin.containerHomeAdmin} style={{ marginLeft: isOpen ? '120px' : (!isOpen && '60px') }}>
      <NavbarAdmin/>
        <div className={StylesAdmin.containerSuperior}>
        </div>
        <div className={StylesAdmin.containerProducts}>
          <TableUsers
            key="paginado"
            productsPerPage={usersPerPage}
            products={allUsers.length}
            paginado={paginado}
            currentProducts={paginatedUsers}
          />
          <AllUsers currentProducts={paginatedUsers} />
        </div>
      </div>
    </div>
  )
}

export default Users;
