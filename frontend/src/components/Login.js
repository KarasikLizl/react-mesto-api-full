import "../index.css";
import { useState, useCallback } from "react";

function Login({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    onSignIn(email, password);
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
        <h3 className="form__title">Вход</h3>
        <input
          type="email"
          name="login-email"
          className="form__input form__input_auth"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        ></input>
        <input
          type="password"
          name="login-password"
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;