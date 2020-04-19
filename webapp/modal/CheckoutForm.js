import React, { useState } from 'react';
import produce from 'immer';

const validationErrors = {
  name: name => !(name || '').trim()
  , email: email => !(email || '') || !/^.+@.+\..+$/.test(email)
}

const getValidationError = (form, field) => {
  if (validationErrors[field](form[field])) {
    return field;
  }
}

const initialForm = {
  name: '',
  email: 'remove@this.pls',
  comment: '',
  errors: {},
  valid: true
}

const validateForm = form => {
  const errors = Object.keys(validationErrors)
    .map(field => getValidationError(form, field))
    .filter(error => error);

  return produce(form, (draftForm) => {
    draftForm.errors = {};

    errors.forEach(field => {
      draftForm.errors[field] = true;
    });

    draftForm.valid = errors.length === 0;
  });
}

export default ({ id, totalItems, totalPrice, handleSubmit }) => {
  const [form, setForm] = useState(initialForm);

  const onChange = field => e => {
    const value = e.target.value;
    setForm(produce(form, draftForm => {
      draftForm[field] = value;
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const validatedForm = validateForm(form);
    setForm(validatedForm);
    if (validatedForm.valid) {
      handleSubmit(validatedForm);
    }
  }

  return (
    <div className='checkout-form'>
      <div className='checkout-form__description'>
        Fill the form below and we will contact you.
        <br /><strong>Total items:</strong> {totalItems}
        <br /><strong>Total price:</strong> {totalPrice}
        <br />
      </div>
      <form id={id} onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="checkout.name">Your name <span className='required'>(required)</span></label>
          <input
            type="text"
            id="checkout.name"
            className={`form-control ${form.errors.name ? 'is-invalid' : ''}`}
            placeholder="Your name"
            value={form.name}
            onChange={onChange('name')}
          />
          {form.errors.name && <div className="invalid-feedback">Please enter your name</div>}
        </div>
        <div className="form-group">
          <label htmlFor="checkout.email">E-mail address <span className='required'>(required)</span></label>
          <input
            type="email"
            id="checkout.email"
            className={`form-control ${form.errors.email ? 'is-invalid' : ''}`}
            placeholder="name@example.com"
            value={form.email}
            onChange={onChange('email')}
          />
          {form.errors.email && <div className="invalid-feedback">Please enter valid e-mail</div>}
        </div>
        <div className="form-group">
          <label htmlFor="checkout.comment">Comment</label>
          <textarea
            id="checkout.comment"
            className="form-control"
            rows="3"
            value={form.comment}
            onChange={onChange('comment')}
          />
        </div>
      </form>
    </div>
  )
}