/* globals AFRAME  */

var KEYS = [
    'KeyW', 'KeyA', 'KeyS', 'KeyD','KeyQ','KeyP',
    'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
  ];

AFRAME.registerComponent('render-2d-clipplane', {
	schema: {
    activateClipPlane: {type: 'boolean', default: false },
    xCLipPlaneMin: {type: 'number', default: 0 },
    xCLipPlaneMax: {type: 'number', default: 1 },
    yCLipPlaneMin: {type: 'number', default: 0 },
    yCLipPlaneMax: {type: 'number', default: 1 },
    zCLipPlaneMin: {type: 'number', default: 0 },
    zCLipPlaneMax: {type: 'number', default: 1 },
    currenAxisAngle:{type: 'vec3'},
    rotateAngle:{type: 'vec3'},
    clipX:{type: 'vec2'},
    clipY:{type: 'vec2'},
    clipZ:{type: 'vec2'}
    },
   
   init: function () {
        
           this.tempVec = {x:0,y:0,z:0};
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
    
    /*var xRot = this.data.xCLipPlaneRotation - this.oldRotation.x ;
    var yRot = this.data.yCLipPlaneRotation - this.oldRotation.y ;
    var zRot = this.data.zCLipPlaneRotation - this.oldRotation.z ;

    this.oldRotation.x = this.data.xCLipPlaneRotation;
    this.oldRotation.y = this.data.yCLipPlaneRotation;
    this.oldRotation.z = this.data.zCLipPlaneRotation;

    this.data.currentRotAngle = { x: xRot, y:yRot, z:zRot} ;*/

    //this.oldyRotation.y = this.data.yCLipPlaneRotation;
    //this.oldzRotation.z = this.data.zCLipPlaneRotation;

    
    //console.log("this.data.currentRotAngle:" +this.data.currentRotAngle.x + " " +this.data.currentRotAngle.y +" "+ this.data.currentRotAngle.z);
    

    //console.log(data.currentRotAngle);


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


    this.tempVec.x = this.data.xCLipPlaneRotation;
    this.tempVec.y = this.data.yCLipPlaneRotation;
    this.tempVec.z = this.data.zCLipPlaneRotation; 

    this.data.clipX = { x: this.data.xCLipPlaneMin, y:this.data.xCLipPlaneMax} ;
    this.data.clipY = { x: this.data.yCLipPlaneMin, y:this.data.yCLipPlaneMax} ;
    this.data.clipZ = { x: this.data.zCLipPlaneMin, y:this.data.zCLipPlaneMax} ;

    // I dont know why I have to save the current angle axis using a temporal variable. Maybe Aframe updates 
    // data on a asynchronous call
    this.data.currenAxisAngle.x = this.tempVec.x;
    this.data.currenAxisAngle.y = this.tempVec.y;
    this.data.currenAxisAngle.z = this.tempVec.z;
    
    //console.log("this.data.rotateAngle " + this.data.rotateAngle.x); 
    //console.log("this.data.currentRotAngle.x: " + this.data.currenAxisAngle.x);
    
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