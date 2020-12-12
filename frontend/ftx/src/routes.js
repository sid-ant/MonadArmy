import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SignUp from "./Screens/SignUp";
import Home from "./Screens/Home";

import SignUp from "./Screens/SignUp";
import Home from "./Screens/Home";
import NewJob from "./Screens/NewJob";

const PrivateRoute = ({ isLogged, component: Comp, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isLogged ? <Comp {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const Routes = (props) => {
  return (
    <div>
      <Switch>
        {/* <Route path="/uncontrolled" exact component={Uncontrolled} />
                <Route path="/controlled" exact component={Controlled} /> */}
        <Route path="/user" exact component={Home} />
        <Route path="/login" exact component={SignUp} />
        <Route path="/new" exact component={NewJob} />

        <Route path="/" exact component={SignUp} />
        {/* <PrivateRoute isLogged={props.auth} path="/dashboard" exact component={Dashboard} /> */}
      </Switch>
    </div>
  );
};

export default Routes;
