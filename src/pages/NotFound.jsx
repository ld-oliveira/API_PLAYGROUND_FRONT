import React from 'react';
import { Link } from 'react-router-dom';
import imagemFixa from '../assets/images/foto-404.png';
import '../styles/components/NotFound.scss';

const NotFound = () => {
  return (
    <seaction>

      <div>
        <Link className="link-NotFound "to="/">Voltar para a página inicial</Link>
      </div>

      <div className="div-404">
        <img className="foto-404" src={imagemFixa} alt="Descrição da imagem" />
      
      </div>
      
    
    </seaction>
  );
};

export default NotFound;
