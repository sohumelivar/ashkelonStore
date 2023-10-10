import axios from "axios";
import userStore from "../store/userStore";
import Cookies from 'js-cookie';
import { getAllGoods } from "./goodApi";


const axiosFromUser = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/user'
});

export const registration = async (name, password, phone) => {
  try {
    const response = await axiosFromUser.post('/signup', { name, password, phone });
    if (response.data.status === 200) {
      userStore.setUser(response.data.name);
      Cookies.set('user', response.data.name);
      Cookies.set('autorizedUserId', response.data.id);
      return response.data.status
    }
    if (response.data.status !== 200) {
      userStore.setError(response.data.error)
      return response.data.status
    }

  } catch (error) {
    console.log(error)
  }
}

export const signIn = async (name, password) => {
  try {
    const response = await axiosFromUser.post('/signin', { name, password });
    if (response.data.status === 200) {
      userStore.setUser(response.data.name);
      Cookies.set('user', response.data.name);
      Cookies.set('autorizedUserId', response.data.id);
      return response.data.status
    }
    if (response.data.status !== 200) {
      userStore.setError(response.data.error);
      return response.data.status
    }

  } catch (error) {
    console.log(error)

  }
}

export const logout = async () => {
  try {
    await axiosFromUser.post('/signout');
    userStore.setUser('');
    Cookies.remove('user');
    Cookies.remove("autorizedUserId")
    Cookies.remove("chatId")
    localStorage.clear();
    await getAllGoods();
  } catch (error) {
    console.log(error)
  }
}

export const checkUser = async () => {
  try {
    const response = await axiosFromUser.get('/checkUser');
    userStore.setUser(response.data.name);
    userStore.setImg(response.data.img);
    return response.data.name
  } catch (error) {
    console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ checkUser ☢ error:', error);
  }
}


export const getUserProfileApi = async ()=>{
  try {
    const response = await axiosFromUser.get('/getUserProfile')
   return userStore.setEditProfile(response.data)
  } catch (error) {
    console.log(error);
  }
}

export const saveChangesApi = async (name,phone,password,img)=>{
  try {
    const data = {
      name,
      phone,
    };
    if (password) {
      data.password = password;
    }

    const response = await axiosFromUser.put('/editProfileInfo',{data})
   if (img) {
    const data = new FormData();
    data.append('userPhoto', img, response.data.name);
    await axiosFromUser.post('/addPhoto', data, {
        headers: {
            'content-type' : 'multipart/form-data'
        }
    });
    return userStore.setEditProfile(response.data);
  }  } catch (error) {
    console.log(error);

  }
}

// export const testIpApi = async () => {
//   try {
//     const response = await axios.get("https://api.ipify.org?format=json");
//     const IP = response.data.ip;
//     console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ testIpApi ☢ response:', { ip: response.data.ip });
//     const locationData = await axios.get(`https://ipinfo.io/${IP}/json`);

//     console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ testIpApi ☢ locationData:', locationData)

//     // await axiosFromUser.post('/testIp', { ip: response.data.ip });
//     console.log('testIp');
//   } catch (error) {
//     console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ testIpApi ☢ error:', error);
//   }
// }
