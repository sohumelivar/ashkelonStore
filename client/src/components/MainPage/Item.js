import React from "react";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { pageViewId, addFavoriteApi, getAllGoods } from "../../api/goodApi";

const Item = observer(({ itemData }) => {
  const navigate = useNavigate();
  
  const addFavoriteBtn = async () => {
    try {
      await addFavoriteApi(itemData.id);
      await getAllGoods();
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addFavoriteBtn ☢ error:', error);
    }
  }

  return (
    <Card
      onClick={() => {
        pageViewId(itemData.id);
        navigate(`/item/${itemData.id}`);
      }}
      style={{ width: "18rem" }}
    >
      <Card.Img variant="top" src={itemData.img} />
      <Card.Body>
        <Card.Title>{itemData.name}</Card.Title>
        <Card.Text>{itemData.description}</Card.Text>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant="dark"
        >
          КУПИТЬ
        </Button>
      </Card.Body>
      <Form.Check
        required
        label="добавить в избранное"
        feedback="You must agree before submitting."
        feedbackType="invalid"
        checked={itemData.checkBox}
        onChange={addFavoriteBtn}
        onClick={(e) => e.stopPropagation()}
      />
    </Card>
  );
});

export default Item;
