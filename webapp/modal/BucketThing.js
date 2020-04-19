import React from 'react';
import { getTotalItemPrice } from '../util';

export default ({ thing, itemCtrls }) => {
  const onPlusClick = () => itemCtrls.addItem(thing.id);
  const onMinusClick = () => itemCtrls.removeItem(thing.id);
  const onInputChange = (e) => itemCtrls.setItem(thing.id, e.target.value);

  return (
    <div className='bucket-thing row'>
      <img className='bucket-thing__img' src={thing.img} />
      <div className='bucket-thing__name col'>{thing.name}</div>
      <div className='bucket-thing__price col-2'>{getTotalItemPrice(thing).toFixed(2)}</div>

      <div className='bucket-thing__ctrls'>
        <button className='btn bucket-thing__removeItem bucket-thing__ctrl' onClick={onMinusClick}>
          <span className='bucket-thing__ctrl__text'>-</span>
        </button>
        <input
          className='bucket-thing__count form-control'
          type="number"
          value={thing.count}
          onChange={onInputChange}
          max={999}
          maxLength={3}
        />
        <button className='btn bucket-thing__addItem bucket-thing__ctrl' onClick={onPlusClick}>
          <span className='bucket-thing__ctrl__text'>+</span>
        </button>
      </div>
    </div>
  );
}