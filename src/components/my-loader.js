/* globals AFRAME THREE */
import { NRRDLoader } from '../loader/NRRDLoader.js';

AFRAME.registerComponent('foo', {
    schema: {
      bar: {type: 'number'},
      baz: {type: 'string'}
    },
  
    init: function () {
      // Do something when component first attached.
      console.log("INIT FOO COMPONENT");
    },
  
    update: function () {
      // Do something when component's data is updated.
    },
  
    remove: function () {
      // Do something the component or its entity is detached.
    },
  
    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
  });