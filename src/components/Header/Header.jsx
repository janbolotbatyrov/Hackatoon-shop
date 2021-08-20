import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { productContext } from "../../Context/ProductContext";
import { LOGIN_ROUTE, UID } from "../../utils/consts";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();
  const { auth } = useContext(authContext);
  const [user] = useAuthState(auth);
  const { getProducts } = useContext(productContext);
  return (
    <div className={classes.header}>
      <div className="container">
        <div className={classes.headerInner}>
          <div className={classes.headerMenu}>
            <i class="bx bx-menu"></i>
            <p>Меню</p>
          </div>
          <div
            className={classes.headerLogo}
            onClick={() => {
              history.push("/");
              getProducts(history);
            }}
          >
            STORE
          </div>
          <div className={classes.headerMore}>
            {user ? (
              user.uid === UID ? (
                <i
                  class="bx bx-message-alt-add"
                  onClick={() => history.push("/add")}
                ></i>
              ) : null
            ) : null}
            <i
              className="bx bx-cart-alt"
              onClick={() => history.push("/cart")}
            ></i>
            <i class='bx bx-heart' onClick={()=>history.push('/favorites')}></i>

            {user ? (
              <i
                class="bx bx-log-out-circle"
                onClick={() => auth.signOut()}
              ></i>
            ) : (
              <i
                className="bx bx-user"
                onClick={() => history.push(LOGIN_ROUTE)}
              ></i>
            )}
          </div>
          <div className={classes.headerTel}>
            <i className="bx bx-phone"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
