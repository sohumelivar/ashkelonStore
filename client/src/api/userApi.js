import axios from "axios"
import UserStore from "../store/userStore"

const userStore = new UserStore()

const axiosOptions = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api/user'
});

const registration = async (name,password)=>{
  try {
    const response = await axiosOptions.post('/signup', {name, password});
    if(response.data.status===200){
      userStore.setUser(response.data.name)
      return response.data.status
    }
  } catch (error) {
    console.log(error)
  }
}

export default registration
