import React, { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { pageViewId, getAllUserItems } from "../../../api/goodApi";
import { deleteItemApi, editItemApi, addFavoriteApi } from "../../../api/goodApi";
import itemStore from '../../../store/itemStore';
import userStore from '../../../store/userStore';
import './userGoods.css'

const UserGoods = observer(({ itemData }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(itemData.checkBox === true ? "liked" : "");

  useEffect(() => {
    setIsLiked(itemData.checkBox === true ? "liked" : "")
  }, [itemData.checkBox])


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
      setIsLiked(!itemData.checkBox === true ? "liked" : "");
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addFavoriteBtn ☢ error:', error);
    }
  }

  return (
    <div className="item-card" onClick={() => { pageViewId(itemData.id); itemStore.setItemVisible(); }}>
      <img className="item-img" src={itemData.img} alt={`Название: ${itemData.name}`} />
      <div className="item-details">
        <h2 className="item-title">Название: {itemData.name}</h2>
        <p className="item-description">Описание: {itemData.description}</p>
        <p className="item-price">Цена: {itemData.price} руб.</p>
      </div>
      {userStore.user && 
      <label 
        className="item-favorite-label"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`heart ${isLiked ? "liked" : ""}`} onClick={(e) => {
          addFavoriteBtn();
          e.stopPropagation();
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isLiked ? "#ff0000" : "#000000"}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 16.44 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 7.94-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </label>
      }
      <div className="item-action-buttons">
        <button id={itemData.id} className="item-action-button gray-button" onClick={(e) => {
          editItem(e);
          e.stopPropagation();
          }}>
          Изменить
        </button>
        <button id={itemData.id} className="item-action-button gray-button" onClick={(e) => {
          deleteItem(e);
          e.stopPropagation();
          }}>
          Удалить
        </button>
      </div>
    </div>
  );
});

export default UserGoods;




// import React, { useEffect } from 'react';
// import { observer } from "mobx-react-lite";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import { useNavigate } from "react-router-dom";
// import { pageViewId, getAllUserItems } from "../../../api/goodApi";
// import { deleteItemApi, editItemApi, addFavoriteApi } from "../../../api/goodApi";
// import itemStore from '../../../store/itemStore';

// const userGoods = observer(({ itemData }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllUserItems();
//   }, []); 

//   const deleteItem = async (e) => {
//     await deleteItemApi(e.target.id);
//     await getAllUserItems();
//   }

//   const editItem = async (e) => {
//     try {
//       await editItemApi(e.target.id);
//       navigate(`/item/edit/${itemStore.editItem.id}`);
//     } catch (error) {
//       console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ editItem ☢ error:', error);
//     }
//   }

//   const addFavoriteBtn = async () => {
//     try {
//       await addFavoriteApi(itemData.id);
//       await getAllUserItems();
//     } catch (error) {
//       console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addFavoriteBtn ☢ error:', error);
//     }
//   }

//   return (
//     <Card
//       onClick={() => {
//         pageViewId(itemData.id);
//         navigate(`/item/${itemData.id}`);
//       }}
//       style={{ width: "18rem" }}
//     >
//       <Card.Img variant="top" src={itemData.img} />
//       <Card.Body>
//         <Card.Title>{itemData.name}</Card.Title>
//         <Card.Text>{itemData.description}</Card.Text>
//         <Button id={itemData.id} 
//           onClick={(e) => {
//             e.stopPropagation();
//             editItem(e);
//             navigate(`/item/edit/${itemData.id}`)
//           }}
//           variant="dark"
//         >
//           Изменить
//         </Button>
//         <Button id={itemData.id}
//           onClick={(e) => {
//             e.stopPropagation();
//             deleteItem(e);
//           }}
//           variant="dark"
//         >
//           Удалить
//         </Button>
//       </Card.Body>
//       <Form.Check
//         required
//         label="добавить в избранное"
//         feedback="You must agree before submitting."
//         feedbackType="invalid"
//         checked={itemData.checkBox}
//         onChange={addFavoriteBtn}
//         onClick={(e) => e.stopPropagation()}
//       />
//     </Card>
//   );
// });

// export default userGoods;
