import React from "react";
import { observer } from "mobx-react-lite";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./Profile.css";
import Message from "../Message/Message";

const Profile = observer(() => {
  return (
    <div>
      <div className="profileInfo">
        <Container>
          <Row>
            <Col xs={1} md={2}>
              <Image
                src="https://sun9-23.userapi.com/sun9-20/s/v1/ig2/OUH4eAs3eB8FiD8uxehjm2VLbcUUTBSi-XEe-mJrIC4U3n6xxVXCY4WhkUr6qXGSBjWESb4ryb70lqVUN4F92rQK.jpg?size=200x200&quality=95&crop=317,133,448,448&ava=1"
                roundedCircle
              />
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
        <Button className="butt" variant="secondary">
          Мои обьявления
        </Button>{" "}
        <Button className="butt" variant="secondary">
          Избранное
        </Button>{" "}
        <Button className="butt" variant="secondary">
          Мои сообщения
        </Button>{" "}
      </div>
      <Message/>
    </div>
  );
});

export default Profile;
