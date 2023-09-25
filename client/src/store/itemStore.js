import { makeAutoObservable } from 'mobx';

class ItemStore  {
  constructor (){
    makeAutoObservable(this)
  }
  
  items = [];
  item = [];
  userItems = [];
  editItem = [];
  message = '';
  userFavorite = [];
 
  setItem(items){
    this.items= items;
  }

  setItemOne(item){
    this.item = item;
  }

  setUserItems(items) {
    this.userItems = items;
  }

  setEditItem(item) {
    this.editItem = item;
  }

  setMessage(message) {
    this.message = message;
  }

  setUserFavorite(data) {
    this.userFavorite = data;
  }

};

const itemStore = new ItemStore();

export default itemStore;
