import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import api from "../../services/api";

export default function AtletaShow({ history, match }) {
  const [atleta, setAtleta] = useState({});

  useEffect(() => {
    async function loadAtleta() {
      const { id } = match.params;
      const response = await api.get(`atletas/${id}`);

      setAtleta(response.data);
    }

    loadAtleta();
  }, [match.params]);

  // const {} = atleta.academia;
  console.log(atleta);

  return (
    // <div className="container">
    //   <dl>
    //     <dt>Nome</dt>
    //     <dd>{atleta}</dd>
    //   </dl>
    // </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Data início</th>
          <th>Whatsapp</th>
          <th>Telefone</th>
          <th>Cidade</th>
          <th>Peso</th>
          <th>Altura</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr key={atleta._id}>
          <td>{atleta.nome}</td>
          <td>{atleta.dataNascimento}</td>
          <td>{atleta.peso}</td>
          <td>{atleta.altura}</td>
        </tr>
      </tbody>
    </table>
  );
}
