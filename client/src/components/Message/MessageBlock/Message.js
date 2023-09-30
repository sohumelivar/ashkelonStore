import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import messageStore from "../../../store/messageStore";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import avatarDefault from "../../Profile/DSOTM.jpg";
import "./Message.css";

const Message = observer(({ lastMessage }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/chat/${lastMessage.id}`);
      }}
      className="messageBlock"
    >
      <div className="userInfo">
        <Col xs={1} md={2}>
          {lastMessage.photo ? (
            <Image
              className="logoBuyer"
              src={lastMessage.photo}
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

        <div> {lastMessage.user}</div>
      </div>

      <div className="message">{lastMessage.message}</div>
      <div className="time">{lastMessage.time}</div>
    </div>
  );
});

export default Message;
