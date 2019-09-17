import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

export default function AtletaList() {
  const [atletas, setAtletas] = useState([]);

  useEffect(() => {
    async function loadAtletas() {
      const response = await api.get("/atletas");
      setAtletas(response.data.docs);
    }

    loadAtletas();
  }, []);

  return (
    <>
      <Link to="/atletas/create">Cadastrar Atleta</Link>
      <table>
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
          {atletas.map(atleta => (
            <tr key={atleta._id}>
              <td>{atleta.nome}</td>
              <td>{atleta.contato.email}</td>
              <td>{atleta.dataNascimento}</td>
              <td>{atleta.contato.whatsapp}</td>
              <td>{atleta.contato.telefone}</td>
              <td>{atleta.endereco.cidade}</td>
              <td>{atleta.peso}</td>
              <td>{atleta.altura}</td>
              <td>
                <Link to={`/atletas/edit/${atleta._id}`}>Editar</Link>

                <Link
                  to="#"
                  onClick={() => {
                    api.delete(`/atletas/${atleta._id}`);
                  }}
                >
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
