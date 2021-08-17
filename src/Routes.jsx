import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductContextProvider from "./Context/ProductContext";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import AuthContextProvider from "./Context/AuthContext";

const Reducer = () => {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </ProductContextProvider>
    </AuthContextProvider>
  );
};

export default Reducer;
