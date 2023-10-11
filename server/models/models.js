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

module.exports = {
    User,
    Goods,
    Favorite,
    Message,
    Chat,
    Unread,
};
