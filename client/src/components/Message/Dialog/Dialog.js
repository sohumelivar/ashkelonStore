import React from "react";
import { observer } from "mobx-react-lite";
import Message from "../MessageBlock/Message";
import messageStore from "../../../store/messageStore";

const Dialog = observer(() => {

  return (
    <div className="main">
      {messageStore.lastsMessages.length === 0 && <div>У вас нет сообщений</div>}  
      {messageStore.lastsMessages.length > 0 && messageStore.lastsMessages.map((el) => (
        <Message key={el.id} lastMessage={el} /> 
      )) }
    </div>
  );
});

export default Dialog;
