import React, { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import classes from "./Login.module.css";

const Login = () => {
  const { registerUser } = useContext(authContext);

  return (
    <div className={classes.login}>
      <div className="container">
        <div className={classes.loginInner}>
          <form className={classes.loginForm} onSubmit={(e) => registerUser(e)}>
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

            <button>Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
