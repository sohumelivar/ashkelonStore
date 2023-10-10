import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import userStore from "../../../store/userStore";
import messageStore from "../../../store/messageStore";
import Seller from "./Seller/Seller";
import Buyer from "./Buyer/Buyer";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Cookies from "js-cookie";
import io from "socket.io-client";

const Chat = observer(() => {
  const [messages, setMessages] = useState(messageStore.messages);
  const [message, setMessage] = useState("");
  const id = Cookies.get("chatWith");
  const chatId = Cookies.get("chatId");

  const autorizedUser = Cookies.get("autorizedUserId");
  const data = { autorizedUser, id ,chatId, message };
  const socket = io("http://localhost:5000");


 

  useEffect(() => {
    socket.on("connection", (message) => {
      console.log("Получено сообщение от сервера:", message);
    });
    socket.emit("chatHistory", data);

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });
    socket.on("chatHistory", () => {
      
    });
    return () => {
      socket.off("chatHistory");
    };
  }, []);
  const sendMessage = () => {
    socket.emit("message", data);
    setMessage(""); // Сброс message здесь, после успешной отправки
    socket.on("chatHistory", (history) => {
      setMessages(history);
    });  };


  return (
    <div className="main">
      {messages.map((message) =>
        message.sender.name === userStore.user ? (
          <Seller key={message.id} sellerMessage={message} />
        ) : (
          <Buyer key={message.id} buyerMessage={message} />
        )
      )}

      <div className="ask">
        <h3>Отправить сообщение</h3>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <InputGroup.Text id="inputGroup-sizing-lg">
            <Button onClick={sendMessage} variant="grey">
              Отправить
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
});

export default Chat;
