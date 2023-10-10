import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "../../store/userStore";
import { signIn } from "../../api/userApi";
import "./Login.css";

const LogIn = observer(() => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleButton = async () => {
    try {
      const result = await signIn(name, password);
      setName("");
      setPassword("");
      if (result === 200) {
        userStore.setError('');
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onKeyDown = e =>{
    if (e.key === 'Enter') handleButton();
  }

  return (

    <div className="authentication-container">
        <div className="authentication-form">
          <h3>Войдите</h3>
          <div className="input-container">
            <input
              type="text"
              placeholder="Введите имя"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </div>
          <button type="button" className="login-button" onClick={handleButton}>
            Войти
          </button>
          {userStore.error && <div className="error-message">{userStore.error}</div>}
          <div className="signup-link">
            У вас нет учетной записи?{' '}
            <Link to="/signup">Зарегистрироваться!</Link>
          </div>
        </div>
      </div>

  );
});
export default LogIn;
