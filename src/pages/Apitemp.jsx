import React, { useState } from "react";
import '../styles/components/Apitemp.scss';

const Apitemp = () => {
  const [lugar, setLugar] = useState("");
  const [resultado, setResultado] = useState(null);
  const [proximas, setProximas] = useState([]);

  const local = true; // ➜ Altere para false para usar a API online
  const baseURL = local
    ? "http://127.0.0.1:8000/clima"
    : "https://api-playground-back.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Buscar coordenadas via Nominatim
      const responseCoords = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(lugar)}`);
      const dataCoords = await responseCoords.json();

      if (!dataCoords.length) {
        alert("Local não encontrado.");
        return;
      }

      const latitude = dataCoords[0].lat;
      const longitude = dataCoords[0].lon;

      const response = await fetch(`${baseURL}/clima/?lat=${latitude}&lon=${longitude}`);
      const dados = await response.json();

      const responseProximas = await fetch(`${baseURL}/previsao-horas/?lat=${latitude}&lon=${longitude}`);
      const dadosProximas = await responseProximas.json();

      console.log("dadosProximas recebidos", dadosProximas);

      const responseAmanha = await fetch(`${baseURL}/previsao-dia/?lat=${latitude}&lon=${longitude}`);
      const dadosAmanha = await responseAmanha.json();

      const formatado = dadosProximas.map((hora) => ({
        horario: new Date(hora.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperatura: `${hora.values.temperature}°C`,
      }));

      setProximas(formatado);

      setResultado({
        atual: dados.data?.values?.temperature ?? "",
        amanha: dadosAmanha?.values?.temperatureAvg
          ? `${dadosAmanha.values.temperatureAvg}°C`
          : "Indisponível",
      });
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao buscar informações.");
    }
  };

  return (
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

      {resultado && (
        <div className="resultado">
          <h2>Resultado para: {lugar}</h2>
          <p>
            <strong>Temperatura atual:</strong> {resultado.atual}°C
          </p>
          <div>
            <strong>Próximas horas:</strong>
            <ul>
              {proximas.map((item, index) => (
                <li key={index}>{item.horario} - {item.temperatura}</li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Média prevista para Amanhã:</strong> {resultado.amanha}
          </p>
        </div>
      )}
    </div>
  );
};

export default Apitemp;
