import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import './AddGood.css';
import { addGoodApi } from '../../../api/goodApi';

const AddGood = observer(() => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState(null);

    const navigate = useNavigate();

    const addGood = async () => {
        await addGoodApi(name, description, price, img);
        navigate('/');
    };

    return (
        <div>
            <div><input type="text" placeholder='Введите название' onChange={(e) => setName(e.target.value)}  /></div>
            <div><input type="text" placeholder='Введите описание' onChange={(e) => setDescription(e.target.value)}  /></div>
            <div><input type="text" placeholder='Введите цену' onChange={(e) => setPrice(e.target.value)}  /></div>
            <div><input type="file" placeholder='Добавьте изображение' onChange={(e) => setImg(e.target.files[0])}  /></div>
            <button type='button' onClick={addGood} className='adSaleBtn'>Опубликовать</button>

        </div>
    )
});

export default AddGood;
