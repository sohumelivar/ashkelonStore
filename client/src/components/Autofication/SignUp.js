import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { registration } from "../../api/userApi";
import userStore from "../../store/userStore";
import "./Autofication.css";


const SignUp = observer(() => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); 

  async function handleButton() {
    try {
      const result = await registration(name, password, phone);
      setName("");
      setPassword("");
      setPhone("");
      if (result === 200) {
        userStore.setError('');
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onKeyDown = e =>{
    if (e.key === 'Enter') handleButton();
  }

  return (

    <div className="autoficationDiv" >


    <div >
      <h3>Регистрация</h3>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          onKeyDown={onKeyDown}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          onKeyDown={onKeyDown}
        />
      </div>
      <div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Введите телефон"
          onKeyDown={onKeyDown}
        />
      </div>
      {userStore.error && <div>{userStore.error}</div>}
      <h5>
        У вас есть учетная запись? 
        <div>
        <Link to="/signin"> Войдите </Link>

        </div>
      </h5>
      <button type="button" onClick={handleButton}>
        Зарегестрироваться
      </button>
    </div>
    </div>

  );
});

export default SignUp;
