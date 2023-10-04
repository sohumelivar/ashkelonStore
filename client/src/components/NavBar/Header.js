import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "../../store/userStore";
import { logout } from "../../api/userApi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { testIpApi } from "../../api/userApi";

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


// useEffect(() => {
//   testIpApi();
// }, []);

const location = useLocation().pathname;

  if (location !== "/signup") clearError();
  if (location !== `/chat/${Cookies.get('chatWith')}`) Cookies.remove("chatWith");


  if (location !== "/signin") clearError();

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ashkelon Store
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Главная
          </Nav.Link>
          <Nav.Link as={Link} to="/catalog">
            Каталог
          </Nav.Link>
          <Nav.Link as={Link} to="/logo">
            Логотип
          </Nav.Link>
          <Nav.Link as={Link} to="/favorite">
            Избранное
          </Nav.Link>
          {userStore.user ? (
            <Nav.Link as={Link} to="/profile">
              Профиль{" "}
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/signin">
              Войти{" "}
            </Nav.Link>
          )}
          {userStore.user && (
            <Nav.Link
              onClick={(event) => {
                event.preventDefault();
                logout();
              }}
              href="/"
            >
              Выйти
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});
export default Header;
