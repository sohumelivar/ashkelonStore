import React from "react";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { pageViewId } from "../../api/goodApi";

const Item = observer(({ itemData }) => {
  const navigate = useNavigate();

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
      />
    </Card>
  );
});

export default Item;
