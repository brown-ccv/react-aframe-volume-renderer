/* globals AFRAME THREE */

var KEYS = [
    'KeyW', 'KeyA', 'KeyS', 'KeyD','KeyQ','KeyP',
    'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
  ];

AFRAME.registerComponent('render-2d-clipplane', {
	schema: {
    activateClipPlane: {type: 'boolean', default: false },
    xCLipPlaneRotation: {type: 'number', default: 0.0 },
    currentRotAngle:{type: 'vec3'}
    },
   
   init: function () {
        
           this.oldxRotation =0.0;
           this.currentRotation = 0.0;
		       this.active = false;
           this.rendererPlane = false;
           this.keys ={};
           
           this.onKeyDown = this.onKeyDown.bind(this);
           this.onKeyUp = this.onKeyUp.bind(this);
           this.activate2DClipPlane = this.activate2DClipPlane.bind(this);
		   
		   
           window.addEventListener('keydown', this.onKeyDown);
           window.addEventListener('keyup', this.onKeyUp);
		   
           
   },

   update: function () {
    var data = this.data;  // Component property values.
    var el = this.el;  // Reference to the component's entity.
 
    this.currentRotation =  data.xCLipPlaneRotation - this.xRotation ;
    /*if (data.event) {
      // This will log the `message` when the entity emits the `event`.
      el.addEventListener(data.event, function () {
        console.log(data.message);
      });
    } else {
      // `event` not specified, just log the message.
      console.log(data.message);
    }*/
  },
   
   tick: function (time, timeDelta) {
		 
		 if(this.keys.KeyQ && !this.active)
		 {
			this.active = true;
		 }
		 if(this.keys.KeyS && this.active)
		 {
			this.active = false;
		 }

     if(this.active && !this.rendererPlane){
			
			this.data.activateClipPlane = true;
			this.rendererPlane = true;
		 }
		 
		 if(!this.active && this.rendererPlane){
			
			this.data.activateClipPlane = false;
			this.rendererPlane = false;
		 }
       
   },
   
   remove: function () {
    this.removeEventListeners();
   },
   
  onKeyDown: function (event) {
   var code = event.code;
   if (this.isVrModeOn) 
   { 
     return; 
   }
   if (KEYS.indexOf(code) !== -1) 
   { 
    this.keys[code] = true; 
   }
   
   
 },

 onKeyUp: function (event) {
   
   var code = event.code;
   delete this.keys[code];
 },

 
 activate2DClipPlane : function (event) {
     this.data.isActive = false;
 },
 
 removeEventListeners: function () {
   window.removeEventListener('keydown', this.onKeydown);
   window.removeEventListener('keyup', this.onKeyUp);

  
 }
});	