'use strict';

import {div} from './dom-utils';

export default function addHours($) {
  var el;

  $.hours.appendChild(div());

  for (var hour = 1; hour < 12; hour++) {
    $.hours.appendChild(div(hour + ' AM'));
  }
  $.hours.appendChild(div('Noon'));
  
  for (var hour = 1; hour < 12; hour++) {
    $.hours.appendChild(div(hour + ' PM'));
  }
};
