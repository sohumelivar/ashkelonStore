import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './AddGood.css';
import { addGoodApi } from '../../../api/goodApi';
import { mainCategoryApi } from '../../../api/categoryApi';
import SelectCategory from '../selectCategories/SelectCategories';

const AddGood = observer(() => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState(null);
    const [isHidden, setIsHidden] = useState(true);
    const [selectCategory, setSelectCategory] = useState(null);
    console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ AddGood ☢ selectCategory:', selectCategory)

    
    
    const toggleSelectBtn = async () => {
        try {
            if(selectCategory) return setSelectCategory(null);
            const category = mainCategoryApi();
            category
                .then( (el) => setSelectCategory(el))
                .catch( err => console.log(err));
       } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ toggleSelectBtn ☢ error:', error);
       }
    };

    const navigate = useNavigate();

    const addGood = async () => {
        await addGoodApi(name, description, price, img);
        navigate('/');
    };

    return (
       
        <div className='addItemContainer'>
            <div className='inputNameDiv'>
                <div className='nameDiv'>название</div>
                <input type='text' className='inputDiv' placeholder='Введите название: ' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='inputNameDiv'>
                <div className='nameDiv'>название</div>
                <input type='text' className='inputDiv' placeholder='Введите описание: ' onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='inputNameDiv'>
                <div className='nameDiv'>название</div>
                <input type='text' className='inputDiv' placeholder='Введите цену: ' onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className='inputNameDiv'>
                <div className='nameDiv'>Загрузить фото</div>
                <div className='inputDiv'>
                    <label className='custom-file-upload'>
                    <input type='file' className='file-input' onChange={(e) => setImg(e.target.files[0])} />
                    Выбрать файл
                    </label>
                </div>
            </div>
            <div className='selectCategoryDiv'>
                    <button id="showDivButtonCategory" onClick={toggleSelectBtn}>
                        Выбрать каттегорию
                    </button>
            </div>
            <div className='containerAddMainDiv'>
               <SelectCategory selectCategory={selectCategory}/>
            </div>

        </div>


)
});

export default AddGood;