const { User, Goods, Favorite } = require('../models/models');

class itemController {
    async getAll (req, res) {
        try {
            const sortData = (await Goods.findAll({include: User})).map((e) => e = e.dataValues).sort((a, b) => b.id - a.id);
            return res.json(sortData);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ getAll ☢ error:', error);
        }
    }

    async addGood (req, res) {
        try {
            const {name, description, price} = req.body;
            const result = await Goods.create({name, description, price, userId: req.cookies.accessToken.id});
            return res.json({message: 'good created', id: result.dataValues.id});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ addGood ☢ error:', error);
        }
    }

    async addImg (req, res) {
        try {
            if (req.file) {
                const filePath = 'http://localhost:5000/' + req.file.path;
                await Goods.update({img: filePath}, {where: {id: req.file.originalname}});
                return res.json({message: 'image updated'});
            } else {
                res.json({status: 404});
            }
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ addImg ☢ error:', error);
        }
    }

    async pageViewId (req, res) {
        try {
            const { goodId } = req.body;
            const item = (await Goods.findOne({where: {id: goodId}, include: User}, {include: User} )).dataValues;
            const user = item.user.dataValues;
            delete user.password;
            const data = Object.assign(item, {user});
            res.cookie('updateId', {id: data.id}, {httpOnly: true,})
            return res.json(data);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ pageViewId ☢ error:', error);
        }
    }

    async pageViewIdAfterRefresh (req, res) {
        try {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ pageViewIdAfterRefresh ☢ req.cookies.updateId:', req.cookies.updateId);
            const item = (await Goods.findOne({where: {id: req.cookies.updateId.id}, include: User}, {include: User} )).dataValues;
            const user = item.user.dataValues;
            const data = Object.assign(item, {user});
            return res.json(data);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ pageViewIdAfterRefresh ☢ error:', error);
        }
    }
};

module.exports = new itemController;