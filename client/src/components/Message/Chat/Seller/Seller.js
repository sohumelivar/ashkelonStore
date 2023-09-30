import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import "./Seller.css"


const Seller = observer(({ sellerMessage }) => {
  return (
    <div className="seller">
      <div className="sellerTime">{sellerMessage.time}</div>
      <div className="sellerMessage">{sellerMessage.message}</div>
    </div>
  );
});

export default Seller;

