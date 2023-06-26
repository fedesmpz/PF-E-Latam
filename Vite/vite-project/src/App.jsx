import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'

function App() {
  return (
    <Routes>
      <Route exact path="/Home" element={<Home />} />
    </Routes>
  );
}

export default App;