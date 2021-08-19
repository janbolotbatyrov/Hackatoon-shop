import React, { Component, useContext, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { adminRoutes, privateRoutes, publicRoutes } from "../routes";
import { CART_ROUTE, LOGIN_ROUTE, UID } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { authContext } from "../Context/AuthContext";
import Error from "./error/Error";

const AdminRouter = () => {
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);

  return user ? (
    <Switch>
      {user.uid === UID ? (
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))
      ) : (
        <Route path="/add" component={Error} exact>
          <h1>Вы не админ!</h1>
        </Route>
      )}
    </Switch>
  ) : (
    <Switch>
      <Route path="/add" component={Error} exact>
        <h1>Войдите как админ!</h1>
      </Route>
    </Switch>
  );
};

export default AdminRouter;
