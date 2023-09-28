import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { pageViewId, addFavoriteApi, getAllUserFavoriteApi } from '../../../api/goodApi';

const FavoriteItem = observer(({userFav}) => {
    const navigate = useNavigate();

    const addFavoriteBtn = async () => {
        try {
          await addFavoriteApi(userFav.id);
          await getAllUserFavoriteApi();
        } catch (error) {
          console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addFavoriteBtn ☢ error:', error);
        }
    }


    return (
        <div>
            <div>ИЗбранные товары</div>      
            <Card
                onClick={() => {
                    pageViewId(userFav.id);
                    navigate(`/item/${userFav.id}`);
                }}
                style={{ width: "18rem" }}
                >
                <Card.Img variant="top" src={userFav.img} />
                <Card.Body>
                    <Card.Title>{userFav.name}</Card.Title>
                    <Card.Text>{userFav.description}</Card.Text>
                </Card.Body>
                <Form.Check
                    required
                    label="добавить в избранное"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                    checked={userFav.checkBox}
                    onChange={addFavoriteBtn}
                    onClick={(e) => e.stopPropagation()}
                />
            </Card>
        </div>
    )
})

export default FavoriteItem;
