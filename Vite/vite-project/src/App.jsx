import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Landing from './components/Landing/Landing'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route exact path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;