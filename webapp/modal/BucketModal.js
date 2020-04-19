import React from 'react';

export const BucketModalId = 'bucket-modal';

export default ({ title, children, footer, onClose }) => (
  <div
    id='modal-bucket'
    className='modal-bucket react-modal modal fade'
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-bucket__dialog modal-lg" role="document">
      <div className="modal-content modal-bucket__content" id='modal-bucket-content'>
        <div className="modal-header">
          <h5 className="modal-title bucket__title" id="modalBucketLabel">{title}</h5>
          <button type="button" className="close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body modal-bucket__body">
          {children}
        </div>
        <div className="modal-footer">
          {footer}
        </div>
      </div>
    </div>
  </div>
);