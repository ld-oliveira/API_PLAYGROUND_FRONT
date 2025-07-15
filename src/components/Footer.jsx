import React from 'react';
import '../styles/components/Footer.scss';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© API Playground, by Léo Oliveira</p>
      <div className="footer__icons">
        <a href="https://github.com/ld-oliveira" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/leo-b-oliveira/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="ld-oliveira@uol.com.br">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
