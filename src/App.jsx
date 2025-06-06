import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Contato from './pages/Contato';

function App() {
  return (
    <Router>
      <div>
        {/* Menu de navegação */}
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </nav>

        {/* Área onde as rotas são exibidas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
