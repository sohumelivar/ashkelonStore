const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    async registration (req, res) {
        try {
            const { name, password, phone } = req.body;
            if(!name) {
                return res.json({error: 'no nickname entered', status: 404})
            };
            if(!password) {
                return res.json({error: 'no password entered', status: 404})
            };
            if(!phone) {
                return res.json({error: 'no phone entered', status: 404})
            };
            const user = await User.findOne({where: {name}});
            if (user) return res.json({status: 404, error: 'name already exists'});
            const hashPassword = await bcrypt.hash(password, 5);
            const newUser = await User.create({name, password: hashPassword, phone});
            const accessToken = jwt.sign({name}, process.env.JWT_ACCESS_SECRET, {expiresIn:'3h'});
            res.cookie('accessToken', { accessToken, user: name, id: newUser.dataValues.id }, {maxAge: 30*24*60*1000, httpOnly: true,});
            return res.json({status: 200, accessToken, name});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ registration ☢ error:', error);
        }
    }
}

module.exports = new UserController();