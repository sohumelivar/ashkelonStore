import { makeAutoObservable } from "mobx";

class MessageStore {
  constructor() {
    makeAutoObservable(this);
  }
  lastsMessages = [
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
      message: "верни деньги пидор",
      time: "21.01.2023, 11:00",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XhzLgCyL0Ct9q7tVfnKvMmcw-XNms4u5XQ&usqp=CAU",
    },
  ];

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

  setMessage(messages) {
    this.messages = messages;
  }
  setLastMessage(lastsMessages) {
    this.lastsMessages = lastsMessages;
  }
}

const messageStore = new MessageStore();

export default messageStore;
