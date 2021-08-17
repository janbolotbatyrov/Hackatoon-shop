import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import classes from "./Login.module.css";
import firebase from "firebase";

const Login = () => {
  const { auth } = useContext(authContext);

  const login = async () => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    const providerEmail = new firebase.auth.EmailAuthProvider();
    const { user } = await auth.signInWithPopup(providerGoogle);
  };

  return (
    <div className={classes.login}>
      <div className="container">
        <div className={classes.loginInner}>
          <div className={classes.info}>
          ДЛЯ ПОКУПКИ И ДОБАВЛЕНИЯ ТОВАРОВ в корзину зарегистрируйтесь!
          </div>
          <form className={classes.loginForm}>
            <h1>Регистрация нового пользвателя</h1>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              required
            />
            <br />

            <label htmlFor="psw">
              Password <span>*</span>
              <br />
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />
            <br />

            <button
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
