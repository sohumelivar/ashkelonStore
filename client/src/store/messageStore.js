import { makeAutoObservable } from "mobx";

class MessageStore {
  constructor() {
    makeAutoObservable(this);
  }
  lastsMessages = [];

  messages=[]
  unreadMessage = null

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
  setUnreadMessage(unreadMessage) {
    this.unreadMessage = unreadMessage;
  }

}

const messageStore = new MessageStore();

export default messageStore;
