import {makeAutoObservable} from "mobx"
import axios from "axios"

export default class UserStore {

  user = "test"

  constructor (){
    makeAutoObservable(this)
  }
}
