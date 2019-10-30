import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import AtletaList from "./pages/AtletaList";
import AtletaForm from "./pages/AtletaForm";
import AtletaShow from "./pages/AtletaShow";
import SignIn from "./pages/SignIn";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: `/`, state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={() => <h1>SignUp</h1>} />

      <PrivateRoute path="/atletas/create" component={AtletaForm} />
      <PrivateRoute path="/atletas/edit/:id" component={AtletaForm} />
      <PrivateRoute path="/atletas/show/:id" component={AtletaShow} />
      <PrivateRoute path="/atletas" component={AtletaList} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
