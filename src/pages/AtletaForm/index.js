import React, { useState, useEffect } from "react";
import { Form, Input, Scope } from "unform";
import api from "../../services/api";

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
    <Form initialData={data} onSubmit={handleSubmit}>
      <Input name="dataInscricao" label="Data Início" />
      <Input name="nome" label="Nome" />

      <Scope path="endereco">
        <Input name="rua" label="Rua" />
        <Input name="cidade" label="Cidade" />
        <Input name="bairro" label="Bairro" />
        <Input name="estado" label="Estado" />
      </Scope>

      <Input name="rg" label="RG" />
      <Input name="cpf" label="CPF" />
      <Input name="dataNascimento" label="Data Nascimento" />
      <Input name="peso" label="Peso" />
      <Input name="altura" label="Altura" />
      <Input name="profissao" label="Profissão" />

      <Scope path="academia">
        <Input name="nome" label="Nome" />
        <Input name="professor" label="Professor" />
      </Scope>

      <Scope path="contato">
        <Input name="email" label="E-mail" />
        <Input name="telefone" label="Telefone" />
        <Input name="whatsapp" label="Whatsapp" />
      </Scope>

      <button type="submit">Eviar</button>
    </Form>
  );
}
