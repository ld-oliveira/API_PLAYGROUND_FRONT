import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.scss';
import Logo2 from '../assets/images/Logo (2).png';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className='header'>
      <nav>
        <div className={`nav-buttons ${menuAberto ? 'ativo' : ''}`}>
        <Link to="/" onClick={() => setMenuAberto(false)}><button>Home</button></Link>
        <Link to="/apitemp" onClick={() => setMenuAberto(false)}><button>Temperatura</button></Link>
        <Link to="/ApiPoke" onClick={() => setMenuAberto(false)}><button>Pokedex</button></Link>
        <Link to="/API 3" onClick={() => setMenuAberto(false)}><button>API 3</button></Link>
        <Link to="/API 4" onClick={() => setMenuAberto(false)}><button>API 4</button></Link>
        <Link to="/Patchnotes" onClick={() => setMenuAberto(false)}><button>Patch Notes</button></Link>
        <Link to="/contato" onClick={() => setMenuAberto(false)}><button>Sobre mim</button></Link>
        </div>


        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <div className="logo-area"> 
          <img src={Logo2} alt="Logo" className="logo" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
