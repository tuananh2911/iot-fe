import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import Register from './Component/Register';
import PlantList from './pages/PlantList';
import PlantDetail from './Component/PlantDetail';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="plant" element={<PlantList />} />
        <Route path="plant/:id" element={<PlantDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
