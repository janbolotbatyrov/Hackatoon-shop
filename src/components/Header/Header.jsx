import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  const history = useHistory();
  return (
    <div className={classes.header}>
      <div className="container">
        <div className={classes.headerInner}>
          <div className={classes.headerMenu}>
            <span></span>
            <p>Меню</p>
          </div>
          <div className={classes.headerLogo} onClick={()=>history.push('/')}>STORE</div>
          <div className={classes.headerMore}>
            <i className="bx bx-cart-alt"></i>
            <i className="bx bx-user" onClick={() => history.push('/login')}></i>
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
