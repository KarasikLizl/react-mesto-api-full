import "../index.css";
import { useState, useCallback } from "react";

import { Link } from "react-router-dom";

function Register({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    onSignUp(email, password);
    console.log(password);
    resetForm();
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="form__container">
      <form
        className="form form_auth"
        name="login-email"
        onSubmit={handleSubmit}
      >
        <h3 className="form__title">Регистрация</h3>
        <input
          type="email"
          name="register-email"
          className="form__input form__input_auth"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        ></input>
        <input
          type="password"
          name="register-password"
          className="form__input form__input_auth"
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password}
          required
        ></input>
        <button
          className="form__submit-button form__submit-button_auth"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <p className="form__subtitle">
          Уже зарегистрированы?&nbsp;
          <Link className="form__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
