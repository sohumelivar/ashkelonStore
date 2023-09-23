import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./Profile.css";
import Message from "../Message/Message";
import avatarDefault from './DSOTM.jpg';
import userStore from "../../store/userStore";
import AddGood from "../Goods/addGoods/AddGood";

const Profile = observer(() => {
  const [addGoodsCN, setAddGoodsCN] = useState('none');
  const [userGoodsCN, setUserGoodsCN] = useState('active');
  const [userFavoriteCN, setUserFavoriteCN] = useState('none');
  const [userMessageCN, setUserMessageCN] = useState('none');

  const checkBox1 = () => {
    return setAddGoodsCN('visible') || setUserGoodsCN('none') || setUserFavoriteCN('none') || setUserMessageCN('none');
  };

  const checkBox2 = () => {
    return setAddGoodsCN('none') || setUserGoodsCN('visible') || setUserFavoriteCN('none') || setUserMessageCN('none');
  };

  const checkBox3 = () => {
    return setAddGoodsCN('none') || setUserGoodsCN('none') || setUserFavoriteCN('visible') || setUserMessageCN('none');
  };

  const checkBox4 = () => {
    return setAddGoodsCN('none') || setUserGoodsCN('none') || setUserFavoriteCN('none') || setUserMessageCN('visible');
  };

  return (
    <div>
      <div className="profileInfo">
        <Container>
          <Row>
            <Col xs={1} md={2}>
              {userStore.img ? 
              <Image className="logo"
                src={`${userStore.img}`} alt="profile photo" roundedCircle /> :
              <Image
                src={`${avatarDefault}`} alt="DSOTM" roundedCircle /> 
              }
            </Col>
          </Row>
        </Container>

        <div className="infoUser">
          <div>
            <ListGroup className="info1" variant="flush">
              <ListGroup.Item>Имя</ListGroup.Item>
              <ListGroup.Item>Фамилия</ListGroup.Item>
              <ListGroup.Item>Телефон</ListGroup.Item>
              <ListGroup.Item>Почта</ListGroup.Item>
            </ListGroup>
          </div>
          <div>
            <ListGroup className="info" variant="flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
      <div className="buttons">
        <Button type="button" onClick={checkBox1} className="butt" variant="secondary">
          Разместить объявление
        </Button>{" "}
        <Button type="button" onClick={checkBox2} className="butt" variant="secondary">
          Мои обьявления
        </Button>{" "}
        <Button type="button" onClick={checkBox3} className="butt" variant="secondary">
          Избранное
        </Button>{" "}
        <Button type="button" onClick={checkBox4} className="butt" variant="secondary">
          Мои сообщения
        </Button>{" "}
      </div>
      <Message/>
      <div className="divForButtonsOption">
        <div className={addGoodsCN} > <AddGood /> </div>
        <div className={userGoodsCN} > объявления юзера</div>
        <div className={userFavoriteCN} > избранное </div>
        <div className={userMessageCN} > сообщения</div>
        
      </div>
    </div>
  );
});

export default Profile;
