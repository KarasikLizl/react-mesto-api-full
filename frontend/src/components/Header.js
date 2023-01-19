import logo from "../images/logo.svg";
import "../index.css";
import { Link, Switch, Route } from "react-router-dom";

function Header({ userEmail, onLogout }) {
  function handleLogout() {
    onLogout();
  }
  return (
    <header className="header">
      <img className="header__logo" alt="Место. Россия" src={logo} />
      <div className="header__links">
        <Switch>
          <Route exact path="/">
            <p className="header__link header__link_type_email">{userEmail}</p>
            <Link
              to="/sign-in"
              className="header__link header__link_type_exit"
              onClick={handleLogout}
            >
              Выйти
            </Link>
          </Route>

          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>

          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
