import React from "react";
import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "../../store/userStore";
import { logout } from "../../api/userApi";
import './Header.css';
import { action } from "mobx";
import { checkUser } from "../../api/userApi";
import Cookies from "js-cookie";

const Header = observer(() => {
  checkUser();

  const location = useLocation().pathname;

  const clearError = action(() => {
    setTimeout(() => {
      userStore.setError("");
    }, 1000);
  });

  if (location !== "/signup") clearError();
  if (location !== `/chat/${Cookies.get('chatWith')}`) Cookies.remove("chatWith");


  if (location !== "/signin") clearError();

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Ashkelon Store</Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/catalog" className="nav-link">Каталог</Link>
          <Link to="/logo" className="nav-link">Лого</Link>
          <Link to="/favorite" className="nav-link">Избранное</Link>
          {userStore.user ? (
            <>
              <Link to="/profile" className="nav-link">
                Профиль
                <span className="notification-badge">1</span>
                </Link>
              <a
                href="/"
                className="nav-link"
                onClick={(event) => {
                  event.preventDefault();
                  logout();
                }}
              >
                Выйти
              </a>
            </>
          ) : (
            <Link to="/signin" className="nav-link">Войти</Link>
          )}
        </nav>
      </div>
    </header>
  );
});
export default Header;
