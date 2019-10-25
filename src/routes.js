import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AtletaLis from "./pages/AtletaList";
import AtletaForm from "./pages/AtletaForm";
import AtletaShow from "./pages/AtletaShow";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/atletas" exact component={AtletaLis} />

        <Route path="/atletas/create" component={AtletaForm} />
        <Route path="/atletas/edit/:id" component={AtletaForm} />
        <Route path="/atletas/show/:id" component={AtletaShow} />
      </Switch>
    </BrowserRouter>
  );
}
