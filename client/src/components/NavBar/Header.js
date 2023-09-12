import React from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import userStore from "../../store/userStore";
import { logout } from "../../api/userApi";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = observer(() => {


  return (

    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Ashkelon Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Главная</Nav.Link>
            <Nav.Link href="/catalog">Каталог</Nav.Link>
            <Nav.Link href="/logo">Логотип</Nav.Link>

            <Nav.Link href="/favorite">Избранное</Nav.Link>
            {userStore.user ? (
            <Nav.Link href="/profile">Профиль </Nav.Link>
        ) : (
            <Nav.Link href="/signin">Войти </Nav.Link>
        )}
        {userStore.user && (
            <Nav.Link
              onClick={logout}
              href="/">Выйти </Nav.Link>
        )}
          </Nav>
        </Container>
      </Navbar>
    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to="/">
    //         Главная
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/catalog">Каталог</NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/logo">Логотип</NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/favorite">Избранное</NavLink>
    //     </li>
    //     {userStore.user ? (
    //       <li>
    //         <NavLink to="/profile">Профиль </NavLink>
    //       </li>
    //     ) : (
    //       <li>
    //         <NavLink to="/signin">Войти </NavLink>
    //       </li>
    //     )}
    //     {userStore.user && (
    //       <li>
    //         <NavLink
    //           onClick={logout}
    //           to="/">Выйти </NavLink>
    //       </li>
    //     )}
    //   </ul>
    // </nav>
  );
});
export default Header;
