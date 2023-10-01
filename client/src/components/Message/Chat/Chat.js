import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import userStore from "../../../store/userStore";
import messageStore from "../../../store/messageStore";
import Seller from "./Seller/Seller";
import Buyer from "./Buyer/Buyer";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const Chat = observer(() => {
  const sendButton = () => {};

  return (
    <div className="main">
      {messageStore.messages.map((message) =>
        message.from === userStore.user ? (
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
          />
          <InputGroup.Text id="inputGroup-sizing-lg">
            <Button onClick={sendButton} variant="grey">
              Отправить
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
});

export default Chat;
