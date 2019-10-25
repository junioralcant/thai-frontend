import React, { useState, useEffect } from "react";
import { Form, Input, Scope } from "unform";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

// import { Container } from './styles';

export default function AtletaForm({ history, match }) {
  const [data, setData] = useState({}); //update

  async function handleSubmit(data) {
    await api.postOrPut("/atletas", match.params.id, data);

    history.push("/atletas"); // redireciona o user
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

  return (
    <div className="container">
      <h1>Cadastro de Atletas</h1>
      <Form className="form-group" initialData={data} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Input
              type="date"
              className="form-control"
              name="dataInscricao"
              label="Data Início"
            />
            <Input className="form-control" name="nome" label="Nome" />

            <Scope path="endereco">
              <Input className="form-control" name="rua" label="Rua" />
              <Input className="form-control" name="cidade" label="Cidade" />
              <Input className="form-control" name="bairro" label="Bairro" />
              <Input className="form-control" name="estado" label="Estado" />
            </Scope>

            <Input className="form-control" name="rg" label="RG" />
            <Input className="form-control" name="cpf" label="CPF" />
            <Input
              type="date"
              className="form-control"
              name="dataNascimento"
              label="Data Nascimento"
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

            <Scope path="academia">
              <Input className="form-control" name="nome" label="Nome" />
              <Input
                className="form-control"
                name="professor"
                label="Professor"
              />
            </Scope>

            <Scope path="contato">
              <Input className="form-control" name="email" label="E-mail" />
              <Input
                className="form-control"
                name="telefone"
                label="Telefone"
              />
              <Input
                className="form-control"
                name="whatsapp"
                label="Whatsapp"
              />
            </Scope>
          </div>
        </div>

        <button
          style={{ marginTop: 13 }}
          type="submit"
          className="btn btn-primary"
        >
          Eviar
        </button>
      </Form>
    </div>
  );
}
