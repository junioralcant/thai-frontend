import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { utcToZonedTime, format } from "date-fns-tz";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "jquery";

import "bootstrap/dist/css/bootstrap.min.css";

import { logout } from "../../services/auth";
import api from "../../services/api";
import "./styles.css";

export default function AtletaList({ history, match }) {
  const [atletas, setAtletas] = useState([]);
  const [atletaExclusao, setAtletaExclusao] = useState({ nome: null });

  const [atletasInfo, setAtletasInfo] = useState({});
  const [pagina, setPagina] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadAtletas(page = pagina) {
      const response = await api.get(`/atletas?page=${page}`);
      const { docs, ...atletasResto } = response.data;
      setAtletas(docs);
      setAtletasInfo(atletasResto);
    }

    loadAtletas();
  }, [pagina]);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalExcluir = cliente => {
    setAtletaExclusao(cliente);
    handleClickOpen();
  };

  return (
    <div className="container-fluid" id="print">
      <div className="row">
        <div className="col-md-12">
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
                  <Link className="nav-link" to="/atletas/create">
                    Cadastrar Atleta <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/atletas">
                    Listar Atletas <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </ul>
              <button
                className="btn btn btn-danger my-2 my-sm-0"
                onClick={sair}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Exclusão de clientes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja excluir o(a) cliente {atletaExclusao.nome} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => removeAtletas(atletaExclusao)} color="primary">
            Sim
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4">
            <br />
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
        <div className="row col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Usuário</th>
                <th>Data Nascimento</th>
                <th>Whatsapp</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>Peso</th>
                <th>Altura</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {atletas.map(atleta => {
                const data = new Date(atleta.dataNascimento);
                const zonaData = utcToZonedTime(data, "Europe/Berlin");
                const dataNascimentoFormatada = format(zonaData, "dd/MM/yyyy");

                return (
                  <tr key={atleta._id}>
                    <td>{atleta.nome}</td>
                    <td>{atleta.email}</td>
                    <td>{atleta.usuario}</td>
                    <td>{dataNascimentoFormatada}</td>
                    <td>{atleta.whatsapp}</td>
                    <td>{atleta.telefone}</td>
                    <td>{atleta.cidade}</td>
                    <td>{atleta.peso}</td>
                    <td>{atleta.altura}</td>
                    <td>
                      <Link
                        className="linkTable"
                        to={`/atletas/edit/${atleta._id}`}
                      >
                        Editar
                      </Link>
                      <Link
                        className="linkTable"
                        to={`/atletas/show/${atleta._id}`}
                      >
                        Detalhes
                      </Link>

                      <Link
                        style={{ marginTop: 10 }}
                        to="#"
                        className="linkTable"
                        onClick={() => modalExcluir(atleta)}
                      >
                        Excluir
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
