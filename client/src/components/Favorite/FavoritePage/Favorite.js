import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../../../store/userStore';
import itemStore from '../../../store/itemStore';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import { getAllUserFavoriteApi } from '../../../api/goodApi';
import './Favorite.css';
import ItemPage from '../../ItemPage/ItemPage';

const Favorite = observer(() => {
    useEffect(() => {
        getAllUserFavoriteApi();
        return () => {
            if(itemStore.itemVisible) itemStore.setItemVisible();
        }
    }, []);

  
    return (
        <div className='favorite_container'>
            <div className={itemStore.itemVisible ? 'miniContainer unvItems' : 'miniContainer'}>
                <div className='descrDiv'>{`Favorite items from user: ${userStore.user}`}</div>
                    {userStore.user && 
                    <div className='cardDiv'>
                    {itemStore.userFavorite.length || userStore.user > 0 ? itemStore.userFavorite.map((item) => (
                        <FavoriteItem key={item.id} userFav={item}/>
                    )) : <div>don't have favorites</div>}
                </div>
                }
            </div>
            <div className={itemStore.itemVisible ? 'itemDivCat' : 'unvItems'}>
                <ItemPage />
                <button onClick={()=> itemStore.setItemVisible() }>close</button>
            </div>
        </div>
    )
})

export default Favorite;
