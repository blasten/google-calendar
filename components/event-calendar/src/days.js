'use strict';

import {div} from './dom-utils';
import {today} from './date-utils';
import {WEEK_DAYS, DAY_MILLISECOND} from './constants';

export default function addDays($, startDate) {
  let todayTime = today().getTime();

  startDate = new Date(startDate);

  WEEK_DAYS.forEach( day => {
    let className = (todayTime === startDate.getTime()) ? 'current' : '';
    
    $.header.appendChild(div(day + ' ' + startDate.getDate(), className));
    startDate.setTime(startDate.getTime() + DAY_MILLISECOND);
  });
};