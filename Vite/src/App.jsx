import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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


function App() {
  const location = useLocation();

  //SE GUARDA EL ESTADO
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  //SE DESPACHA EL ESTADO DEL LOCALSTORAGE Y SE VALIDA
  useEffect(() => {
    dispatch(loginUserLocal())

  }, [])

  const access = userData.access
  const admin = userData.isAdmin
  const superAdmin = userData.isSuperAdmin
  const verified = userData.verified


  return (
    <div>
      {
        location.pathname !== "/" && !location.pathname.includes("DashboardAdmin") && <NavBar />
      }
      <Routes>
        {/* RUTA DE MUESTRA */}
        <Route path="/About" element={access && admin ? <About /> : <Navigate to="/Home" />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreateProduct" element={<CreateProduct />} />
        <Route path="/DetailProduct" element={<DetailProduct />} />
        <Route path="/DashBoardAdmin" element={<DashBoardAdmin />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/EditProduct" element={<EditProduct />} />
        <Route path="/purchase" element={<PaymentComponent />} />
        <Route path="/DashBoardAdmin/Products" element={<Products />} />
        <Route path="/DashboardAdmin/Statistics" element={<Statistics />} />
        <Route path="/DashboardAdmin/Sales" element={<Sales />} />
        <Route path="/DashboardAdmin/Users" element={<Users />} />
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