'use strict';

export function div(innerHTML, className) {
  var div = document.createElement('div');
  div.className = className;
  div.innerHTML = innerHTML || '';
  return div;
};