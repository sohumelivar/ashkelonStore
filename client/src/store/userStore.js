import {makeAutoObservable} from "mobx"
// import axios from "axios"

 class UserStore {

  user = ""
  img = ""
  error =""

  constructor (){
    makeAutoObservable(this)
  }

  setUser (name){
    this.user=name
  }

  setImg (img) {
    this.img = img
  }

  setError (error){
    this.error=error
  }
  
}
const userStore = new UserStore();

export default userStore
