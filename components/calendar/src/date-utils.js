'use strict';

import {DAY_MILLISECOND} from './constants';

export function today() {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

export function firstWeekDay(date) {
  date = date || today();
  date.setTime(date.getTime() - (date.getDay() * DAY_MILLISECOND));
  return date;
};

export function now() {
  return Date.now();
};