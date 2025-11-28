import '../styles/components/cv.scss';
import { useState } from 'react';

// função de importar imagens
function importAll(r) {
    let images = {};
    r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const imagens = importAll(
    require.context('../assets/cv', false, /\.(png|jpe?g|svg)$/)
);

const getImg = (name) => {
    const img = imagens[name];
    return img?.default || img || '';
};

const Cv = () => {
    const [hotspotAtivo, setHotspotAtivo] = useState(null);

    const hotspots = [
        {
            id: 1,
            top: '77.4%',
            left: '22.8%',
            titulo: 'Projeto Academico',
            previewImg: getImg('delicias.png'),
            descricao: 'Infelizmente o Back-end foi perdido, mas o front segue ativo',
            link: "https://univesp-pi-3-app.vercel.app",
        },
        {
            id: 2,
            top: '90.3%',
            left: '22.8%',
            titulo: 'Bot de Discord',
            previewImg: getImg('discord.png'),
            descricao: 'Bot de auxilio para o uso de outros bots',
            link: "https://discord.com/oauth2/authorize?client_id=1436334435414052947&permissions=8&integration_type=0&scope=bot",
        },
        {
            id: 3,
            top: '59%',
            left: '22.8%',
            titulo: 'Meu projeto de estudo pessoal (esse mesmo😀)',
            previewImg: getImg('ld-oliveira.png'),
            descricao: 'Onde treino e crio coisas novas sempre que consigo, ',
            link: "ld-oliveira.com",
        },
        {
            id: 4,
            top: '20%',
            left: '70%',
            titulo: 'Meu linkedin',
            previewImg: getImg('linkedin.png'),
            descricao: 'Perfil profissional',
            link: "https://www.linkedin.com/in/dev-leo-oliveira/",
        },
        {
            id: 5,
            top: '52.3%',
            left: '2%',
            titulo: 'Certificado Django',
            previewImg: getImg('django.png'),
            descricao: 'Certificado de conclusão de formação em django-rest ',
            link: "https://cursos.alura.com.br/degree/certificate/4d5b89c6-6706-40a8-bc25-b4db5b7771d4?lang=pt_BR",
        },
        {
            id: 6,
            top: '54.7%',
            left: '2%',
            titulo: 'Certificado JavaScript',
            previewImg: getImg('javascript.png'),
            descricao: 'Certificado de conclusão de formação Javascript',
            link: "https://cursos.alura.com.br/degree/certificate/a3c6a8d3-a5c6-406e-a8eb-6cf56b072799?lang=pt_BR",
        },
        {
            id: 7,
            top: '57.1%',
            left: '2%',
            titulo: 'Certificado React',
            previewImg: getImg('react.png'),
            descricao: 'Certificado de conclusão de curso em React',
            link: "https://cursos.alura.com.br/certificate/bc209ed4-95bc-45ec-9379-70a6872c65f4?lang=pt_BR",
        },
        {
            id: 8,
            top: '59.4%',
            left: '2%',
            titulo: 'Certificado Git/GitHub',
            previewImg: getImg('github.png'),
            descricao: 'Certificado de conclusão de curso em Git/GitHub',
            link: "https://cursos.alura.com.br/certificate/4f0954ab-06ae-4646-ba8d-9ddd42524310?lang=pt_BR",
        },
        {
            id: 9,
            top: '61.6%',
            left: '2%',
            titulo: 'Certificado de fundamentos de SQL ',
            previewImg: getImg('SQL.jpg'),
            descricao: 'Infelizmente perfi o acesso a plataforma do curso, mas tenho a imagem do certificado',
            //link: " ",
        },
        {
            id: 10,
            top: '64%',
            left: '2%',
            titulo: 'Certificado de Excel Avançado',
            previewImg: getImg('Excel.jpg'),
            descricao: 'Infelizmente perfi o acesso a plataforma do curso, mas tenho a imagem do certificado',
            //link: " ",
        },
        {
            id: 11,
            top: '66.4%',
            left: '2%',
            titulo: 'Certificado de introdução ao figma',
            previewImg: getImg('figma.png'),
            descricao: 'Certificado de conclusão de curso em Figma',
            link: "https://cursos.alura.com.br/certificate/8f1af9f4-a04b-478b-bdf7-990a63d3642c?lang=pt_BR",
        },

    ];

    return (
        <div className="cv">

            <div className="imagem-cv">
                <img
                    src={getImg('Curriculo1.png')}
                    alt="Visão geral currículo"
                    className="cv_imagem"
                />

                {hotspots.map((h) => (
                    <div
                        key={h.id}
                        className="hotspot"
                        style={{ top: h.top, left: h.left }}
                        onMouseEnter={() => setHotspotAtivo(h)}
                        onMouseLeave={() => setHotspotAtivo(null)}
                        onClick={() => window.open(h.link, "_blank")}
                    >
                        { }
                        {hotspotAtivo?.id === h.id && (
                            <div className="tooltip">
                                <h4>{h.titulo}</h4>
                                <img
                                    src={h.previewImg}
                                    alt={h.titulo}
                                    className="tooltip-img"
                                />
                                <p>{h.descricao}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Cv;
