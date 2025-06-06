import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/API 1">API 1</Link></li>
          <li><Link to="/API 2">API 2</Link></li>
          <li><Link to="/API 3">API 3</Link></li>
          <li><Link to="/API 4">API 4</Link></li>
          <li><Link to="/API 5">API 5</Link></li>
          <li><Link to="/contato">Sobre mim</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
