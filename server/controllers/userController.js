const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

class UserController {
    async registration (req, res) {
        try {
            const { name, password, phone } = req.body;

            if(!name) return res.json({error: 'no nickname entered', status: 404});
            if(!password) return res.json({error: 'no password entered', status: 404});
            if(!phone) return res.json({error: 'no phone entered', status: 404});

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

    async addPhoto (req, res) {
        try {
            if (req.file) {
                const filePath = 'http://localhost:5000/'+ req.file.path;
                await User.update({img: filePath}, {where: {name: req.file.originalname}});
                return res.json(filePath);
            } else {
                res.json({status: 404});
            }
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ addPhoto ☢ error:', error);
        }
    }

    async login (req, res) {
        try {
            const { name, password } = req.body;

            if(!name) return res.json({error: 'no nickname entered', status: 404});
            if(!password) return res.json({error: 'no password entered', status: 404});

            const user = await User.findOne({where: {name}});
            if (!user) return res.json({status: 404, error: 'user is not found'});

            const comparePassword = await bcrypt.compare(password, user.password);
            if(!comparePassword) return res.json({status: 404, error: 'wrong login or password'});

            const accessToken = jwt.sign({name}, process.env.JWT_ACCESS_SECRET, {expiresIn:'3h'});

            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ login ☢ name:', name)


            res.cookie('accessToken', {accessToken, user: name, id: user.id},{maxAge: 30*24*60*1000, httpOnly: true,});
            return res.json({status: 200, accessToken, name, id: user.id });
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ login ☢ error:', error);
        }
    }

    async logout (req, res) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('updateId');
            return res.json({status: 200, user: ''});
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ logout ☢ error:', error);
        }
    }

    async checkUser (req, res) {
        try {
            if (req.cookies.accessToken) {
                const name = req.cookies.accessToken.user;
                const result = await User.findOne({where: {name}})
                return res.json({name: result.dataValues.name, id: result.dataValues.id, img: result.dataValues.img});
            } else {
                return res.json({name: ''});
            }
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ checkUser ☢ error:', error);
        }
    }

    async getUserProfile(req,res){
      try {
        const result = (await User.findOne({where:{name:req.cookies.accessToken.user}})).dataValues
        res.json(result)
      } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ getUserProfile ☢ error:', error);

      }
    }

    async safeChanges(req,res){
      try {
        const {name,phone,password} = req.body.data
        if(password){
          const hashPassword = await bcrypt.hash(password, 5);
          await User.update({password:hashPassword},{where:{id:req.cookies.accessToken.id}})
        }
        await User.update({name,phone},{where:{id:req.cookies.accessToken.id}})
        const result =  (await User.findOne({where:{id:req.cookies.accessToken.id}})).dataValues
        const accessToken = jwt.sign({name}, process.env.JWT_ACCESS_SECRET, {expiresIn:'3h'});
        res.cookie("accessToken",{accessToken,user:result.name,id:result.id},{maxAge:30*24*60*1000,httpOnly:true})
        res.json(result)
        
      } catch (error) {
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ safeChanges ☢ error:', error);

      }
    }
    
    // async testIp (req, res) {
    //     try {
    //         const { ip } = req.body;
    //         console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ testIp ☢ ip:', ip)


    //         res.json('test')
    //     } catch (error) {
    //         console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ UserController ☢ testIp ☢ error:', error);
    //     }
    // }
    
}

module.exports = new UserController();
