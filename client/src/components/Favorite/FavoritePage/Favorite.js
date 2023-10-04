import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../../../store/userStore';
import itemStore from '../../../store/itemStore';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import { getAllUserFavoriteApi } from '../../../api/goodApi';
import './Favorite.css';

const Favorite = observer(() => {
    useEffect(() => {
        getAllUserFavoriteApi();
    }, []);

  
    return (
        <div>
            <div>{`Favorite items from user: ${userStore.user}`}</div>
            {userStore.user && 
            <div className='cardDiv'>
               {itemStore.userFavorite.length || userStore.user > 0 ? itemStore.userFavorite.map((item) => (
                <FavoriteItem key={item.id} userFav={item}/>
               )) : <div>don't have favorites</div>}
            </div>
            }
        </div>
    )
})

export default Favorite;
