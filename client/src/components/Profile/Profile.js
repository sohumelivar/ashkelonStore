import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./Profile.css";
import avatarDefault from './DSOTM.jpg';
import userStore from "../../store/userStore";
import itemStore from "../../store/itemStore";
import AddGood from "../Goods/addGoods/AddGood";
import UserGoods from "../Goods/userGoods/userGoods";
import { getAllUserItems } from '../../api/goodApi';
import { lastMessagesApi } from '../../api/messageApi';
import { useNavigate } from "react-router-dom";
import Dialog from "../Message/Dialog/Dialog";
import ItemPage from '../ItemPage/ItemPage';

const Profile = observer(() => {
  const navigate = useNavigate()

  useEffect(() => {
    const allFunc = async () => {
      getAllUserItems();
      lastMessagesApi();
    }
    allFunc();
    return () => {
      if(itemStore.itemVisible) itemStore.setItemVisible();
    }
  }, []);

  const [addGoodsCN, setAddGoodsCN] = useState('none');
  const [userGoodsCN, setUserGoodsCN] = useState('active');
  const [userMessageCN, setUserMessageCN] = useState('none');

  const checkBox1 = () => {
    return setAddGoodsCN('visible') || setUserGoodsCN('none') || setUserMessageCN('none');
  };

  const checkBox2 = () => {
    return setAddGoodsCN('none') || setUserGoodsCN('visible') || setUserMessageCN('none');
  };

  const checkBox4 = () => {
    return setAddGoodsCN('none') || setUserGoodsCN('none') || setUserMessageCN('visible');
  };

  if (userStore.backLastMessage) {
    checkBox4();
    userStore.setBackLastMessage(null);
  }

  return (
    <div className="profile_container">
      <div className="profileInfo">
        <Container>
          <Row>
            <Col xs={1} md={2}>
              {userStore.img ?
                <Image className="logo"
                  src={`${userStore.img}`} alt="profile photo" roundedCircle /> :
                <Image className="logo"
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
              <ListGroup.Item>{userStore.user}</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>test</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
      <Button onClick={() => navigate('/edit/profile')} variant="dark">Изменить профиль</Button>
      <div className="buttons">
        <Button type="button" onClick={checkBox1} className="butt" variant="secondary">
          Разместить объявление
        </Button>{" "}
        <Button type="button" onClick={checkBox2} className="butt" variant="secondary">
          Мои обьявления
        </Button>{" "}
        <Button type="button" onClick={checkBox4} className="butt" variant="secondary">
          Мои сообщения
        </Button>{" "}
      </div>
      <div className="divForButtonsOption">
        <div className={addGoodsCN} > <AddGood /> </div>
        <div className={userMessageCN} > <Dialog /></div>
        <div className={userGoodsCN} >
          <div className={itemStore.itemVisible ? 'cardDiv unvItems' : 'cardDiv'}>
            {itemStore.userItems && itemStore.userItems.map((item) => (
              <UserGoods key={item.id} itemData={item} />
            ))}
          </div>
          <div className={itemStore.itemVisible ? 'itemDivCat' : 'unvItems'}>
            <ItemPage />
            <button onClick={()=> itemStore.setItemVisible() }>close</button>
          </div>
        </div>

      </div>
    </div>
  );
});

export default Profile;
