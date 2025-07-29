import React from 'react';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Home from './pages/Home';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';
import Apitempo from './pages/Apitemp';
import Apipoke from './pages/Apipoke';
import Patchnotes from './pages/Patchnotes';

import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.scss';



function App() {
  return (
    <Router>
      <div className='app'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/Apitemp" element={<Apitempo />} />
            <Route path="/Apipoke" element={<Apipoke/>}/>
            <Route path="/Patchnotes" element={<Patchnotes/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
