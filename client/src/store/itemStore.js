import { makeAutoObservable } from 'mobx';

class ItemStore  {
  constructor (){
    makeAutoObservable(this)
  }
  
    items= [
      {
        id: 1,
        name: "Смартфон Samsung Galaxy S21",
        photo: "https://img.joomcdn.net/da48456c781efd83cc4bf8b6602f08820e0c8d8f_original.jpeg",
        description: "Мощный смартфон с высоким качеством камеры.",
        title: "Samsung Galaxy S21"
      },
      {
        id: 2,
        name: "Ноутбук MacBook Air",
        photo: "https://example.com/macbook-air.jpg",
        description: "Легкий и мощный ноутбук от Apple.",
        title: "MacBook Air"
      },
      {
        id: 3,
        name: "Наушники Sony WH-1000XM4",
        photo: "https://example.com/sony-wh-1000xm4.jpg",
        description: "Шумоподавляющие наушники с высоким качеством звука.",
        title: "Sony WH-1000XM4"
      },
      {
        id: 4,
        name: "Кофемашина De'Longhi",
        photo: "https://example.com/delonghi-coffee-machine.jpg",
        description: "Автоматическая кофемашина для приготовления вкусного кофе.",
        title: "De'Longhi Coffee Machine"
      },
      {
        id: 5,
        name: "Телевизор LG OLED55C1",
        photo: "https://example.com/lg-oled-tv.jpg",
        description: "4K OLED телевизор с потрясающим качеством изображения.",
        title: "LG OLED55C1"
      },
      {
        id: 6,
        name: "Фотоаппарат Canon EOS 90D",
        photo: "https://example.com/canon-eos-90d.jpg",
        description: "Зеркальный фотоаппарат с высоким разрешением.",
        title: "Canon EOS 90D"
      },
      {
        id: 7,
        name: "Геймпад Xbox Wireless Controller",
        photo: "https://example.com/xbox-controller.jpg",
        description: "Беспроводной геймпад для игр на Xbox и ПК.",
        title: "Xbox Wireless Controller"
      },
      {
        id: 8,
        name: "Скутер Xiaomi Mi Electric Scooter",
        photo: "https://example.com/xiaomi-scooter.jpg",
        description: "Электрический скутер для городских поездок.",
        title: "Xiaomi Mi Electric Scooter"
      },
      {
        id: 9,
        name: "Смарт-часы Apple Watch Series 6",
        photo: "https://example.com/apple-watch.jpg",
        description: "Современные смарт-часы от Apple с множеством функций.",
        title: "Apple Watch Series 6"
      },
      {
        id: 10,
        name: "Смарт-телевизор Samsung QLED Q90T",
        photo: "https://example.com/samsung-qled-tv.jpg",
        description: "4K QLED телевизор с ярким и четким изображением.",
        title: "Samsung QLED Q90T"
      }
    ]
   
setItem(items){
  this.items= items
}
};
const itemStore = new ItemStore()
export default itemStore;
