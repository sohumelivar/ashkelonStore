import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import "./ItemPage.css";
import itemStore from "../../store/itemStore";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { pageViewIdAfterRefresh } from '../../api/goodApi';
import { sendMessageItemPageApi } from '../../api/messageApi';
import userStore from "../../store/userStore";
import messageStore from "../../store/messageStore";
import Nav from "react-bootstrap/Nav";

const ItemPage = observer(() => {
  const navigate = useNavigate();
  const [buttonInfo, setButtonInfo] = useState("Показать телефон");
  const [message, setMessage] = useState('');
  const [activeDiv, setAsciveDiv] = useState('none');

  const handleButton = () => {
    setButtonInfo(itemStore.item.user.phone);
  };
  const sendButton = async () => {
    if(userStore.user) {
      await sendMessageItemPageApi(message);
      setMessage('');
    } else {
      setAsciveDiv("active");
      setMessage('');
    }
  };

  if(!itemStore.item.name) pageViewIdAfterRefresh();

  const onKeyDown = e =>{
    if (e.key === 'Enter') sendButton();
  }

  return (
    <div className="itemPageContainer">
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
       {itemStore.item.user?.name !== userStore.user &&  
        <div className="ask">
          <h3>Написать продавцу</h3>
          <InputGroup 
          size="lg"
          onKeyDown={onKeyDown}
          >
            <Form.Control 
              placeholder="введите сообщение ..."
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <InputGroup.Text id="inputGroup-sizing-lg">
              <Button onClick={sendButton} variant="grey">
                Отправить
              </Button>
            </InputGroup.Text>
            </InputGroup>
            <div className={activeDiv}>Необходимо войти в учетную запись, или зарегестрироваться<Link to="/signIn">Войти</Link></div>
            <p>{messageStore.responseMessage && messageStore.responseMessage}</p>
            <p>{messageStore.responseMessage && <Nav.Link as={Link} to="/"></Nav.Link>}</p>
        </div>
       } 
    </div>
  );
});
export default ItemPage;
