import {makeAutoObservable} from "mobx"
// import axios from "axios"

 class UserStore {

  user = "ы"
  error =""

  constructor (){
    makeAutoObservable(this)
  }

  setUser (name){
    this.user=name
  }
  setError (error){
    this.error=error
  }
  
}
const userStore = new UserStore();

export default userStore
