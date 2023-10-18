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