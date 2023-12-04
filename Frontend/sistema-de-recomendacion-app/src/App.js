// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import ParticlesBackground from './components/config/ParticlesBackground';

const App = () => {
  return (
    <Router>
      <ParticlesBackground/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* <Route path="/RecommenderSystem" element={<Dashboard />} /> */}
        {/* <Route path="/ruta2" element={<Componente2 />} /> */}
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
