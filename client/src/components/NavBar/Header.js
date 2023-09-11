import React from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import userStore from "../../store/userStore";
import { logout } from "../../api/userApi";

const Header = observer(() => {


  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalog">Каталог</NavLink>
        </li>
        <li>
          <NavLink to="/logo">Логотип</NavLink>
        </li>
        <li>
          <NavLink to="/favorite">Избранное</NavLink>
        </li>
        {userStore.user ? (
          <li>
            <NavLink to="/profile">Профиль </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/signin">Войти </NavLink>
          </li>
        )}
        {userStore.user && (
          <li>
            <NavLink
              onClick={logout}
              to="/">Выйти </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
});
export default Header;
