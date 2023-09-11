import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { registration } from "../../api/userApi";
import userStore from "../../store/userStore";

const SignUp = observer(() => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleButton() {
    try {
      const result = await registration(name, password);
      setName("") && setPassword("");
      if (result === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h3>Регистрация</h3>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </div>
      {userStore.error && <div>{userStore.error}</div>}
      <h5>
        У вас есть учетная запись? <Link to="/signin"> Войдите </Link>
      </h5>
      <button type="button" onClick={handleButton}>
        {" "}
        Зарегестрироваться
      </button>
    </div>
  );
});

export default SignUp;
