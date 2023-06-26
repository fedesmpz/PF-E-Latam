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

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route exact path="/Home" element={<Home />} />
      <Route exact path= "/CreateProduct" element ={<CreateProduct/>}/>
      <Route exact path= "/DetailProduct" element ={<DetailProduct/>}/>
      <Route exact path= "/DashBoardAdmin" element ={<DashBoardAdmin/>}/>
      <Route exact path= "/Cart" element={<Cart/>}/>
      <Route exact path= "/EditProduct" element={<EditProduct/>}/>
      <Route exact path= "/About" element={<About/>}/>
      <Route exact path= "/purchase" element={<PaymentComponent/>}/>
    </Routes>
  );
} 

export default App;