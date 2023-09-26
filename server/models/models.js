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

User.hasMany(Goods);
Goods.belongsTo(User);
User.hasMany(Favorite);
Goods.hasMany(Favorite);
Favorite.belongsTo(User);
Favorite.belongsTo(Goods);

module.exports = {
    User,
    Goods,
    Favorite,
};