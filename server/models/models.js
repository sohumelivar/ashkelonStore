const sequelize = require('../db');
const { DataTypes, STRING } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
});

const Goods = sequelize.define('goods', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING},
    description : { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
});

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    parentId: { type: DataTypes.INTEGER },
});

const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message: { type: DataTypes.STRING },
    from: { type: DataTypes.INTEGER },
    to: { type: DataTypes.INTEGER },
    time: { type: DataTypes.STRING },
})

const Chat = sequelize.define('chat', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Unread = sequelize.define('unread', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    counter: { type: DataTypes.INTEGER, defaultValue: 0 },
    from: { type: DataTypes.INTEGER},
})

const realEstate = async () => {
    try {

//         // ! -------------------------------------------------------------------------- //
//         const realEstateCategory = await Category.create({ name: 'Для дома' });

//             const rentCategory = await Category.create({ name: 'Аренда', parentId: realEstateCategory.id });

    //         const saleCategory = await Category.findAll({ where: { name: 'Продажа' }});
    // const commercialRealEstateCategory = await Category.create({ name: 'Комерческая недвижимост', parentId: saleCategory.id });
//         // ! -------------------------------------------------------------------------- //

//         // ! -------------------------------------------------------------------------- //
        // const carCategory = await Category.create({ name: 'Офисы', parentId: 35 });
        // const carCategory2 = await Category.create({ name: 'Кафе', parentId: 35 });

//             const nameCarCategory = await Category.create({ name: 'Автомобили', parentId: carCategory.id });
//             const bikeCarCategory = await Category.create({ name: 'Мотоциклы', parentId: carCategory.id });
//             const otherTypesCategory = await Category.create({ name: 'Другой транспорт', parentId: carCategory.id });

//         // ! -------------------------------------------------------------------------- //




//         const workCategory = await Category.create({ name: 'Работа' });

//         const clothesShoesAccessoriesCategory = await Category.create({ name: 'Одежда, обувь, аксессуары' });

//         const enimalsCategory = await Category.create({ name: 'Животные' });

    } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ realEstate ☢ error:', error);
    }
}
realEstate();



User.belongsToMany(User, {
    through: Chat,
    as: 'Chats',
    foreignKey: 'user1Id',
    otherKey: 'user2Id',
});
User.hasMany(Goods);
Goods.belongsTo(User);
User.hasMany(Favorite);
Goods.hasMany(Favorite);
Favorite.belongsTo(User);
Favorite.belongsTo(Goods);
Chat.belongsTo(User, { foreignKey: 'user1Id', as: 'user1' });
Chat.belongsTo(User, { foreignKey: 'user2Id', as: 'user2' });
Message.belongsTo(Chat);
Message.belongsTo(User, {
    foreignKey: 'from',
    as: 'sender',
  });
Message.belongsTo(User, {
foreignKey: 'to',
as: 'receiver',
});  
Unread.hasMany(User);
User.hasMany(Unread);
Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
Goods.belongsTo(Category);
Category.hasMany(Goods);

module.exports = {
    User,
    Goods,
    Favorite,
    Message,
    Chat,
    Unread,
    Category,
};


// у меня есть таблицы : 
// const User = sequelize.define('user', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     phone: { type: DataTypes.STRING, allowNull: false },
//     img: { type: DataTypes.STRING },
// });

// const Goods = sequelize.define('goods', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING},
//     description : { type: DataTypes.STRING },
//     price: { type: DataTypes.STRING },
//     img: { type: DataTypes.STRING },
// });

// const Category = sequelize.define('category', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING },
//     parentId: { type: DataTypes.INTEGER },
//   });

//   с такими связями :

//   Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
// Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
// Goods.belongsTo(Category);
// Category.hasMany(Goods);
// User.hasMany(Goods);
// Goods.belongsTo(User);

// я создал категории , Для дома, продажа и аренда связанные с категорией Для дома по id. есть еще подкатегории, Комерческая недвижимость и Квартиры связанные с категорией Продажа по id.
// в данной цепочке, иерархия данных подкатегорий будет следующая, Для дома > Продажа > Комерческая недвижимость > созданный товар.

// я создаю товар, у которого будет в categoryId будет id Комерческая недвижимость. 
// как мне в дальнейшем через запрос доставать инфорацию по категориям 
