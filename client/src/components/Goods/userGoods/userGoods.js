import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { pageViewId, getAllUserItems } from "../../../api/goodApi";
import { deleteItemApi, editItemApi, addFavoriteApi } from "../../../api/goodApi";
import itemStore from '../../../store/itemStore';

const userGoods = observer(({ itemData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getAllUserItems();
  }, []); 

  const deleteItem = async (e) => {
    await deleteItemApi(e.target.id);
    await getAllUserItems();
  }

  const editItem = async (e) => {
    try {
      await editItemApi(e.target.id);
      navigate(`/item/edit/${itemStore.editItem.id}`);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ editItem ☢ error:', error);
    }
  }

  const addFavoriteBtn = async () => {
    try {
      await addFavoriteApi(itemData.id);
      await getAllUserItems();
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
        <Button id={itemData.id}
          onClick={(e) => {
            e.stopPropagation();
            editItem(e);
          }}
          variant="dark"
        >
          Изменить
        </Button>
        <Button id={itemData.id}
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(e);
          }}
          variant="dark"
        >
          Удалить
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

export default userGoods;