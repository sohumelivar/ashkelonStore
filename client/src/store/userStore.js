import {makeAutoObservable} from "mobx"
import axios from "axios"

export default class UserStore {

  user = ""

  constructor (){
    makeAutoObservable(this)
  }

  setUser (name){
    this.user=name
  }
}
