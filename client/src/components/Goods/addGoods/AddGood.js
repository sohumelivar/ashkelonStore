import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './AddGood.css';
import { addGoodApi } from '../../../api/goodApi';
import SelectCategory from '../selectCategories/SelectCategories';
import categoryStore from '../../../store/categoryStore';
import { mainCategoryApi } from '../../../api/categoryApi';

const AddGood = observer(() => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState(null);

    useEffect(() => {
        if (categoryStore.isModalVisible) return categoryStore.setIsModalVisible();
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

    

    const addGood = async () => {
        const categoryId = categoryStore.finallyCategory.id
        await addGoodApi(name, description, price, img, categoryId);
        navigate('/');
    };

    return (
       
        <div className='addItemContainer'>
            <div className='inputNameDiv'>
                <div className='nameDiv'>Название: </div>
                <input type='text' className='inputDiv' placeholder='Введите название ' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='inputNameDiv'>
                <div className='nameDiv'>Описание: </div>
                <input type='text' className='inputDiv' placeholder='Введите описание ' onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='inputNameDiv'>
                <div className='nameDiv'>Цена: </div>
                <input type='text' className='inputDiv' placeholder='Введите цену ' onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className='inputNameDiv'>
                <div className='nameDiv'>Загрузить фото: </div>
                <div className='inputDiv'>
                    <label className='custom-file-upload'>
                    <input type='file' className='file-input' onChange={(e) => setImg(e.target.files[0])} />
                         Выбрать файл
                    </label>
                </div>
            </div>
            <div className='inputNameDivBut' >
                <button id="showDivButtonCategory" onClick={toggleModal}>
                        Выбрать категорию
                </button>
            </div>
                {categoryStore.isModalVisible && (
                    <SelectCategory />
                )}
            <div>
                <button onClick={addGood} >создать объявление</button>
            </div>
        </div>


)
});

export default AddGood;