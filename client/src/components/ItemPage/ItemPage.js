import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./ItemPage.css";
import itemStore from "../../store/itemStore";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { pageViewIdAfterRefresh } from '../../api/goodApi';

const ItemPage = observer(() => {
  const navigate = useNavigate();
  const [buttonInfo, setButtonInfo] = useState("Показать телефон");

  const handleButton = () => {
    setButtonInfo(itemStore.item.user.phone);
  };
  const sendButton = () => {};

  if(!itemStore.item.name) pageViewIdAfterRefresh();


  return (
    <div>
      <div>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variant="secondary"
        >
          Назад
        </Button>
        <div className="photoAndContactDiv">
          <div className="carouselParent">
            <h2>Название: {itemStore.item.name} </h2>
            <Carousel data-bs-theme="dark" className="mainCarousel">
              <Carousel.Item className="carouselBlock">
                <img
                  id="photo"
                  className="d-block w-100 "
                  src={itemStore.item.img}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
            <div>описание: {itemStore.item.description}</div>
          </div>
          <div className="contactInfo">
            <div>Цена: {itemStore.item.price}</div>
            <div>Контактное лицо: {itemStore.item.user?.name}</div>
            <Button onClick={handleButton} variant="primary">
              {buttonInfo}
            </Button>
          </div>
        </div>
      </div>

      <div className="ask">
        <h3>Написать продавцу</h3>
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
export default ItemPage;
