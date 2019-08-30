
/* globals AFRAME THREE */
AFRAME.registerComponent("my-buttons-check", {
	 schema: {
		  clipPlane: {type: 'boolean', default: false }
      },
	
	
	init: function() {
		
	  this.el.addEventListener('gripdown', (evt) => {
		this.data.clipPlane = true;
		
	  });
	  
	  this.el.addEventListener('gripup', (evt) => {
		this.data.clipPlane = false;
	  });
	  
		
	},
	
});