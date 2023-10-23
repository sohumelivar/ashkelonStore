import axios from 'axios';

const axiosFromCategory = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/category'
  });

export const mainCategoryApi = async () => {
    try {
        const response = await axiosFromCategory.get('/getMainCategory');
        return response.data;
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ mainCategory ☢ error:', error);
    }
}

export const getParentCategoryApi = async (id) => {
    try {
        const response = await axiosFromCategory.post('/getParentCategory', { id });
        return response.data;
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ parentCategoryApi ☢ error:', error);
    }
}

export const getSelectCategoryApi = async (id) => {
    try {
        const response = await axiosFromCategory.post('/getSelectCategory', { id });
        return response.data;
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ getSelectCategory ☢ error:', error);
    }
}

export const searchCatalogItemsApi = async (id) => {
    try {
        const response = await axiosFromCategory.post('/searchCatalogItems', { id });
        return response.data;
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ searchCatakogItemsApi ☢ error:', error);
    }
}

export const searchAllItemsCatalogApi = async (id) => {
    try {
        const response = await axiosFromCategory.post('/searchAllItemsCatalog', { id });
        return response.data;
    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ searchCatakogItemsApi ☢ error:', error);
    }
}