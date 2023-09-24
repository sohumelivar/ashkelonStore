import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import itemStore from '../../../store/itemStore';
import { editItemRefreshApi } from '../../../api/goodApi';

const editGood = observer(() => {
    const [name, setName] = useState(itemStore.editItem.name || '');
    const [description, setDescription] = useState(itemStore.editItem.description || '');
    const [price, setPrice] = useState(itemStore.editItem.price || '');
    const [img, setImg] = useState(null);
    
    useEffect(() => {
        const getItem = async () => {
            await editItemRefreshApi();
            setName(itemStore.editItem.name);
            setDescription(itemStore.editItem.name);
            setPrice(itemStore.editItem.price);
        }
        getItem();
    }, []);

    return (
        <div>
            <div>edit</div>
            <div>{itemStore.editItem.name}</div>
                <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div> 
                <div>
                    <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
                </div>
        </div>
    )
});

export default editGood;