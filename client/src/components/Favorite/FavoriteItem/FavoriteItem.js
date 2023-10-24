import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { pageViewId, addFavoriteApi, getAllUserFavoriteApi } from '../../../api/goodApi';
import './Favorite.css';
import itemStore from '../../../store/itemStore';

const FavoriteItem = observer(({ userFav }) => {
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(
    userFav.checkBox || false
  );

  useEffect(() => {
    localStorage.setItem(`item_${userFav.id}_liked`, isLiked);
  }, [isLiked, userFav.id]);

  const addFavoriteBtn = async () => {
    try {
      await addFavoriteApi(userFav.id);
      await getAllUserFavoriteApi();
      setIsLiked(!isLiked);
      localStorage.removeItem(`item_${userFav.id}_liked`);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addFavoriteBtn ☢ error:', error);
    }
  }

  return (
    <div className="favorite-item">
      <div
        className="favorite-card"
        onClick={() => {
          pageViewId(userFav.id);
          itemStore.setItemVisible();
        }}
      >
        <img className="item-img" src={userFav.img} alt={`Название: ${userFav.name}`} />
        <div className="favorite-item-details">
            <h2 className="item-title">Название: {userFav.name}</h2>
            <p className="item-description">Описание: {userFav.description}</p>
            <p className="item-price">Цена: {userFav.price} руб.</p>
        </div>
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
      </div>
    </div>
  );
});

export default FavoriteItem;