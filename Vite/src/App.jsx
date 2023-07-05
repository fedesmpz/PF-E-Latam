import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserLocal } from "../src/redux/slice/userSlice"
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import CreateProduct from './components/CreateProduct/CreateProduct';
import DetailProduct from './components/DetailProduct/DetailProduct';
import DashBoardAdmin from './components/DashboardAdmin/DashboardAdmin';
import Cart from './components/Cart/Cart'
import About from './components/About/About'
import EditProduct from './components/EditProduct/EditProduct';
import PaymentComponent from './components/Purchase/Purchase'
import Products from './components/DashboardAdmin/Products';
import Statistics from './components/DashboardAdmin/Statistics';
import Sales from './components/Sales/Sales';
import Users from './components/DashboardAdmin/Users';
import NavBar from './components/NavBar/NavBar';
import SubFooter from './components/SubFooter/SubFooter';
import FooterLanding from './components/FooterLanding/FooterLanding';
import Profile from './components/Profile/Profile'
import SalesUser from './components/SalesUsuario/SalesUsuario';
import ReviewUser from './components/ReviewUsuario/ReviewUsuario';

function App() {
  const location = useLocation();
  const navigate = useNavigate()

  //SE GUARDA EL ESTADO
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  //SE DESPACHA EL ESTADO DEL LOCALSTORAGE Y SE VALIDA

  useEffect(()=>{
      dispatch(loginUserLocal())
      
  },[])
  
  const access = userData.access //si el tiene acceso
  const admin = userData.isAdmin //si admin es true o false
  const superAdmin = userData.isSuperAdmin //si superadmin es true o false
  const verified = userData.verified //si el mail esta verificado guarda true o false
  const emailUser = userData.email //email del usuario
  const cartId = userData.cartId //id del cart
  



  return (
    <div>
        {/* RUTA DE MUESTRA */}
        {
          location.pathname !== "/" && <NavBar />
        }
 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/About" element={<About />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={access ? <Profile/> : <Navigate to="/Home" />} />
        <Route path="/CreateProduct" element={access && admin ? <CreateProduct /> : <Navigate to="/Home" />} />
        <Route path="/DetailProduct" element={<DetailProduct />} />
        <Route path="/DashBoardAdmin" element={access && admin ? <DashBoardAdmin /> : <Navigate to="/Home" />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/mysales" element={access ? <SalesUser/> : <Navigate to="/Home" />} />
        <Route path="/myreviews" element={access ? <ReviewUser/> : <Navigate to="/Home" />} />
        <Route path="/EditProduct" element={access && admin ? <EditProduct /> : <Navigate to="/Home" />} />
        <Route path="/purchase" element={<PaymentComponent />} />
        <Route path="/DashBoardAdmin/Products" element={<Products />} />
        <Route path="/DashboardAdmin/Statistics" element={access && admin ? <Statistics /> : <Navigate to="/Home" />} />
        <Route path="/DashboardAdmin/Sales" element={access && admin ? <Sales /> : <Navigate to="/Home" />} />
        <Route path="/DashboardAdmin/Users" element={access && superAdmin ? <Users /> : <Navigate to="/Home" />} />
      </Routes>
      {
        location.pathname !== "/" && !location.pathname.includes("DashboardAdmin") &&
        <div>
          <SubFooter />
          <FooterLanding />
        </div>

      }
    </div>
  );
}


export default App;