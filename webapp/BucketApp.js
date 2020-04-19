import React, { useState, useReducer } from 'react';

import bucketAppReducer, { loadState } from './bucketListReducer';
import { getTotalListPrice } from './util';

import BucketList from './modal/BucketList';

const showModal = () => {
  $('#modal-bucket').modal('show')
}

const hideModal = () => {
  $('#modal-bucket').modal('hide')
}

const showAlertSuccess = () => $('#modal-bucket-success').addClass('app-alert--show')
const hideAlertSuccess = () => $('#modal-bucket-success').removeClass('app-alert--show')
const showAlertError = () => $('#modal-bucket-error').addClass('app-alert--show')
const hideAlertError = () => $('#modal-bucket-error').removeClass('app-alert--show')

const postData = (url = '', data = {}) => {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.json());
}

export default () => {
  const [isLoading, setLoading] = useState(false);
  const [{ bucketList, totalCount }, dispatch] = useReducer(bucketAppReducer, loadState());

  const itemCtrls = {
    addItem: (id) => dispatch({ type: 'addItem', data: { id } })
    , removeItem: (id) => dispatch({ type: 'removeItem', data: { id } })
    , setItem: (id, count) => dispatch({ type: 'setItem', data: { id, count } })
  }

  const clearItems = () => dispatch({ type: 'clearItems' })

  window.addItem = itemCtrls.addItem;

  const handleSubmit = (form) => {
    const data = {
      name: form.name
      , email: form.email
      , comment: form.comment
      , things: bucketList.map(thing => ({ id: thing.id, count: thing.count }))
      , total: getTotalListPrice(bucketList)
    }
    hideModal();
    clearItems();
    setLoading(true);

    postData('/mail', data)
      .then((response) => {
        setLoading(false);
        if (response.status === 'ok') {
          showAlertSuccess();
        } else {
          showAlertError();
        }
      });
  }

  if (!bucketList.length) {
    hideModal();
  }

  return (
    <>
      {totalCount && (
        <div className="bucket-preview od-fade-in">
          <button type="button" className="btn" onClick={showModal} disabled={isLoading}>
            <img className="bucket-preview__img" src="/static/img/bucket.svg" title="Bucket" />
            <div id="bucket-preview__count" className="bucket-preview__count">{totalCount < 10 ? totalCount : 'N'}</div>
          </button>
        </div>
      )}

      <BucketList
        onClose={hideModal}
        bucketList={bucketList}
        itemCtrls={itemCtrls}
        clearItems={clearItems}
        handleSubmit={handleSubmit}
      />
      <div
        id='modal-bucket-success'
        className="app-alert alert alert-success"
        role="alert"
        onClick={hideAlertSuccess}
      >
        Order sent!
      </div>
      <div
        id='modal-bucket-error'
        className="app-alert alert alert-danger"
        role="alert"
        onClick={hideAlertError}
      >
        Something went wrong. Please write us a e-mail with your order manually
      </div>
    </>
  )
}