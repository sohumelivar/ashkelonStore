import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import userStore from "../../../store/userStore";
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
    className={`messageBlock ${lastMessage.unread ? 'unreadDivTrue' : 'unreadDivFalse'}`}>
      <div className="userInfo">
        <div className="avatar">
          {lastMessage.sender.img ? (
            <img
              className="logoBuyer UD"
              src={lastMessage.sender.img}
              alt={lastMessage.sende}
            />
          ) : (
            <img
              className="logoBuyer UD"
              src={avatarDefault}
              alt="DSOTM"
            />
          )}
        </div>
        <div className="userDetails">
          {lastMessage.sender.name === userStore.user ? (
            <div className="userTo UD">
              {`${lastMessage.sender.name} to: ${lastMessage.receiver.name}`}
            </div>
          ) : (
            <div className="userName UD">{lastMessage.sender.name}</div>
          )}
        </div>
      </div>
      <div className="textAndTime">
        <div className="messageText">{lastMessage.message}</div>
        <div className="time">{lastMessage.time}</div>
      </div>
    </div>
  );
});

export default Message;
