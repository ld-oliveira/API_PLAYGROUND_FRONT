import React, { useState } from "react";
import '../styles/components/Apitemp.scss';

const Apitemp = () => {
  const [lugar, setLugar] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui será chamada a API no futuro
    console.log("Buscando clima para:", lugar);
    // Exemplo de preenchimento fake (substituir com dados reais da API)
    setResultado({
      atual: "26°C",
      proximasHoras: "27°C, 25°C, 22°C",
      amanha: "23°C"
    });
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
          <p><strong>Temperatura atual:</strong> {resultado.atual}</p>
          <p><strong>Próximas horas:</strong> {resultado.proximasHoras}</p>
          <p><strong>Amanhã:</strong> {resultado.amanha}</p>
        </div>
      )}
    </div>
  );
};

export default Apitemp;
