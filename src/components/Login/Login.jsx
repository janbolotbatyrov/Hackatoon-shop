import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Context/AuthContext";
import classes from "./Login.module.css";
import firebase from "firebase";
import { productContext } from "../../Context/ProductContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { auth } = useContext(authContext);
  const history = useHistory()

  const [nameInp, setNameInp] = useState("");
  const [passInp, setPassInp] = useState("");
  useEffect(() => {}, []);

  const login = async () => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    const providerEmail = new firebase.auth.EmailAuthProvider();
    const { user } = await auth.signInWithPopup(providerGoogle);
    history.push('/')
  };

  return (
    <div className={classes.login}>
      <div className="container">
        <div className={classes.loginInner}>
          <div className={classes.info}>
            ДЛЯ ПОКУПКИ И ДОБАВЛЕНИЯ ТОВАРОВ в корзину зарегистрируйтесь!
          </div>
          <form className={classes.loginForm}>
            <h2>Регистрация нового пользавателья через google аккаунт</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Зарегистрироваться
            </button>
          </form>
          <form className={classes.loginForm}>
            <h2>Админ панель (только для админа)</h2>
            <label htmlFor="name">
              Name <span>*</span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={nameInp}
              onChange={(e) => setNameInp(e.target.value)}
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
              value={passInp}
              onChange={(e) => setPassInp(e.target.value)}
              required
            />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
