const { User, Goods, Favorite } = require('../models/models');

class itemController {
    async getAll (req, res) {
        try {
            if (req.cookies.accessToken) {
                const userId = req.cookies.accessToken.id;
                const fav = (await Favorite.findAll({where: {userId}})).map((e) => e.dataValues.goodId);
                const sortData = (await Goods.findAll({include: User})).map((e) => e = e.dataValues).sort((a, b) => b.id - a.id);
                sortData.map( el => fav.includes(el.id) ? Object.assign(el, {checkBox: true}) : Object.assign(el, {checkBox: false}));
                return res.json(sortData);
            }
            const sortData = (await Goods.findAll({include: User})).map((e) => e = e.dataValues).sort((a, b) => b.id - a.id);
            sortData.map(el => Object.assign(el, {checkBox: false}));
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
                return res.json({status: 404});
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
            res.cookie('updateId', {id: data.id}, {httpOnly: true,});
            return res.json(data);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ pageViewId ☢ error:', error);
        }
    }

    async pageViewIdAfterRefresh (req, res) {
        try {
            const item = (await Goods.findOne({where: {id: req.cookies.updateId.id}, include: User}, {include: User} )).dataValues;
            const user = item.user.dataValues;
            const data = Object.assign(item, {user});
            return res.json(data);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ pageViewIdAfterRefresh ☢ error:', error);
        }
    }

    async getAllUserItems (req, res) {
        try {
            const userId = req.cookies.accessToken.id;
            const sortData = (await Goods.findAll({where: {userId}, include: User}, {include: User})).map((e) => e = e.dataValues).sort((a, b) => b.id - a.id);
            if (sortData.length > 0) {
                const user = sortData[0].user.dataValues;
                const data = sortData.map((e) => Object.assign(e, {user}));
                const fav = (await Favorite.findAll({where: {userId}})).map((e) => e.dataValues.goodId);
                data.map( el => fav.includes(el.id) ? Object.assign(el, {checkBox: true}) : Object.assign(el, {checkBox: false}));
                return res.json(data);
            }
            return res.json({message: 'empty'});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ getAllUserItems ☢ error:', error);
        }
    }

    async deleteItem (req, res) {
        try {
            const { id } = req.body;
            await Goods.destroy({where: {id}});
            return res.json({message: 'deleted'});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ deleteItem ☢ error:', error);
        }
    }

    async editItem (req, res) {
        try {
            const { id } = req.body;
            const result = (await Goods.findOne({where: {id}})).dataValues;
            res.cookie('updateId', {id: result.id}, {httpOnly: true,});
            return res.json(result);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ editItem ☢ error:', error);
        }
    }

    async editItemRefresh (req, res) {
        try {
            const { id } = req.cookies.updateId;
            const result = (await Goods.findOne({where: {id}})).dataValues;
            return res.json(result);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ editItemRefresh ☢ error:', error);
        }
    }

    async saveChange (req, res) {
        try {
            const {name, description, price} = req.body;
            await Goods.update({name, description, price}, {where: {id: req.cookies.updateId.id}});
            const result = (await Goods.findOne({where: {id: req.cookies.updateId.id}, include: User}, {include: User})).dataValues;
            const user = result.user.dataValues;
            const data = Object.assign(result, {user});
            return res.json(data);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ saveChange ☢ error:', error);
        }
    }

    async checkFavorite (req, res) {
        try {
            const { id } = req.body;
            if(!req.cookies.accessToken) return res.json({message: 'user not found'});
            const checkFav = await Favorite.findOne({where: {userId: req.cookies.accessToken.id, goodId: id}});
            if (checkFav) {
                await Favorite.destroy({where: {userId: req.cookies.accessToken.id, goodId: id}});
                return res.json({status: 200, message: 'removed from favorites'});
            }
            await Favorite.create({userId: req.cookies.accessToken.id, goodId: id});
            return res.json({status: 200, message: 'added from favorites'});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ itemController ☢ checkFavorite ☢ error:', error);
        }
    }
};

module.exports = new itemController;