import React, { useState } from "react";
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
          {buyerMessage.photo ? (
            <Image
              className="logoBuyer"
              src={buyerMessage.photo}
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
      </div>
      <div className="message">{buyerMessage.message}</div>
      <div className="time">{buyerMessage.time}</div>
    </div>
  );
});

export default Buyer;
