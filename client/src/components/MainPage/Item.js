import React from 'react'
import {observer} from "mobx-react-lite"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Card from 'react-bootstrap/Card';

const Item= observer (({itemData}) =>{
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={itemData.photo} />
      <Card.Body>
        <Card.Title>{itemData.title}</Card.Title>
        <Card.Text>
        {itemData.description}
        </Card.Text>
        <Button  variant="dark">КУПИТЬ</Button>
      </Card.Body>
      <Form.Check
          required
          label="добавить в избранное"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
    </Card>
  );
})

export default Item;
