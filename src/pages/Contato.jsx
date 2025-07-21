import React from "react";
import '../styles/components/Contato.scss';
import { FaGithub, FaLinkedin, FaEnvelope,FaInstagram,FaWhatsapp, } from 'react-icons/fa';

const Contato = () => {
    return (
        <section>
        <div className="div-title">
            <h2 className="title-contato">Sociais e contato</h2>
        </div>
        <div className="div-icon">
                <a className="Contato-icon" href="https://github.com/ld-oliveira" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a className="Contato-icon"href="https://www.linkedin.com/in/leo-b-oliveira/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a className="Contato-icon" href="mailto:ld-oliveira@uol.com.br">
                  <FaEnvelope />
                </a>
                <a className="Contato-icon"href="https://www.instagram.com/vsf__leo/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a className="Contato-icon"href="https://wa.me/55011967334699" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
              </div>
        </section>
    );
};

export default Contato;
