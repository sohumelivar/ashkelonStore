import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Message from "../MessageBlock/Message";
import messageStore from "../../../store/messageStore";

const Dialog = observer(() => {

  return (
    <div className="main">
      {messageStore.lastsMessages.map((el) => (
        <Message key={el.id} lastMessage={el} />
      ))}
    </div>
  );
});

export default Dialog;
