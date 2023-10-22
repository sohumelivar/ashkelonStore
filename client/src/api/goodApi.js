import axios from 'axios';
import itemStore from "../store/itemStore";

const axiosFromGood = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/good'
  });

export const addGoodApi = async (name, description, price, img, categoryId) => {
    try {
        const response = await axiosFromGood.post('/addGood', {name, description, price, categoryId});
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

export const getAllGoods = async () => {
    try {
        const response = await axiosFromGood.get('/getAll');
        itemStore.setItem(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ getAll ☢ error:', error);
    }
}

export const getAllUserFavoriteApi = async () => {
    try {
        const response = await axiosFromGood.get('/getAllUserFav');
        itemStore.setUserFavorite(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ getAllUserFavoriteApi ☢ error:', error);
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

export const getAllUserItems = async () => {
    try {
        const response = await axiosFromGood.get('/getAllUserItems');
        if (response.data.message === 'empty') return itemStore.setUserItems(null);
        itemStore.setUserItems(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ getAllUserItems ☢ error:', error);
    }
}

export const deleteItemApi = async (id) => {
    try {
        await axiosFromGood.post('/deleteItem', {id});
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ deleteItem ☢ error:', error);
    }
}

export const editItemApi = async (id) => {
    try {
        const response = await axiosFromGood.post('/editItem', { id });
        return itemStore.setEditItem(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ editItemApi ☢ error:', error);
    }
}

export const editItemRefreshApi = async () => {
    try {
        const response = await axiosFromGood.get('/editItemRefresh');
        return itemStore.setEditItem(response.data);
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ editItemRefreshApi ☢ error:', error);
    }
}

export const saveChangeApi = async (name, description, price, img) => {
    try {
        const response = await axiosFromGood.post('/saveChange', {name, description, price});
        if (img) {
            const data = new FormData();
            data.append('goodsImg', img, response.data.id);
            await axiosFromGood.post('/addImg', data, {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            });
          }
        return itemStore.setEditItem(response.data) || itemStore.setMessage('save change');
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ saveChangeApi ☢ error:', error);
    }
}

export const addFavoriteApi = async (id) => {
    try {
        await axiosFromGood.post('/checkFavorite', {id});
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ addFavoriteApi ☢ error:', error);
    }
}

export const testCategoryApi = async () => {
    try {
        await axiosFromGood.post('/testCategory');
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ testCategoryApi ☢ error:', error);
    }
}

