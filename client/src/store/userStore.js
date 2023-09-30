import {makeAutoObservable} from "mobx"

 class UserStore {

  user = ''
  phone=""
  password=""
  img = ""
  error =""
  editProfile=[]


  constructor (){
    makeAutoObservable(this)
  }
setEditProfile(data){
  this.editProfile = data
}

  setUser (name){
    this.user=name
  }

  setImg (img) {
    this.img = img
  }
  setPhone (phone) {
    this.phone = phone
  }
  setPassword (password) {
    this.password = password
  }

  setError (error){
    this.error=error
  }
  
}
const userStore = new UserStore();

export default userStore
