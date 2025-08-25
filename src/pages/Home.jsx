import imagemFixa from '../assets/images/perfil.jpeg';
import '../styles/components/Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home-container">
      <div className="descricao">
        <h1 className="titulo-home">Resumo do meu projeto</h1>
        <p className="descricao_do_projeto">
          O propósito desse projeto é simples: aprender na prática. Estou usando React no front e Django no back, explorando algumas APIs completamente aleatórias apenas pra simular diferentes cenários com necessidades e metodos distintos. 
          A ideia é treinar o front (sem focar muito no visual por enquanto), o back-end, deploy, versionamento e todo tipo de bugs que forem aparecendo no caminho.
          Com o tempo vou melhorando e adicionando novas funcionalidades e deixando tudo mais redondinho. Aqui em cima tem links de várias APIs que estou usando, 
          tudo com o objetivo de evoluir minhas habilidades e me adaptar a diferentes contextos.
          Se tiver ideias, sugestões, achar algum bug ou só quer jogar conversa fora, nesse  <Link className='link-contato' to="/contato"> link aqui</Link> tem várias formas de falar comigo. Me chama lá! 😉
        </p>
      </div>

      <div className="foto-container">
        <img className="foto-perfil" src={imagemFixa} alt="Descrição da imagem" />
      </div>
    </section>
  );
};

export default Home;
