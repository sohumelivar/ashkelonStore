const { Category } = require('../models/models');

class CategoryController {
    async getMainCategory (req, res) {
        try {
            const mainCategory = (await Category.findAll({where: {parentId: null}})).map( el => el.dataValues );
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getMainCategory ☢ mainCategory:', mainCategory)

            res.json(mainCategory);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getMainCategory ☢ error:', error);
        }
    }
}

module.exports = new CategoryController();