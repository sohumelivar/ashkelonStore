import './SelectCategories.css';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

const ButtonGroup = observer(({ selectCategory }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  return (
    <div className='containerAddMainDiv'>
      {selectCategory && selectCategory.map((category) => (
        <div key={category.id} className='addMainCategoryDiv'>
          <button
            className={`selectAnotherCategory ${activeButton === category ? 'active' : ''}`}
            onClick={() => handleButtonClick(category)}
          >
            {category.name}
          </button>
        </div>
      ))}
    </div>
  );
})

export default ButtonGroup;
