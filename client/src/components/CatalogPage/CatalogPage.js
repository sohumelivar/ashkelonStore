import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import './CatalogPage.css';
import SelectCategory from '../Goods/selectCategories/SelectCategories';
import { mainCategoryApi, searchCatalogItemsApi, searchAllItemsCatalogApi } from '../../api/categoryApi';
import categoryStore from '../../store/categoryStore';
import ItemStore from '../../store/itemStore';
import Item from '../MainPage/Item';
import itemStore from '../../store/itemStore';
import { getAllGoods } from '../../api/goodApi';

const CatalogPage = observer(() => {

    useEffect(() => {
        const getMainCategory = mainCategoryApi();
        getMainCategory
            .then((category) => categoryStore.setCategory(category))
            .catch((err) => console.log(err))
        getAllGoods();
        return () => {
            categoryStore.setFinallyCategory([]);
            categoryStore.setMainCategory([]);
            categoryStore.setCategory([]);
            categoryStore.setResetParentCaregory();
            itemStore.setItem([]);
            categoryStore.setNoFinally([]);
        }
    }, []);

    const searchBtn = async () => {
        try {
            if (!categoryStore.finallyCategory.id) {
                const result = await searchAllItemsCatalogApi(categoryStore.noFinally.id);
                if (!result.length) {
                    const result = await getAllGoods();
                    return itemStore.setItem(result);
                }
                return itemStore.setItem(result);
            }
            const result = searchCatalogItemsApi(categoryStore.finallyCategory.id);
            result
                .then((items) => itemStore.setItem(items))
                .catch((err) => console.log(err));
        } catch (error) {
            console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ searchBtn ☢ error:', error)
        }
    }

    return (
        <div className='containerCatalog'>
            <SelectCategory />
            <button onClick={searchBtn} className='searchBtnCatalog'>SEARCH</button>
            <div className='cardDiv'>
            {ItemStore.items.map((item) => (
            <Item key={item.id} itemData={item} />
            ))}
      </div>
        </div>
    )
});

export default CatalogPage;