import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Artistas from "./pages/Artistas";
import Menu from "./components/Menu";

const Routes = () => {
  return (
    <>
      <Menu />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Inicio />
          </Route>

          <Route path="/artistas">
            <Artistas />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
