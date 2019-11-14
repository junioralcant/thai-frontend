import React, { useState, useEffect } from "react";
import { Form, Input } from "unform";
import { Link } from "react-router-dom";
import { parseFromTimeZone, formatToTimeZone } from "date-fns-timezone";

import api from "../../services/api";
import { logout } from "../../services/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./styles.css";

export default function AtletaForm({ history, match }) {
  const [data, setData] = useState({}); //update
  const [error, setError] = useState("");

  async function handleSubmit(data) {
    if (!match.params.id) {
      if (
        !data.nome ||
        !data.endereco ||
        !data.cidade ||
        !data.rg ||
        !data.cpf ||
        !data.telefone ||
        !data.dataNascimento ||
        !data.dataInscricao
      ) {
        setError("Preencha todos os campos obrigatórios (*)");
      } else {
        try {
          await api.postOrPut("/atletas", match.params.id, data);

          history.push("/atletas"); // redireciona o user
        } catch (error) {
          setError(error.response.data.error);
        }
      }
    } else {
      try {
        await api.postOrPut("/atletas", match.params.id, data);

        history.push("/atletas"); // redireciona o user
      } catch (error) {
        setError(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    // update
    async function loadData() {
      const { id } = match.params;
      const response = await api.get(`atletas/${id}`);

      setData(response.data);
    }

    if (match.params.id) {
      loadData();
    }
  }, [match.params, match.params.id]);

  useEffect(
    event => {
      if (match.params.id) {
        const dataNas = parseFromTimeZone(data.dataNascimento, {
          timeZone: "America/Sao_Paulo"
        });

        const dataNascimento = formatToTimeZone(dataNas, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        const dataInscr = parseFromTimeZone(data.dataInscricao, {
          timeZone: "America/Sao_Paulo"
        });

        const dataInscricao = formatToTimeZone(dataInscr, "YYYY-MM-DD", {
          timeZone: "Europe/Berlin"
        });

        setData({
          ...data,
          dataNascimento: dataNascimento,
          dataInscricao: dataInscricao
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.dataNascimento, data.dataInscricao, match.params.id]
  );

  function sair() {
    logout();
    history.push("/");
  }

  return (
    <div className="container-fluid">
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
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
              <Link className="nav-link active" to="/atletas/create">
                Cadastrar Atleta <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/atletas">
                Listar Atletas <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <button className="btn btn btn-danger my-2 my-sm-0" onClick={sair}>
            Sair
          </button>
        </div>
      </div>

      <h1>Cadastro de Atletas</h1>
      {error && <p className="error">{error}</p>}
      <Form className="form-group" initialData={data} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              type="date"
              className="form-control"
              name="dataInscricao"
              label="Data Início"
            />
            <Input className="form-control" name="nome" label="Nome*" />

            <Input className="form-control" name="endereco" label="Rua" />
            <Input className="form-control" name="cidade" label="Cidade*" />
            <Input className="form-control" name="bairro" label="Bairro" />
            <Input
              className="form-control"
              name="numero"
              label="Número da casa"
            />
            <Input className="form-control" name="estado" label="Estado*" />

            <Input className="form-control" name="rg" label="RG*" />
            <Input className="form-control" name="cpf" label="CPF*" />
            <Input
              type="date"
              className="form-control"
              name="dataNascimento"
              label="Data Nascimento*"
            />
          </div>

          <div className="col-md-6">
            <Input className="form-control" name="peso" label="Peso" />
            <Input className="form-control" name="altura" label="Altura" />
            <Input
              className="form-control"
              name="profissao"
              label="Profissão"
            />

            <Input
              className="form-control"
              name="nomeAcademia"
              label="Acadêmia"
            />
            <Input
              className="form-control"
              name="professor"
              label="Professor"
            />

            <Input className="form-control" name="email" label="E-mail" />
            <Input className="form-control" name="telefone" label="Telefone*" />
            <Input className="form-control" name="whatsapp" label="Whatsapp" />
          </div>
        </div>

        <button
          style={{ marginTop: 13, marginLeft: 5 }}
          type="submit"
          className="btn btn-primary"
        >
          Salvar
        </button>

        <Link
          style={{ marginTop: 13, marginLeft: 15 }}
          className="btn btn-danger"
          to="/atletas"
        >
          Cancelar
        </Link>
      </Form>
    </div>
  );
}
