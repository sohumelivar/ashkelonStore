import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import itemStore from '../../../store/itemStore';
import { editItemRefreshApi, saveChangeApi } from '../../../api/goodApi';

const editGood = observer(() => {
    const [name, setName] = useState(itemStore.editItem.name || '');
    const [description, setDescription] = useState(itemStore.editItem.description || '');
    const [price, setPrice] = useState(itemStore.editItem.price || '');
    const [img, setImg] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        const getItem = async () => {
            await editItemRefreshApi();
            setName(itemStore.editItem.name);
            setDescription(itemStore.editItem.description);
            setPrice(itemStore.editItem.price);
        }
        getItem();
    }, []);

    async function saveChange () {
        try {
            await saveChangeApi(name, description, price, img);
            navigate(-1)
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ saveChange ☢ error:', error);
        }
    }

    return (
        <div>
            <div>Edit Page</div>
            <div>название: {itemStore.editItem.name}</div>
                <div>
                    <p>изменить название:  <input type="text" value={name} onChange={(e) => setName(e.target.value)}/></p>
                </div>
                <div>
                    <p>изменить описание: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/></p>
                </div>
                <div>
                    <p>изменить цену: <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}/></p>
                    
                </div> 
                <div>
                    <p>изменить фотографию: <input type="file" onChange={(e) => setImg(e.target.files[0])}/></p>
                </div>
                <button type='button' onClick={saveChange} >Сохранить изменения</button>
        </div>
    )
});
