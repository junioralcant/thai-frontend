import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { logout } from "../../services/auth";
import api from "../../services/api";
import "./styles.css";

export default function AtletaList({ history, match }) {
  const [atletas, setAtletas] = useState([]);
  const [atletasInfo, setAtletasInfo] = useState({});
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    async function loadAtletas(page = pagina) {
      const response = await api.get(`/atletas?page=${page}`);
      const { docs, ...atletasResto } = response.data;
      setAtletas(docs);
      setAtletasInfo(atletasResto);
    }

    loadAtletas();
  }, [pagina]);

  console.log(atletas);

  function removeAtletas(atleta) {
    api.delete(`/atletas/${atleta._id}`);
    setTimeout(() => {
      history.go(0); // atualiza a página
    }, 1000);
  }

  async function handleChange(e) {
    if (e.target.value !== "") {
      const response = await api.get(`/atletas?nome=${e.target.value}`);
      setAtletas(response.data.docs);
    } else {
      const response = await api.get("/atletas");
      setAtletas(response.data.docs);
    }
  }

  function anteriorPagina() {
    if (pagina === 1) return; // if for a ultima página

    const numeroDePaginas = pagina - 1;

    setPagina(numeroDePaginas);
  }

  function proximaPagina() {
    if (pagina === atletasInfo.pages) return; // if for a ultima página

    const numeroDePaginas = pagina + 1;

    setPagina(numeroDePaginas);
  }

  function sair() {
    logout();
    history.push("/");
  }

  console.log(atletas);

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row" style={{ marginTop: 20, marginLeft: 10 }}>
          <button className="btn btn-danger" onClick={sair}>
            Sair
          </button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <br />
            <Link to="/atletas/create">Cadastrar Atleta</Link>
            <br />
          </div>
          <div className="col-md-6">
            <div className="row">
              <input
                className="form-control"
                type="text"
                name="filtro"
                id="filtro-input"
                placeholder="Informe o Nome"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Usuário</th>
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
                <td>{atleta.usuario}</td>
                <td>{atleta.dataNascimento}</td>
                <td>{atleta.contato.whatsapp}</td>
                <td>{atleta.contato.telefone}</td>
                <td>{atleta.endereco.cidade}</td>
                <td>{atleta.peso}</td>
                <td>{atleta.altura}</td>
                <td>
                  <Link to={`/atletas/edit/${atleta._id}`}>Editar</Link>
                  <Link to={`/atletas/show/${atleta._id}`}>Detalhes</Link>

                  <Link to="#" onClick={() => removeAtletas(atleta)}>
                    Excluir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="col-md-12">
          <div className="btnProAnt">
            <button onClick={anteriorPagina} className="btn btn-success">
              Anterior
            </button>
            <button>{pagina}</button>
            <button onClick={proximaPagina} className="btn btn-success">
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
