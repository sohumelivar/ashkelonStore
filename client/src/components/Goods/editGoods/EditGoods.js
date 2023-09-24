import React from 'react';
import { observer } from 'mobx-react-lite';
import itemStore from '../../../store/itemStore';

const editGood = observer(() => {
    return (
        <div>
            <div>edit</div>
            <div>{itemStore.editItem.name}</div>
        </div>
    )
});

export default editGood;