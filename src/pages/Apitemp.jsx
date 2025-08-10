import React, { useState } from "react";
import '../styles/components/Apitemp.scss';

const Apitemp = () => {
  const [lugar, setLugar] = useState("");
  const [resultado, setResultado] = useState(null);
  const [proximas, setProximas] = useState([]);

  const modoTeste = false; // ➜ Ative para usar dados mockados e evitar requisições
  const local = false; // ➜ Altere para false para usar a API online

  const HOST = local
    ? "http://127.0.0.1:8000"
    : "https://api-playground-back.onrender.com";

  const URLS = {
    clima: `${HOST}/clima/clima`,
    previsaoHoras: `${HOST}/clima/previsao-horas`,
    previsaoDia: `${HOST}/clima/previsao-dia`,
  };

  const dadosFicticios = {
    atual: "26",
    amanha: "28",
    quarenta_oito: "24",
    setenta_duas: "17",
    prob_chuva: "30%",
    visib: "baixa",
    proximas: [
      { horario: "09:00", temperatura: "24°C" },
      { horario: "10:00", temperatura: "25°C" },
      { horario: "11:00", temperatura: "26°C" },
      { horario: "12:00", temperatura: "27°C" },
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modoTeste) {
      setResultado({
        atual: dadosFicticios.atual,
        amanha: dadosFicticios.amanha,
        quarenta_oito: dadosFicticios.quarenta_oito,
        setenta_duas: dadosFicticios.setenta_duas,
        prob_chuva: dadosFicticios.prob_chuva,
        visib: dadosFicticios.visib,
      });
      setProximas(dadosFicticios.proximas);
      return;
    }

    try {
      const responseCoords = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(lugar)}`);
      const dataCoords = await responseCoords.json();

      if (!dataCoords.length) {
        alert("Local não encontrado.");
        return;
      }

      const latitude = dataCoords[0].lat;
      const longitude = dataCoords[0].lon;
      const qs = `?lat=${latitude}&lon=${longitude}`;

      const [dadosClima, dadosProximas, dadosAmanha] = await Promise.all([
        fetch(`${URLS.clima}${qs}`).then(r => r.json()),
        fetch(`${URLS.previsaoHoras}${qs}`).then(r => r.json()),
        fetch(`${URLS.previsaoDia}${qs}`).then(r => r.json()),
      ]);

      const formatado = (Array.isArray(dadosProximas) ? dadosProximas : []).map((hora) => ({
        horario: new Date(hora.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperatura: `${hora.values?.temperature}°C`,
      }));

      const visib =
        dadosClima?.values?.visibility ??
        dadosClima?.data?.values?.visibility ?? "";

      const tempAparente =
        dadosClima?.values?.temperatureApparent ??
        dadosClima?.data?.values?.temperatureApparent ?? "";

      setProximas(formatado);

      setResultado({
        atual: dadosClima?.data?.values?.temperature ?? dadosClima?.values?.temperature ?? "",
        amanha: dadosAmanha?.values?.temperatureAvg
          ? `${dadosAmanha.values.temperatureAvg}°C`
          : "Indisponível",
        termic: tempAparente,
        visib: visib,
      });
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao buscar informações.");
    }
  };

  return (
    <section>
      <div className="topo">
        <div className="apitemp">
          <h1>Veja a temperatura de qualquer lugar aqui</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="lugar">Digite o nome do lugar que deseja ver:</label>
            <input
              type="text"
              id="lugar"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              placeholder="Ex: São Paulo, Brasil"
            />
            <button type="submit">Buscar</button>
          </form>
        </div>

        {resultado && (
          <div className="resultado-dia">
            <h2>Resultado para: {lugar}</h2>

            <div className="infos-horas">
              <div className="agora">
                <h4>Informações de agora</h4>
                <p>Temperatura atual: {resultado.atual}°C</p>
                <p>Mínima: 22°C</p>
                <p>Máxima: 28°C</p>
              </div>

              <div className="proximas-horas">
                {proximas.map((item, index) => (
                  <div key={index} className="hora">
                    <span>{item.horario}</span>
                    <span>{item.temperatura}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="inferior">
              <div className="vinte-quatro">
                <p><strong>Média prevista para Amanhã:</strong> {resultado.amanha}</p>
              </div>
              <div className="quarenta-oito">
                <p><strong>Média prevista para daqui 2 dias:</strong> {resultado.quarenta_oito}</p>
              </div>
              <div className="setenta-duas">
                <p><strong>Média prevista para daqui 3 dias:</strong> {resultado.setenta_duas}</p>
              </div>
              <div className="outinfo">
                <p className="texto-outinfo">Outras informações</p>
                <p className="texto-prob-chuva">Probabilidade de chuva: {resultado.prob_chuva}</p>
                <p className="texto-visibilidade">Visibilidade: {resultado.visib}</p>
                <p className="texto-sens-term">Sensação térmica: {resultado.termic}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Apitemp;
