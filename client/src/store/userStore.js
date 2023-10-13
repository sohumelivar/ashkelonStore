import {makeAutoObservable} from "mobx"

 class UserStore {

  user = ''
  phone = ''
  password = ''
  img = ''
  error = ''
  editProfile = []
  backLastMessage = null;


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

  setBackLastMessage (state) {
    this.backLastMessage = state;
  }
  
}
const userStore = new UserStore();

export default userStore
