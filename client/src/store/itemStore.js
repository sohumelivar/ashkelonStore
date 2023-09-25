import { makeAutoObservable } from 'mobx';

class ItemStore  {
  constructor (){
    makeAutoObservable(this)
  }
  
  items = [];
  item = [];
  userItems = [];
  editItem = [];

  //  items = [
  //   {
  //     id: 1,
  //     name: "Смартфон Samsung Galaxy S21",
  //     img: "https://img.joomcdn.net/da48456c781efd83cc4bf8b6602f08820e0c8d8f_original.jpeg",
  //     description: "Мощный смартфон с высоким качеством камеры.",
  //     title: "Samsung Galaxy S21",
  //     price: 799,
  //     contactPerson: "Иван Иванов",
  //     phoneNumber: "+7 (123) 456-7890"
  //   },
  //   {
  //     id: 2,
  //     name: "Ноутбук MacBook Air",
  //     photo: "https://example.com/macbook-air.jpg",
  //     description: "Легкий и мощный ноутбук от Apple.",
  //     title: "MacBook Air",
  //     price: 1299,
  //     contactPerson: "Анна Смирнова",
  //     phoneNumber: "+7 (987) 654-3210"
  //   },
  //   {
  //     id: 3,
  //     name: "Наушники Sony WH-1000XM4",
  //     photo: "https://example.com/sony-wh-1000xm4.jpg",
  //     description: "Шумоподавляющие наушники с высоким качеством звука.",
  //     title: "Sony WH-1000XM4",
  //     price: 349,
  //     contactPerson: "Петр Козлов",
  //     phoneNumber: "+7 (555) 123-4567"
  //   },
  //   {
  //     id: 4,
  //     name: "Кофемашина De'Longhi",
  //     photo: "https://example.com/delonghi-coffee-machine.jpg",
  //     description: "Автоматическая кофемашина для приготовления вкусного кофе.",
  //     title: "De'Longhi Coffee Machine",
  //     price: 449,
  //     contactPerson: "Елена Петрова",
  //     phoneNumber: "+7 (777) 987-6543"
  //   },
  //   {
  //     id: 5,
  //     name: "Телевизор LG OLED55C1",
  //     photo: "https://example.com/lg-oled-tv.jpg",
  //     description: "4K OLED телевизор с потрясающим качеством изображения.",
  //     title: "LG OLED55C1",
  //     price: 1399,
  //     contactPerson: "Алексей Игнатьев",
  //     phoneNumber: "+7 (333) 555-7890"
  //   },
  //   {
  //     id: 6,
  //     name: "Фотоаппарат Canon EOS 90D",
  //     photo: "https://example.com/canon-eos-90d.jpg",
  //     description: "Зеркальный фотоаппарат с высоким разрешением.",
  //     title: "Canon EOS 90D",
  //     price: 999,
  //     contactPerson: "Марина Сидорова",
  //     phoneNumber: "+7 (123) 789-4560"
  //   },
  //   {
  //     id: 7,
  //     name: "Геймпад Xbox Wireless Controller",
  //     photo: "https://example.com/xbox-controller.jpg",
  //     description: "Беспроводной геймпад для игр на Xbox и ПК.",
  //     title: "Xbox Wireless Controller",
  //     price: 49,
  //     contactPerson: "Дмитрий Кузнецов",
  //     phoneNumber: "+7 (777) 654-1234"
  //   },
  //   {
  //     id: 8,
  //     name: "Скутер Xiaomi Mi Electric Scooter",
  //     photo: "https://example.com/xiaomi-scooter.jpg",
  //     description: "Электрический скутер для городских поездок.",
  //     title: "Xiaomi Mi Electric Scooter",
  //     price: 399,
  //     contactPerson: "Ольга Васильева",
  //     phoneNumber: "+7 (555) 789-0123"
  //   },
  //   {
  //     id: 9,
  //     name: "Смарт-часы Apple Watch Series 6",
  //     photo: "https://example.com/apple-watch.jpg",
  //     description: "Современные смарт-часы от Apple с множеством функций.",
  //     title: "Apple Watch Series 6",
  //     price: 349,
  //     contactPerson: "Андрей Морозов",
  //     phoneNumber: "+7 (987) 321-6540"
  //   },
  //   {
  //     id: 10,
  //     name: "Смарт-телевизор Samsung QLED Q90T",
  //     photo: "https://example.com/samsung-qled-tv.jpg",
  //     description: "4K QLED телевизор с ярким и четким изображением.",
  //     title: "Samsung QLED Q90T",
  //     price: 1599,
  //     contactPerson: "Екатерина Соловьева",
  //     phoneNumber: "+7 (123) 789-0123"
  //   }
  // ];
  
  
   
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

};

const itemStore = new ItemStore();

export default itemStore;
