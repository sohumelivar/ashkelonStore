import React, { useEffect } from 'react'
import {observer} from "mobx-react-lite"
import Item from './Item'
import ItemStore from '../../store/itemStore'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './MPage.css';
import { getAllGoods } from '../../api/goodApi';



const MainPage = observer(() => {
  useEffect(() => {
    getAllGoods();
  }, []);
  return (
    <div>
            <InputGroup className="mb-3">
        <Form.Control
          placeholder="Название товара"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          ПОИСК ТОВАРА
        </Button>
      </InputGroup>
      <div className='cardDiv'>
      {ItemStore.items.map((item) => (
        <Item key={item.id} itemData={item} />
      ))}

      </div>
    </div>
  );
});


export default MainPage
