import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "../../store/userStore";
import { signIn } from "../../api/userApi";
import "./Autofication.css";

const LogIn = observer(() => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleButton = async () => {
    try {
      const result = await signIn(name, password);
      setName("") || setPassword("");
      if (result === 200) {
        userStore.setError('');
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="autoficationDiv">
      <div>
        <h3>Войдите</h3>
        <div>
          <input
            placeholder="Введите имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <input
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <h5>
          У вас нет учетной записи?
          <div>
            <Link to="/signup">Зарегестрироваться!</Link>
          </div>
        </h5>
        <button type="button" onClick={handleButton}>
          Войти
        </button>
        {userStore.error && <div>{userStore.error}</div>}
      </div>
    </div>
  );
});
export default LogIn;
