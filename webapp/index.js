import React from 'react';
import ReactDOM from 'react-dom';

import BucketApp from './BucketApp';

$(function () {
  ReactDOM.render(<BucketApp />, document.getElementById('bucket-app'))
});