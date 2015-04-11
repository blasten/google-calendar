/*global Polymer*/

'use strict';

import {buildWeeklyView} from './grid';
import addHours from './hours';
import addDays from './days';
import {firstWeekDay} from './date-utils';

export default Polymer({
  publish: {
    startDate: firstWeekDay().getTime(),
    view: 'weekly'
  },

  ready: function() {
    buildWeeklyView.call(this);
    addHours.call(this);
    addDays.call(this);

    // defer
    require.ensure(['./drag-drop'], (require => {
      let setUpDragDrop = require('./drag-drop');

      setUpDragDrop.call(this);
    }).bind(this));
  }
});