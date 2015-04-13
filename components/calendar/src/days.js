'use strict';

import {div} from './dom-utils';
import {today} from './date-utils';
import {WEEK_DAYS, DAY_MILLISECOND} from './constants';

export default function addDays() {
  var $ = this.$;
  var startDate = new Date(this.start);
  var todayTime = today().getTime();

  WEEK_DAYS.forEach( day => {
    let className = (todayTime === startDate.getTime()) ? 'current' : '';
    
    $.header.appendChild(div(day + ' ' + startDate.getDate(), className));
    startDate.setTime(startDate.getTime() + DAY_MILLISECOND);
  });
};