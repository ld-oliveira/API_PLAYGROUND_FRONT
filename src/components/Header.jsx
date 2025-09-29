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
        <Link to="/LoginPage" onClick={() => setMenuAberto(false)}><button>Login</button></Link>
        <Link to="/CadPage" onClick={() => setMenuAberto(false)}><button>Cadastro</button></Link>
        <Link to="/apitemp" onClick={() => setMenuAberto(false)}><button>Temperatura</button></Link>
        <Link to="/ApiPoke" onClick={() => setMenuAberto(false)}><button>Pokedex</button></Link>
        <Link to="/Patchnotes" onClick={() => setMenuAberto(false)}><button>Patch Notes</button></Link>
        <Link to="/contato" onClick={() => setMenuAberto(false)}><button>Sobre mim</button></Link>
        <Link to="/petList" onClick={() => setMenuAberto(false)}><button>Petlist</button></Link>
        <Link to="/addPet" onClick={() => setMenuAberto(false)}><button>addPet</button></Link>
        
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
