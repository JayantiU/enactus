import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/register";
import Login from "../auth/login";
import PrivateRoute from './PrivateRoute';
import Dashboard from '../layout/dashboard'
import Alert from '../layout/alert'
import Entries from '../layout/entries'

const Routes = () => {
  return (
    <section>
     <Alert />
      <Switch>
      <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/entries" component={Entries} />
      </Switch>
    </section>
  );
};

export default Routes;
