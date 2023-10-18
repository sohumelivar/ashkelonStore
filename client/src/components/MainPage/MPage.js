import React, { useEffect } from 'react';
import {observer} from "mobx-react-lite";
import Item from './Item';
import ItemStore from '../../store/itemStore';
import './MPage.css';
import { getAllGoods, testCategoryApi } from '../../api/goodApi';

const MainPage = observer(() => {

useEffect(() => {
  const getAll = async () => {
    await getAllGoods();
  };
  getAll();
}, []);

// testCategoryApi();


return (
    <div className='mainPage_container'>
      <div className="search-container">
        <input type="text" placeholder="Название товара" className="search-input" />
        <button className="search-button">ПОИСК ТОВАРА</button>
      </div>
      <div className='cardDiv'>
        {ItemStore.items.map((item) => (
          <Item key={item.id} itemData={item} />
        ))}
      </div>
    </div>
  );
});

export default MainPage;