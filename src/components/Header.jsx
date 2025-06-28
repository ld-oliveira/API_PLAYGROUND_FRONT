import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.scss';
import Logo2 from '../assets/images/Logo (2).png';

const Header = () => {
  return (
    <header className='header'>
      <nav>
          <div className="nav-buttons">
          <Link to="/"><button>Home</button></Link>
          <Link to="/apitemp"><button>Temperatura</button></Link>
          <Link to="/API 2"><button>API 2</button></Link>
          <Link to="/API 3"><button>API 3</button></Link>
          <Link to="/API 4"><button>API 4</button></Link>
          <Link to="/API 5"><button>API 5</button></Link>
          <Link to="/contato"><button>Sobre mim</button></Link>
          </div>

          <div classname="logo-area"> 
          <img src={Logo2} alt="Logo" className="logo"/>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
