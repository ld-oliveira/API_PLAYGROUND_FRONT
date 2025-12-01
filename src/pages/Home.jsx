import imagemFixa from '../assets/images/perfil.jpeg';
import '../styles/components/Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home-container">
      <div className="descricao">
        <h1 className="titulo-home">Resumo do projeto</h1>
        <p className="descricao_do_projeto">
          O propósito desse projeto é simples: <strong>aprender na prática.</strong> Aqui, estou desenvolvendo o front-end em React e o back-end em Django, explorando diferentes APIs externas para simular cenários variados e exercitar métodos, integrações e boas práticas.<br></br>
          No front-end, o foco está na arquitetura, organização e legibilidade do código, deixando a parte visual em segundo plano por enquanto. Já no back-end, a prioridade é trabalhar autenticação, deploy, versionamento, além de lidar com os desafios reais que surgem no processo, bugs, erros de configuração e ajustes de ambiente.<br></br>
          O projeto está em constante evolução: novas funcionalidades, melhorias estruturais e refinamentos vão sendo implementados conforme avanço no aprendizado. Nos links acima você encontra algumas das features que estão em desenvolvimento.
          Caso tenha sugestões, encontre algum problema ou queira trocar uma ideia, basta acessar este <Link className='link-contato' to="/contato">link</Link> para falar comigo. Será um prazer conversar! 😉
        </p>
      </div>

      <div>
        <div className="foto-container">
          <img className="foto-perfil" src={imagemFixa} alt="Descrição da imagem" />
        </div>
        <div className='sub-imagem'>
          <p className='sub-imagem'>Leonardo Oliveira <br></br>Desenvolvedor de Software</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
