const { Category, Goods, Favorite } = require('../models/models');

class CategoryController {
    async getMainCategory (req, res) {
        const getNumberOfProductsInCategory = async (categoryId) => {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return 0;
            }
            
            const productsInCategory = await Goods.count({
                where: { categoryId },
            });
            
            const children = await category.getChildren();
            let productsInSubcategories = 0;
            for (const child of children) {
                productsInSubcategories += await getNumberOfProductsInCategory(child.id);
            }
            
            return productsInCategory + productsInSubcategories;
        };
        try {

            const mainCategory = await Category.findAll({ where: { parentId: null } });
            const categoryInfo = await Promise.all(mainCategory.map(async (category) => {
                const productsCount = await getNumberOfProductsInCategory(category.id);
                return {
                  id: category.id,
                  name: category.name,
                  parentId: category.parentId,
                  itemsCount: productsCount,
                };
            }));
            res.json(categoryInfo);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getMainCategory ☢ error:', error);
        }
    }

    async getParentCategory (req, res) {
        try {
            const { id } = req.body;
            if ( !id ) return res.json({message: '!id'});
            const getNumberOfProductsInCategory = async (categoryId) => {
                const category = await Category.findByPk(categoryId);
                if (!category) {
                    return 0;
                }
                
                const productsInCategory = await Goods.count({
                    where: { categoryId },
                });
                
                const children = await category.getChildren();
                let productsInSubcategories = 0;
                for (const child of children) {
                    productsInSubcategories += await getNumberOfProductsInCategory(child.id);
                }
                
                return productsInCategory + productsInSubcategories;
            };
            const parentCategory = (await Category.findAll({where: { parentId: id }})).map( el => el.dataValues );
            const categoryInfo = await Promise.all(parentCategory.map(async (category) => {
                const productsCount = await getNumberOfProductsInCategory(category.id);
                return {
                  id: category.id,
                  name: category.name,
                  parentId: category.parentId,
                  itemsCount: productsCount,
                };
            }));
            res.json(categoryInfo);
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

    async getCatalogItems (req, res) {
        try {
            const { id } = req.body;
            const items = (await Goods.findAll({where: { categoryId: id }})).map( el => el.dataValues );
            const userId = req.cookies.accessToken.id;
            const fav = (await Favorite.findAll({where: {userId}})).map((e) => e.dataValues.goodId);
            items.map( el => fav.includes(el.id) ? Object.assign(el, {checkBox: true}) : Object.assign(el, {checkBox: false}));
            const result = JSON.parse(JSON.stringify(items));
            result.map(el => delete el.user?.password);
            return res.json(result);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getCatalogItems ☢ error:', error);
        }
    }

    async getAllItemsCatalog (req, res) {
        try {
            const { id } = req.body;
            async function getProductsInCategoryAndChildren(categoryId) {
                const category = await Category.findByPk(categoryId);
              
                if (!category) {
                  return [];
                }
              
                const productsInCategory = await Goods.findAll({
                  where: { categoryId },
                });
              
                const children = await category.getChildren();
                const productsInSubcategories = await Promise.all(children.map(child => getProductsInCategoryAndChildren(child.id)));
              
                return productsInCategory.concat(...productsInSubcategories);
            };
            const products = (await getProductsInCategoryAndChildren(id)).map( el => el.dataValues );

            const userId = req.cookies.accessToken.id;
            const fav = (await Favorite.findAll({where: {userId}})).map((e) => e.dataValues.goodId);
            products.map( el => fav.includes(el.id) ? Object.assign(el, {checkBox: true}) : Object.assign(el, {checkBox: false}));
            const result = JSON.parse(JSON.stringify(products));
            result.map(el => delete el.user?.password);
            return res.json(result);
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ CategoryController ☢ getAllItemsCatalog ☢ error:', error);
        }
    }
}

module.exports = new CategoryController();