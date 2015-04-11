'use strict';

import * as consts from './constants';
import {today, firstWeekDay} from './date-utils';

function makeSVGLine(x1, y1, width, dashed) {
  return '<line ' + 
      'x1="' + x1 + '" ' + 
      'y1="' + y1 + '" ' +
      'x2="' + (x1 + width) + '" ' +
      'y2="' + y1 + '" '+ 
      'style="stroke: #ccc; stroke-width:1px;' +
      (dashed ? ' stroke-dasharray: 1 3' : '') +
      '" />';
}

export function buildWeeklyView($, startDate) {
  var width = $.events.offsetWidth;
  var dayWidth = parseInt(width / 7);
  var space = consts.SPACE_BETWEEN_DAYS;
  var hourHeight = consts.HOUR_HEIGHT;
  var halfHourHeight = hourHeight / 2;
  var spaceHalf = space / 2;
  var svg = '';

  var svgOpen = '<svg '+
      'xmlns="http://www.w3.org/2000/svg" ' +
      'width="' + width + '" '+
      'height="' + hourHeight + '">';

  var svgClose = '</svg>';

  var svgCurrentDay = '';

  if (firstWeekDay().getTime() === startDate) {
    var currentDay = today().getDay(), rectX, rectW;

    if (currentDay === 0) {
      rectX = 0;
      rectW = dayWidth - spaceHalf;
    } else if (currentDay === 6) {
      rectX = (currentDay * dayWidth) + spaceHalf;
      rectW = dayWidth;
    } else {
      rectX = (currentDay * dayWidth) + spaceHalf;
      rectW = dayWidth - space;
    }

    svgCurrentDay = '<rect ' +
      'x="' + rectX + '" ' +
      'y="0" ' +
      'width="'+ rectW + '" ' +
      'height="50" ' +
      'style="fill:#E53935; fill-opacity:0.07;"/>';
  }

  svg += svgOpen;
  svg += makeSVGLine(0, hourHeight, dayWidth - spaceHalf);
  svg += makeSVGLine(0, halfHourHeight, dayWidth - spaceHalf, true);

  for (var i = 1; i < 6; i++) {
    svg += makeSVGLine((dayWidth * i) + spaceHalf, hourHeight, dayWidth - space);
    svg += makeSVGLine((dayWidth * i) + spaceHalf, halfHourHeight, dayWidth - space, true);
  }

  svg += makeSVGLine((dayWidth * 6) + spaceHalf , hourHeight, dayWidth);
  svg += makeSVGLine((dayWidth * 6) + spaceHalf , halfHourHeight, dayWidth, true);
  svg += svgCurrentDay;
  svg += svgClose;

  // grid
  $.events.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,' + svg + ' \')';

  // all day
  svg = svgOpen + svgCurrentDay + svgClose;

  $.allDay.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,' + svg + ' \')';
};