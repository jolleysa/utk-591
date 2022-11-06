import React from 'react';
import './fit.css';
import logobj from './images/bj-jolley-new-logo2.png';

console.log(logobj);

function header() {
  return <img src={require(logobj).default}/>;
}

export default {header};


