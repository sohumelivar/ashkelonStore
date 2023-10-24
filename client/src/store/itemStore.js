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
  itemVisible = false;
 
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

  setItemVisible () {
    this.itemVisible = !this.itemVisible;
  }

};

const itemStore = new ItemStore();

export default itemStore;
