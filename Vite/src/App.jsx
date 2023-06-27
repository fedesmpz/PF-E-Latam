import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
  
  function App() {
    return (
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Home" element={<Home />} />
      <Route path= "/CreateProduct" element ={<CreateProduct/>}/>
      <Route path= "/DetailProduct" element ={<DetailProduct/>}/>
      <Route path= "/DashBoardAdmin" element ={<DashBoardAdmin/>}/>
      <Route path= "/Cart" element={<Cart/>}/>
      <Route path= "/EditProduct" element={<EditProduct/>}/>
      <Route path= "/About" element={<About/>}/>
      <Route path= "/purchase" element={<PaymentComponent/>}/>
      <Route path="/DashBoardAdmin/Products" element={<Products/>} />
      <Route path="/DashboardAdmin/Statistics" element={<Statistics/>} />
      <Route path="/DashboardAdmin/Sales" element={<Sales/>} />
      <Route path="/DashboardAdmin/Users" element={<Users/>} />
    </Routes>
  );
}


export default App;