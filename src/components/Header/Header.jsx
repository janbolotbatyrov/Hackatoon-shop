import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { LOGIN_ROUTE } from "../../utils/consts";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();
  const {auth} = useContext(authContext)
  const [user] = useAuthState(auth)
  return (
    <div className={classes.header}>
      <div className="container">
        <div className={classes.headerInner}>
          <div className={classes.headerMenu}>
            <span></span>
            <p>Меню</p>
          </div>
          <div className={classes.headerLogo} onClick={() => history.push("/")}>
            STORE
          </div>
          <div className={classes.headerMore}>
            <i className="bx bx-cart-alt" onClick={() => history.push('/cart')}></i>
            {user ? (
              <i class="bx bx-log-out-circle"onClick={() => auth.signOut()} ></i>
            ) : (
              <i
                className="bx bx-user"
                onClick={() => history.push(LOGIN_ROUTE)}
              ></i>
            )}

            <i className="bx bx-search"></i>
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
