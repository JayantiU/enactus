import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/register";
import Login from "../auth/login";
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layout/dashboard'

const Routes = () => {
  return (
    <section className="container">
      <Switch>
      <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
