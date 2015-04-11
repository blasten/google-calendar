/*global document, window*/

'use strict';

var releaseEventFn = null;
var holdEventFn = null; 
var body = document.body;
var isTouchDevice = !!('ontouchstart' in window);

var PRESS_EVENT_NAME = (isTouchDevice) ? 'touchstart' : 'mousedown';
var HOLD_EVENT_NAME = (isTouchDevice) ? 'touchmove' : 'mousemove';
var RELEASE_EVENT_NAME = (isTouchDevice) ? 'touchend' : 'mouseup';

function pressEventHandler(event) {
  console.log('press');


  // add global event handlers

  removeGlobalEventHandlers();

  releaseEventFn = releaseEventHandler.bind(this);
  holdEventFn = holdEventHandler.bind(this);

  body.addEventListener(HOLD_EVENT_NAME, holdEventFn, false);
  body.addEventListener(RELEASE_EVENT_NAME, releaseEventFn, false);
}

function holdEventHandler(event) {
  console.log('hold');
}

function releaseEventHandler(event) {
  console.log('release');
  removeGlobalEventHandlers();
}

function removeGlobalEventHandlers() {
  if (holdEventFn) {
    body.removeEventListener(HOLD_EVENT_NAME, holdEventFn);
    holdEventFn = null;
  }
  if (releaseEventFn) {
    body.removeEventListener(RELEASE_EVENT_NAME, releaseEventFn);
    releaseEventFn = null;
  }
}

export default function setUpDragDrop() {
  var $ = this.$;
  $.events.addEventListener(PRESS_EVENT_NAME, pressEventHandler.bind(this), false);
}