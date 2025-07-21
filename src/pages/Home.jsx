import React from 'react';
import imagemFixa from '../assets/images/perfil.jpeg';
import '../styles/components/Home.scss';

const Home = () => {
  return (
    <section className="home-container">
      <div className="descricao">
        <h1 className="titulo-home">Resumo do meu projeto</h1>
        <p className="descricao_do_projeto">
          Criar uma interface web moderna e modular em React que consuma e interaja com uma ou mais APIs.<br />
          Essa aplicação servirá como base para testes, aprendizado e expansão futura com foco em boas práticas de desenvolvimento web.<br/>
          Acima tem links para diversas apis que estou usando nesse website com o intuito de me adaptar a desenvolver o front e o back end, inicialmente o foco são as requisições de api's, não no visual.
        </p>
      </div>

      <div className="foto-container">
        <img className="foto-perfil" src={imagemFixa} alt="Descrição da imagem" />
      </div>
    </section>
  );
};

export default Home;
