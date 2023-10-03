import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import messageStore from "../../../store/messageStore";
import userStore from '../../../store/userStore';
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import avatarDefault from "../../Profile/DSOTM.jpg";
import "./Message.css";

const Message = observer(({ lastMessage }) => {

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/chat/${lastMessage.from}`);
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

        <div> {lastMessage.sender.name === userStore.user ? <div>{`${lastMessage.sender.name} to: ${lastMessage.receiver.name}`}</div> : <div>{lastMessage.sender.name}</div>}</div>
      </div>

      <div className="message">{lastMessage.message}</div>
      <div className="time">{lastMessage.time}</div>
    </div>
  );
});

export default Message;
