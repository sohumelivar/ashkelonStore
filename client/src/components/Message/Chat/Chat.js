import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import userStore from "../../../store/userStore";
import messageStore from "../../../store/messageStore";
import Seller from "./Seller/Seller";
import Buyer from "./Buyer/Buyer";
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
    socket.emit('clearUnreadMessage',data)
    socket.emit('getUnreadMessages', data);
    socket.on('messages', (messages) => {
      setMessages(messages)
    })

    socket.on('newMessage', () => {
      socket.emit("messages", data);
      socket.emit('clearUnreadMessage',data);
      socket.emit('getUnreadMessages', data);
    })

    socket.on('newMessageCounter', (counter) => {
      messageStore.setUnreadMessage(counter);
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

    <div className="chat-container">
      <button 
        onClick={() => {
        userStore.setBackLastMessage('backToLastMessagePage');
        navigate(-1)}
        } 
        className="message-back-button">Back
      </button>
      <div className="main-messages-container" ref={messagesContainerRef}>
        {messages?.map((message) =>
          message.sender.name === userStore.user ? (
            <Seller key={message.id} sellerMessage={message} />
          ) : (
            <Buyer key={message.id} buyerMessage={message} />
          )
        )}
      </div>
      <div className="input-messages-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Введите сообщение..."
        />
        <button onClick={sendMessage} className="messagePage-send-button">
          Отправить
        </button>
      </div>
    </div>












    // <div className="main_message">
    //   <div className="button-container_message">
    //     <button onClick={() => navigate(-1)} className="custom-button_top_message">Back</button>
    //   </div>
      // <div className="messages-container" ref={messagesContainerRef}>
      // {messages?.map((message) =>
      //   message.sender.name === userStore.user ? (
      //     <Seller key={message.id} sellerMessage={message} />
      //   ) : (
      //     <Buyer key={message.id} buyerMessage={message} />
      //   )
      // )}
      // </div>
    //   <div className="ask">
    //     <h3>Отправить сообщение</h3>
    //     <div className="input-group_message">
    //       <input
    //         type="text"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //         onKeyDown={onKeyDown}
    //         placeholder="введите сообщение ..."
    //       />
    //       <button onClick={sendMessage} className="button_bottom" variant="grey">
    //         Отправить
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
});

export default Chat;
