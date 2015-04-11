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
    buildWeeklyView(this.$, this.startDate);
    addHours(this.$);
    addDays(this.$, this.startDate);
  }
});