import React, { Component, useContext, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { CART_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { authContext } from "../Context/AuthContext";
import Login from "./Login/Login";

const AppRouter = () => {
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);
  return user ? (
    <Switch>
      {privateRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to='/login' />
    </Switch>
  );
};

export default AppRouter;
