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

      const [dadosClima, dadosProximas, dadosDias] = await Promise.all([
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

        amanha: dadosDias?.amanha ?? null,
        depois_de_amanha: dadosDias?.depois_de_amanha ?? null,
        terceiro_dia: dadosDias?.terceiro_dia ?? null,

        termic: tempAparente,
        visib: visib,
      });


    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao buscar informações.");
    }
  };

  return (
    <section className="apitemp-page">
      <div className="apitemp-shell">
        <div className="apitemp">
          <div className="info-wrapper">
            <h1>Veja a temperatura de qualquer lugar aqui</h1>
            <button className="info-bt" type="button" aria-label="Temp"></button>

            <div className="hotspot-panel">
              <h4 className="info-h4">Infos sobre a Temperatura</h4>
              <p>
                O objetivo desta funcionalidade não é o visual, mas sim a lógica de integração com uma API externa.
                Foram utilizados diferentes endpoints, com tratamento e organização dos dados em JSON conforme o retorno da API.
              </p>
            </div>
          </div>

          <form className="apitemp-form" onSubmit={handleSubmit}>
            <label htmlFor="lugar">Digite o nome do lugar que deseja ver:</label>

            <div className="apitemp-form-row">
              <input
                type="text"
                id="lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                placeholder="Ex: São Paulo, Brasil"
              />
              <button type="submit">Buscar</button>
            </div>
          </form>
        </div>

        {resultado && (
          <div className="resultado-dia">
            <div className="resultado-top">
              <h2>Resultado para: <span>{lugar}</span></h2>
              <p className="resultado-sub">
                Temperatura aparente: <strong>{resultado.termic}°C</strong> • Visibilidade: <strong>{resultado.visib} km</strong>
              </p>
            </div>

            <div className="infos-horas">
              <div className="agora">
                <h4 className="h4-agora">Agora</h4>
                <div className="temp-big">
                  <span className="temp-n">{resultado.atual}</span>
                  <span className="temp-u">°C</span>
                </div>
              </div>

              <div className="proximas-horas">
                <div className="proximas-head">
                  <h4 className="h4-horas">Próximas 6 horas</h4>
                  {/*<span className="hint-scroll">arraste / role</span>*/}
                </div>

                <div className="horas-strip">
                  {proximas.map((item, index) => (
                    <div key={index} className="hora">
                      <span className="hora-h">{item.horario}</span>
                      <span className="hora-t">{item.temperatura}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="inferior">
              <div className="dia-card">
                <p className="dia-title">Amanhã</p>
                <p className="dia-avg"><strong>Média:</strong> {resultado.amanha?.avg}°C</p>
                <p>Min: {resultado.amanha?.min}°C</p>
                <p>Max: {resultado.amanha?.max}°C</p>
                <p>Visib: {resultado.amanha?.visib} km</p>
              </div>

              <div className="dia-card">
                <p className="dia-title">Daqui 2 dias</p>
                <p className="dia-avg"><strong>Média:</strong> {resultado.depois_de_amanha?.avg}°C</p>
                <p>Min: {resultado.depois_de_amanha?.min}°C</p>
                <p>Max: {resultado.depois_de_amanha?.max}°C</p>
                <p>Visib: {resultado.depois_de_amanha?.visib} km</p>
              </div>

              <div className="dia-card">
                <p className="dia-title">Daqui 3 dias</p>
                <p className="dia-avg"><strong>Média:</strong> {resultado.terceiro_dia?.avg}°C</p>
                <p>Min: {resultado.terceiro_dia?.min}°C</p>
                <p>Max: {resultado.terceiro_dia?.max}°C</p>
                <p>Visib: {resultado.terceiro_dia?.visib} km</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );

};

export default Apitemp;
