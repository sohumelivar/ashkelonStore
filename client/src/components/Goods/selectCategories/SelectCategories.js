import './SelectCategories.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { getParentCategoryApi, getSelectCategoryApi } from '../../../api/categoryApi';
import categoryStore from '../../../store/categoryStore';

const ButtonGroup = observer(() => {
  const toggleModal = () => {
    categoryStore.setIsModalVisible();
  };

  const selectCategoryBtn = async (e) => {
    try {
      const parentCategory = await getParentCategoryApi(e.target.id);
      if(parentCategory.length === 0) {
        const finallyCategory = await getSelectCategoryApi(e.target.id);
        categoryStore.setFinallyCategory(finallyCategory);
        categoryStore.setClassNameCategory(e.target.id);
        return console.log('null vishe');
      }
      const goBackCategory = categoryStore.category.find( el => el.id === Number(e.target.id));
      categoryStore.setParentCategory(goBackCategory);
      categoryStore.setMainCategory(categoryStore.category);
      categoryStore.setCategory(parentCategory);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ selectCategoryBtn ☢ error:', error);
    }
  }

  const goBackCategorybtn = async (e) => {
    try {
      const result = await getParentCategoryApi(e.target.id);
      if (result.length === 0) {
        return console.log('nolik');
      }
      const getSelectParentCategory = categoryStore.parentCategory.find( el => el.id === Number(e.target.id))
      const getIndexSelectParentCategory = categoryStore.parentCategory.findIndex( el => el.id === getSelectParentCategory.id); 
      categoryStore.setSliceParentCategory(getIndexSelectParentCategory);
      categoryStore.setCategory(result);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ goBackCategorybtn ☢ error:', error);
    }
  }

  return (
    <div className='mainContainerSelectCategory' >
      <div>
        select category
      </div>
      <div className='parentCategoryDiv'>
      {categoryStore.parentCategory && categoryStore.parentCategory.map( (parentCategory, index) => (
        index === 0 ? <p className='parentCategoryName' key={parentCategory.id} id={parentCategory.id} onClick={(e) => goBackCategorybtn(e)} >{parentCategory.name}</p> :
        <p className='parentCategoryName' key={parentCategory.id} id={parentCategory.id} onClick={(e) => goBackCategorybtn(e)} >{`<--- ${parentCategory.name}`}</p>
      ))}
      </div>
      <div className='mainSelectCategoryDiv'>
        {categoryStore.category && categoryStore.category.map((mainCategory) => (
          <button className={`selectCategoryBtn ${mainCategory.finnaly ? 'brightButton' : ''}`} key={mainCategory.id} id={mainCategory.id} onClick={(e) =>{selectCategoryBtn(e)}} >
              {mainCategory.name}
          </button>
        ))}
      </div>
      <div>
        <button onClick={toggleModal}>close</button>
      </div>
    </div>
  )
})

export default ButtonGroup;
