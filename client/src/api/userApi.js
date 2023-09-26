import axios from "axios";
import userStore from "../store/userStore";


const axiosFromUser = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/user'
});

export const registration = async (name, password, phone) => {
  try {
    const response = await axiosFromUser.post('/signup', { name, password, phone });
    if (response.data.status === 200) {
      userStore.setUser(response.data.name)

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
      userStore.setUser(response.data.name)
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

export const logout = async () => {
  try {
    await axiosFromUser.post('/signout')
    userStore.setUser('')
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
    const response = await  axiosFromUser.put('/editProfileInfo',{name,phone,password})
    console.log(response);
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
