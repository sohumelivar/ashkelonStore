import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import itemStore from '../../../store/itemStore';
import { editItemRefreshApi, saveChangeApi } from '../../../api/goodApi';
import './EditPage.css';
import categoryStore from '../../../store/categoryStore';
import { mainCategoryApi } from '../../../api/categoryApi';
import SelectCategory from '../selectCategories/SelectCategories';

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

    const toggleModal = () => {
        categoryStore.setIsModalVisible();
        if (categoryStore.isModalVisible) {
        const result = mainCategoryApi();
        categoryStore.setResetParentCaregory();
        result
            .then((category) => categoryStore.setCategory(category))
            .catch((err) => console.log(err));
        };
    };

    async function saveChange () {
        try {
            const categoryId = categoryStore.finallyCategory.id
            await saveChangeApi(name, description, price, img, categoryId);
            navigate("/profile")
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ saveChange ☢ error:', error);
        }
    }

    return (
        <div className='editPageContainer'>
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
                <div className='inputNameDivBut' >
                    <button id="showDivButtonCategory" onClick={toggleModal}>
                            Выбрать категорию
                    </button>
                </div>
                {categoryStore.isModalVisible && (
                    <SelectCategory />
                )}
                <button type='button' onClick={saveChange} >Сохранить изменения</button>
        </div>
    )
});

export default editGood;
