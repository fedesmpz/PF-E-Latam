import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../redux/slice/userSlice";

const UserDetails = () => {
  const { id } = useParams(); // Obtener el ID del usuario de los parámetros de ruta
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userById);

  useEffect(() => {
    dispatch(getUserById(id)); // Consultar el usuario por su ID al cargar el componente
  }, [dispatch, id]);

  return (
    <div>
      <h1>User Details</h1>
      <img src={user.profile_picture} alt="Profile Picture" /> 
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      {/* error al mostrar la imagen solucionar */}
      <p>Email: {user.email}</p>
      <p>Country: {user.country}</p>
      <p>City: {user.city}</p>
      <p>Address: {user.address}</p>
      <p>Admin: {user.admin ? "Yes" : "No"}</p>
      <p>Postal Code: {user.postal_code}</p>
      <p>Created At: {user.createdAt}</p>
    </div>
  );
};

export default UserDetails;
