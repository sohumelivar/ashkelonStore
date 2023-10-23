import './SelectCategories.css';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { getParentCategoryApi, getSelectCategoryApi, mainCategoryApi } from '../../../api/categoryApi';
import categoryStore from '../../../store/categoryStore';

const ButtonGroup = observer(() => {

  const selectCategoryBtn = async (e) => {
    try {
      const parentCategory = await getParentCategoryApi(e.target.id);
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ selectCategoryBtn ☢ parentCategory:', parentCategory)

      if(parentCategory.length === 0) {
        const finallyCategory = await getSelectCategoryApi(e.target.id);
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ selectCategoryBtn ☢ finallyCategory:', finallyCategory)
        categoryStore.setFinallyCategory(finallyCategory);
        categoryStore.setClassNameCategory(e.target.id);
        return;
      }
      const goBackCategory = categoryStore.category.find( el => el.id === Number(e.target.id));
      categoryStore.setParentCategory(goBackCategory);
      categoryStore.setMainCategory(categoryStore.category);
      categoryStore.setCategory(parentCategory);
      const finallyCategory = await getSelectCategoryApi(e.target.id);
      categoryStore.setNoFinally(finallyCategory);
      categoryStore.setFinallyCategory(parentCategory);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ selectCategoryBtn ☢ error:', error);
    }
  }

  const goBackCategorybtn = async (e) => {
    try {
      console.log('eeeeeeee TARGET !!!! -------------- >>> ', e.target.id);
      const result = await getParentCategoryApi(e.target.id);
      if (result.length === 0) {
        return;
      }
      const getSelectParentCategory = categoryStore.parentCategory.find( el => el.id === Number(e.target.id))
      const getIndexSelectParentCategory = categoryStore.parentCategory.findIndex( el => el.id === getSelectParentCategory.id); 
      categoryStore.setSliceParentCategory(getIndexSelectParentCategory);
      categoryStore.setCategory(result);
      categoryStore.setFinallyCategory([]);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ goBackCategorybtn ☢ error:', error);
    }
  }

  const allCategories = () => {
    const getMainCategory = mainCategoryApi();
    getMainCategory
        .then((category) => categoryStore.setCategory(category))
        .catch((err) => console.log(err));
    categoryStore.setResetParentCaregory();
    categoryStore.setFinallyCategory([]);
    categoryStore.setMainCategory([]);
    categoryStore.setCategory([]);
    categoryStore.setNoFinally([]);
  }

  return (
    <div className='mainContainerSelectCategory' >
      <div>
        select category
      </div>
      <div className='parentCategoryDiv'>
        {categoryStore.parentCategory && <p className='parentCategoryName' onClick={allCategories} >Все категории</p>}
      {categoryStore.parentCategory && categoryStore.parentCategory.map( (parentCategory) => (
        <p className='parentCategoryName' key={parentCategory.id} id={parentCategory.id} onClick={(e) => goBackCategorybtn(e)} >{`<--- ${parentCategory.name}`}</p> 
      ))}
      </div>
      <div className='mainSelectCategoryDiv'>
        {categoryStore.category && categoryStore.category.map((mainCategory) => (
          <button className={`selectCategoryBtn ${mainCategory.finnaly ? 'brightButton' : ''}`} key={mainCategory.id} id={mainCategory.id} onClick={(e) =>{selectCategoryBtn(e)}} >
              {mainCategory.name}
              {mainCategory.itemsCount && <span className="notification-badge">{mainCategory.itemsCount}</span>}
          </button>
        ))}
      </div>
    </div>
  )
})

export default ButtonGroup;
