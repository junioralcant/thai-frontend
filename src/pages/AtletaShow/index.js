import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "jquery";

import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../../services/auth";
import api from "../../services/api";
import "./styles.css";

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

  function sair() {
    logout();
    history.push("/");
  }

  return (
    <div className="container">
      <div className="col-md-12">
        {/* <div className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/atletas">
              Explosão Thai <span className="sr-only">(current)</span>
            </Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item ">
                <Link className="nav-link" to="/atletas/create">
                  Cadastrar Atleta <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/atletas">
                  Listar Atletas <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
            <button className="btn btn btn-danger my-2 my-sm-0" onClick={sair}>
              Sair
            </button>
          </div>
        </div> */}
      </div>
      <div className="row">
        <div className="col-md-6">
          <dl>
            <h3>Dados do cliente</h3>
            <dt>Nome:</dt>
            <dd>{atleta.nome}</dd>
            <dt>CPF:</dt>
            <dd>{atleta.cpf}</dd>
            <dt>RG:</dt>
            <dd>{atleta.rg}</dd>
            <dt>Data Nascimento:</dt>
            <dd>{atleta.dataNascimento}</dd>
            <dt>Profissão</dt>
            <dd>{atleta.profissao}</dd>
            <dt>Peso</dt>
            <dd>{atleta.peso}</dd>
            <dt>Peso</dt>
            <dd>{atleta.altura}</dd>
          </dl>
        </div>
        <div className="col-md-6">
          <dl>
            <h3>Endereço</h3>
            <dt>Rua</dt>
            <dd>{atleta.endereco}</dd>
            <dt>Cidade</dt>
            <dd>{atleta.cidade}</dd>
            <dt>Bairro</dt>
            <dd>{atleta.bairro}</dd>
            <dt>Estado</dt>
            <dd>{atleta.estado}</dd>
          </dl>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <dl>
            <h3>Contatos</h3>
            <dt>Telefone</dt>
            <dd>{atleta.telefone}</dd>
            <dt>Whatsapp</dt>
            <dd>{atleta.whatsapp}</dd>
            <dt>Email</dt>
            <dd>{atleta.email}</dd>
          </dl>
        </div>

        <div className="col-md-6">
          <dl>
            <h3>Acadêmia</h3>
            <dt>Nome</dt>
            <dd>{atleta.nomeAcademia}</dd>
            <dt>Professor</dt>
            <dd>{atleta.professor}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
