import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
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
import './Chat.css'

const Chat = observer(() => {
  const [messages, setMessages] = useState(messageStore.messages);
  const [message, setMessage] = useState('');
  const messagesContainerRef = useRef(null);
  const navigate = useNavigate();

  const id = Cookies.get("chatWith");
  const chatId = Cookies.get("chatId");
  const autorizedUser = Cookies.get("autorizedUserId");
  const data = { autorizedUser, id ,chatId, message };
  const socket = io("http://localhost:5000");

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('userId', data);
    socket.emit("messages", data);
    socket.emit('unreadMessage',data)
    socket.on('messages', (messages) => {
      setMessages(messages)
    })

    socket.on('newMessage', () => {
      socket.emit("messages", data);
    })

    return () => {
      socket.disconnect();
    };
  }, []);
  
  
  const sendMessage = () => {
    if(data.message) {
      socket.emit('sendMessage', data);
      setMessage('');
    }
  };

  const onKeyDown = e =>{
    if (e.key === 'Enter') sendMessage();
  }


  return (
    <div className="main">
      <div className="button-container_my">
        <button onClick={() => navigate(-1)} className="custom-button">Back</button>
      </div>
      <div className="messages-container" ref={messagesContainerRef}>
      {messages?.map((message) =>
        message.sender.name === userStore.user ? (
          <Seller key={message.id} sellerMessage={message} />
        ) : (
          <Buyer key={message.id} buyerMessage={message} />
        )
      )}
      </div>
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
            onKeyDown={onKeyDown}
          />
          <InputGroup.Text 
          id="inputGroup-sizing-lg"
          onKeyDown={onKeyDown}
          placeholder='введите сообщение ...'
          >
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
