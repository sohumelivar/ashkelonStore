const { Category } = require('../models/models');

class CategoryController {
    async getMainCategory (req, res) {
        try {
            const mainCategory = (await Category.findAll({where: {parentId: null}})).map( el => el.dataValues );
            res.json(mainCategory);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getMainCategory ☢ error:', error);
        }
    }

    async getParentCategory (req, res) {
        try {
            const { id } = req.body;
            if ( !id ) return res.json({message: '!id'});
            const parentCategory = (await Category.findAll({where: { parentId: id }})).map( el => el.dataValues );
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getParentCategory ☢ parentCategory:', parentCategory)
            res.json(parentCategory);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ parentCategory ☢ error:', error);
        }
    }

    async getSelectCagetory ( req, res) {
        try {
            const { id } = req.body;
            const selectCategory = (await Category.findOne({where: { id }})).dataValues;
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getSelectCagetory ☢ selectCategory:', selectCategory)

            res.json(selectCategory);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getSelectCagetory ☢ error:', error);
        }
    }
}

module.exports = new CategoryController();