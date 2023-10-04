import { makeAutoObservable } from "mobx";

class MessageStore {
  constructor() {
    makeAutoObservable(this);
  }
  lastsMessages = [];

  messages=[]

  responseMessage = null;

  setMessage(messages) {
    this.messages = messages;
  }
  setLastMessage(lastsMessages) {
    this.lastsMessages = lastsMessages;
  }

  setResponseMessage (responseMessage) {
    this.responseMessage = responseMessage
  }

}

const messageStore = new MessageStore();

export default messageStore;
