import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import userStore from "../../../store/userStore";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import avatarDefault from "../../Profile/DSOTM.jpg";
import "./Message.css";
import Cookies from "js-cookie";

const Message = observer(({ lastMessage }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        Cookies.set("chatId", lastMessage.chatId);

        if (userStore.user === lastMessage.sender.name) {
          Cookies.set("chatWith", lastMessage.to);
          navigate(`/chat/${lastMessage.to}`);
        } else {
          Cookies.set("chatWith", lastMessage.from);
          navigate(`/chat/${lastMessage.from}`);
        }
      }}
      className="messageBlock"
    >
      <div className="userInfo">
        <Col xs={1} md={2}>
          {lastMessage.sender.img ? (
            <Image
              className="logoBuyer"
              src={lastMessage.sender.img}
              alt="profile photo"
              roundedCircle
            />
          ) : (
            <Image
              className="logoBuyer"
              src={avatarDefault}
              alt="DSOTM"
              roundedCircle
            />
          )}
        </Col>

        <div>
          {" "}
          {lastMessage.sender.name === userStore.user ? (
            <div>{`${lastMessage.sender.name} to: ${lastMessage.receiver.name}`}</div>
          ) : (
            <div>{lastMessage.sender.name}</div>
          )}
        </div>
      </div>

      <div className="message">{lastMessage.message}</div>
      <div className="time">{lastMessage.time}</div>
    </div>
  );
});

export default Message;
