import { makeAutoObservable } from "mobx";

class MessageStore {
  constructor() {
    makeAutoObservable(this);
  }
  lastsMessages = [];

  messages=[ 
    {
      id:1,
      user: "scammer",
      userId:1,
      message: "перевод на карту",
      time: "21.01.2023, 10:00",
      photo:
        "https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png",
    },
    {
      id:2,
      user: "givi",
      userId:2,
      message: "перевод на карту",
      time: "21.01.2023, 10:00",
      photo:
        "https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png",
    },
    {
      id:3,
      user: "givi",
      userId:2,
      message: "где деньги на карту",
      time: "21.01.2023, 10:00",
      photo:
        "https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png",
    },
    {
      id:4,
      user: "scammer",
      userId:1,
      message: "не верну  на карту",
      time: "21.01.2023, 10:00",
      photo:
        "https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png",
    },
  ]

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
