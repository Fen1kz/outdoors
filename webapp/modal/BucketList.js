import React, { useState } from 'react';
import BucketThing from './BucketThing';
import BucketModal from './BucketModal';

import { getItemCount, getTotalListPrice } from '../util';
import CheckoutForm from './CheckoutForm';

export default ({
  bucketList,
  handleSubmit,
  itemCtrls,
  clearItems,
  onClose
}) => {
  const [stage, setStage] = useState(0);
  const totalItems = bucketList.reduce((acc, item) => acc + getItemCount(item), 0);
  const totalPrice = getTotalListPrice(bucketList);
  const Stages = [
    {
      footer: (
        <>
          <button type="button" className="btn" onClick={clearItems}>Clear All</button>
          <button type="button" className="btn btn-primary" onClick={() => setStage(1)}>To checkout</button>
        </>
      )
      , content: (
        <>
          <div id="bucket-list" className="bucket-list">
            {bucketList.map(thing => (
              <BucketThing
                key={thing.id}
                thing={thing}
                itemCtrls={itemCtrls}
              />
            ))}
          </div>
          <div className="bucket-list__total h3">Total: {totalPrice}</div>
        </>
      )
    }
    , {
      footer: (
        <>
          <button type="button" className="btn" onClick={() => setStage(0)}>Back</button>
          <button key='submit' form='checkout-form' type="submit" className="btn btn-primary">Order</button>
        </>
      )
      , content: (
        <CheckoutForm
          id='checkout-form'
          totalItems={totalItems}
          totalPrice={totalPrice}
          handleSubmit={handleSubmit}
        />
      )
    }
  ];

  return (
    <BucketModal
      onClose={onClose}
      title={Stages[stage].title || 'Your order'}
      footer={Stages[stage].footer}
    >
      {Stages[stage].content}
    </BucketModal >
  );
}
