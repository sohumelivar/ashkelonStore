import React from "react";
import { observer } from "mobx-react-lite";
import userStore from "../../store/userStore";
import { logout } from "../../api/userApi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = observer(() => {
  console.log(userStore.user);
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
            <Nav.Link onClick={(event)=>{
              event.preventDefault(0)
              logout()
            }} href="/">
              Выйти
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});
export default Header;
