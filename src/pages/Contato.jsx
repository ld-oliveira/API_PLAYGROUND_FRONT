import '../styles/components/Contato.scss';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, } from 'react-icons/fa';
import { PiReadCvLogo, PiLinkSimpleBold } from 'react-icons/pi';

const Contato = () => {
  return (
    <section>

      <div className="div-title">
        <h2 className="title-contato">Sociais e contato</h2>
      </div>
      <div>
        <p className='p-sobremim'>Oi😀, Meu nome é Leonardo ou só Léo mesmo, sou desenvolvedor de software, formado em Tecnologia da Informação pela UNIVESP. Atualmente trabalho com tecnologias como React, NestJS, Django, MongoDB e PostgreSQL, mas defitivamente não sou apegado a ferramentas especificas, para mim o importante é a que irá resolver o nosso problema, sempre busco criar soluções claras e objetivas para solucionar as mesmas.<br></br>
          Antes de entrar de vez na área de tecnologia, construí uma trajetória marcada por adaptação e aprendizado constante. Trabalhei em diferentes áreas, o que me ajudou a desenvolver organização, foco em resultados e a capacidade de resolver problemas do jeito mais simples e eficiente possível, algo que hoje levo para todos os meus projetos como desenvolvedor.<br></br>
          A decisão de migrar para TI veio da minha paixão antiga por tecnologia e inovação, enfim consegui entrar de cabeça no universo da programação, consolidando bases fortes em desenvolvimento de software e sistemas web. Desde então, passei a criar projetos próprios, estudar diariamente e transformar essa paixão em profissão.<br></br>
          Fique a vontade para acessar os links a baixo e me conhecer um pouco melhor, estou sempre apto a conversar também, para absolutamente qualquer duvida me mande uma mensagem ☺️
        </p>
      </div>
      <div className="div-icon">
        <a className="Contato-icon" href="https://lnk.bio/Leo.oliveira" target="_blank" rel="noopener noreferrer">
          <PiLinkSimpleBold />
          <p className='sub-image'>All Links</p>
        </a>
        <a className="Contato-icon" href="https://github.com/ld-oliveira" target="_blank" rel="noopener noreferrer">
          <FaGithub />
          <p className='sub-image'>GitHub</p>
        </a>
        <a className="Contato-icon" href="https://www.linkedin.com/in/leo-b-oliveira/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
          <p className='sub-image'>Linkedin</p>
        </a>
        <a className="Contato-icon" href="mailto:ld-oliveira@uol.com.br">
          <FaEnvelope />
          <p className='sub-image'>Email</p>
        </a>

        <a className="Contato-icon" href="https://wa.me/55011967334699" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
          <p className='sub-image'>Whatsapp</p>
        </a>
        <a className="Contato-icon" href="ld-oliveira/cv" rel="noopener noreferrer">
          <PiReadCvLogo />
          <p className='sub-image'>Cv interativo</p>
        </a>

      </div>
    </section>
  );
};

export default Contato;
