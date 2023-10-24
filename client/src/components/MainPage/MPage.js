import React, { useEffect } from 'react';
import {observer} from "mobx-react-lite";
import Item from './Item';
import ItemStore from '../../store/itemStore';
import './MPage.css';
import { getAllGoods } from '../../api/goodApi';
import ItemPage from '../ItemPage/ItemPage';

const MainPage = observer(() => {

useEffect(() => {
  const getAll = async () => {
    await getAllGoods();
  };
  getAll();
  return () => {
    if(ItemStore.itemVisible) ItemStore.setItemVisible();
  }
}, []);

return (
    <div className='mainPage_container'>
      <div className="search-container">
        <input type="text" placeholder="Название товара" className="search-input" />
        <button className="search-button">ПОИСК ТОВАРА</button>
      </div>
      <div className={ItemStore.itemVisible ? 'cardDiv unvItems' : 'cardDiv'}>
        {ItemStore.items.map((item) => (
          <Item key={item.id} itemData={item} />
        ))}
      </div>
      <div className={ItemStore.itemVisible ? 'itemDivCat' : 'unvItems'}>
        <ItemPage />
        <button onClick={()=> ItemStore.setItemVisible() }>close</button>
      </div>
    </div>
  );
});

export default MainPage;