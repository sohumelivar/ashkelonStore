import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./Item.css";
import { useNavigate } from "react-router-dom";
import { pageViewId, addFavoriteApi, getAllGoods } from "../../api/goodApi";
import userStore from "../../store/userStore";

const Item = observer(({ itemData }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(itemData.checkBox === true ? "liked" : "");
  
  useEffect(() => {
    setIsLiked(itemData.checkBox === true ? "liked" : "")
  }, [itemData.checkBox])
  
  const toggleFavoriteBtn = async () => {
    try {
      await addFavoriteApi(itemData.id);
      await getAllGoods()
      setIsLiked(!itemData.checkBox === true ? "liked" : "");
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ toggleFavoriteBtn ☢ error:', error);
    }
  };

  return (
    <div className="item-card" onClick={() => { pageViewId(itemData.id); navigate(`/item/${itemData.id}`); }}>
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
          toggleFavoriteBtn();
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
    </div>
  );
});

export default Item;