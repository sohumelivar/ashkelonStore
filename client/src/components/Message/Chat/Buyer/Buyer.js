import React from "react";
import { observer } from "mobx-react-lite";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import avatarDefault from "../../../Profile/DSOTM.jpg";
import "./Buyer.css"

const Buyer = observer(({ buyerMessage }) => {
  return (
    <div className="buyer">
      <div className="profile">
        <Col xs={1} md={2}>
          {buyerMessage.sender.img ? (
            <Image
              className="logoBuyer"
              src={buyerMessage.sender.img}
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
        <p className="message_sender_name">{buyerMessage.sender.name}</p>
      </div>
      <div className="message">{buyerMessage.message}</div>
      <div className="time">{buyerMessage.time}</div>
    </div>
  );
});

export default Buyer;
