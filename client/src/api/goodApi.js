import axios from 'axios';
import itemStore from "../store/itemStore";

const axiosFromGood = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/good'
  });

export const addGoodApi = async (name, description, price, img) => {
    try {
        const response = await axiosFromGood.post('/addGood', {name, description, price});
        if (img) {
            const data = new FormData();
            data.append('goodsImg', img, response.data.id);
            await axiosFromGood.post('/addImg', data, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            });
        }
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addGood ☢ error:', error);
    }
}

export const addImg = async (img) => {
    try {
        const data = new FormData();
        data.append('goodsImg', img)
        await axiosFromGood.post('/addImg', )
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addImg ☢ error:', error);
    }
}

export const getAllGoods = async () => {
    try {
        const response = await axiosFromGood.get('/getAll');
        return itemStore.setItem(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ getAll ☢ error:', error);
    }
}

export const pageViewId = async (goodId) => {
    try {
        const response = await axiosFromGood.post('/pageViewId', {goodId});
        itemStore.setItemOne(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ pageViewId ☢ error:', error);
    }
}

export const pageViewIdAfterRefresh = async () => {
    try {
        const response = await axiosFromGood.get('/pageAfter');
        itemStore.setItemOne(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ pageViewIdAfterRefresh ☢ error:', error);
    }
}