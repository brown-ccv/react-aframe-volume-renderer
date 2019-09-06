/* globals AFRAME THREE */
import { NRRDLoader } from '../loader/NRRDLoader.js';
import '../shaders/ccvLibVolumeShader.js'

var KEYS = [
    'KeyW', 'KeyA', 'KeyS', 'KeyD','KeyQ',
    'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
  ];

AFRAME.registerComponent('ccvclipplane', {
	
    schema: {
         isActive: {type: 'boolean', default: true },
         
    },
   
   init: function () {
           
           //console.log("Init clip plane");
           this.isVrModeOn = false;
           this.keys ={};
           
           this.onKeyDown = this.onKeyDown.bind(this);
           this.onKeyUp = this.onKeyUp.bind(this);
           this.activate2DClipPlane = this.activate2DClipPlane.bind(this);
           
           window.addEventListener('keydown', this.onKeyDown);
           window.addEventListener('keyup', this.onKeyUp);
           
           
           this.el.addEventListener('enter-vr', function () {
               this.isVrModeOn = true;
           });
           
           this.el.addEventListener('exit-vr', function () {
              this.isVrModeOn = false;
           });
           
   },
   
   tick: function (time, timeDelta) {
        
          if (this.keys.KeyA )
          {
              //this.el.object3D.rotateX(0.0174533); // 1 radian
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


AFRAME.registerComponent('move-cube', {
	
    schema: {
         
         
    },
   
   init: function () {
           
		   console.log("Init Move Cube");
		   this.active = false;
           this.isVrModeOn = false;
           this.keys ={};
           this.mySpeed = 0.1;
           this.onKeyDown = this.onKeyDown.bind(this);
           this.onKeyUp = this.onKeyUp.bind(this);
           this.activate2DClipPlane = this.activate2DClipPlane.bind(this);
           
           window.addEventListener('keydown', this.onKeyDown);
           window.addEventListener('keyup', this.onKeyUp);
           
           
           this.el.addEventListener('enter-vr', function () {
               this.isVrModeOn = true;
           });
           
           this.el.addEventListener('exit-vr', function () {
              this.isVrModeOn = false;
           });
           
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

         if(this.active){
		   this.el.object3D.translateX(0.0035);
		   this.el.object3D.translateY(0.0025);
		 }




          /*if ( this.keys.ArrowLeft)
          {
			console.log("this.keys.ArrowLeft1");
			  var pos = this.el.object3D.position;
			  pos.x = timeDelta * this.mySpeedy - pos.x;
			  //this.el.object3D.position.set(pos); 
			  this.el.object3D.translateX(-0.001);
			  console.log("this.keys.ArrowLeft2");
		  }
		  if( this.keys.ArrowRight)
		  {
			console.log("this.keys.ArrowRight1");
			var pos = this.el.object3D.position;
			pos.x = timeDelta * this.mySpeed + pos.x;
			this.el.object3D.translateX(0.001);
			console.log("this.keys.ArrowRight2");
		  }
		  if( this.keys.ArrowUp)
		  {
			console.log("this.keys.ArrowUp1");
			var pos = this.el.object3D.position;
			pos.y = timeDelta * this.mySpeed + pos.y;
			//this.el.object3D.position.set(pos); 
			this.el.object3D.translateY(0.001);
			console.log("this.keys.ArrowUp2");
		  }	
		  if( this.keys.ArrowDown)
		  {
			console.log("this.keys.ArrowDown1");
			var pos = this.el.object3D.position;
			pos.y = timeDelta * this.mySpeed - pos.y;
			//this.el.object3D.position.set(pos); 
			this.el.object3D.translateY(-0.001);
			console.log("this.keys.ArrowDown2");
		  }*/
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


/*AFRAME.registerComponent('move-cube', {
	
    schema: {
         
         
	},
	
	init: function () {


	},

});	*/


AFRAME.registerComponent('collider-check', {
	dependencies: ['raycaster'],
	dependencies: ['my-buttons-check'],
	
	schema: {
		intersecting: {type: 'boolean', default: false },
	},

	init: function () {
		
		this.onCollide = this.onCollide.bind(this);
		this.el.addEventListener('raycaster-intersection', this.onCollide);
	},

	onCollide: function (event) {
		this.data.intersecting = true;
		//console.log("ENTITY COLLIDED");
	},

  });

  AFRAME.registerComponent('entity-collider-check', {
	
	schema: {
		intersected: {type: 'boolean', default: false },
	},

	init: function () {
		
		this.onCollide = this.onCollide.bind(this);
		this.el.addEventListener('raycaster-intersected', this.onCollide);
	},

	onCollide: function (event) {
		this.data.intersected = true;
		console.log("entity-intesercted");
	},

  });

AFRAME.registerComponent('myloader', {
	
    schema: {
      volumeData: {type: 'string', default: 'Hello, World!'},
	  rayCollided: {type: 'boolean', default: false },
	  modelLoaded: {type: 'boolean', default: false},
    },

    init: function () {

		this.objectPose = new THREE.Matrix4();
		this.controllerPose = new THREE.Matrix4();
		this.onCollide = this.onCollide.bind(this);
		this.onClearCollide = this.onClearCollide.bind(this);
		this.el.addEventListener('raycaster-intersected', this.onCollide);
		this.el.addEventListener('raycaster-intersected-cleared', this.onClearCollide);
		
			
		    console.log("data: "+ this.data.volumeData);
			this.isVrModeOn = false;
			this.mySpeed = 0.1;
			
			this.sceneHandler = this.el.sceneEl;
			
			//var controllerPos = document.querySelector('[hand-controls=left]').getAttribute('position');
            this.controllerHandler = document.getElementById('rhand').object3D;//.getAttribute('my-buttons-check');
            var my2DclipPlane = document.getElementById('my2Dclipplane');
            if(my2DclipPlane != undefined)
            {
                this.my2DclipPlaneHandler = my2DclipPlane.object3D;
            }

			
			//console.log(this.controllerHandler.el.getAttribute('my-buttons-check').clipPlane);
			
			//console.log("this.controllerHandler.data.clipPlane: " + this.controllerHandler.data.clipPlane);
			
			var jet_values = [[0, 0, 0.5, 0],
			                  [0, 0, 1, 0.1],
							  [0, 0.5, 1, 0.3],
							  [0, 1, 1, 0.5],
							  [0.5, 1, 0.5, 0.75],
							  [1, 1, 0, 0.8],
							  [1, 0.5, 0, 0.6],
							  [1, 0, 0, 0.5],
							  [0.5, 0, 0, 0.0]
							 ];
			
			var m_dataLength = 0;
			var pData = [];
			var indices = [];
			var zeroArray = [0,0,0,0];
            
			for (var i = 0; i<9; i++) {
		        
                var index = i * 28;
				while( pData.length < index )
				{
					pData.push(zeroArray);
				}
                
                
		        pData.push( [jet_values[i][0] * 255 , jet_values[i][1] * 255, jet_values[i][2] * 255 , jet_values[i][3] * 255 ]);
		        indices.push(index);
		        
	        }

     	
			for (var j = 0; j<9 - 1; j++)
	        {
				
				var dDataR = (pData[indices[j + 1]][0] - pData[indices[j]][0]);
		        var dDataG = (pData[indices[j + 1]][1] - pData[indices[j]][1]);
		        var dDataB = (pData[indices[j + 1]][2] - pData[indices[j]][2]);
		        var dDataA = (pData[indices[j + 1]][3] - pData[indices[j]][3]);
		        var dIndex = indices[j + 1] - indices[j];
				
				var dDataIncR = dDataR / dIndex;
		        var dDataIncG = dDataG / dIndex;
		        var dDataIncB = dDataB / dIndex;
		        var dDataIncA = dDataA / dIndex;
				
				for (var idx = indices[j] + 1; idx<indices[j + 1]; idx++)
		        {
			       var myvector = [pData[idx - 1][0] + dDataIncR ,pData[idx - 1][1] + dDataIncG ,pData[idx - 1][2] + dDataIncB,pData[idx - 1][3] + dDataIncA ];
                   pData[idx] = myvector;
		        }
				
			}
			
			
            var newArr = [];
			for(var i = 0; i < pData.length; i++)
            {
              newArr = newArr.concat(pData[i]);
            }

		    var tranferData = new Uint8Array(newArr);
			var transferTexture = new THREE.DataTexture( tranferData, pData.length  , 1, THREE.RGBAFormat );
            transferTexture.needsUpdate = true 
			
			
		   console.log("INIT component myloader is "+ this.el);
		   var el = this.el;
		   var data = this.data; 
		   var dataPath = this.data.volumeData;
		   var myCanvas = this.el.sceneEl.canvas;
		   var myCanvasWidth = myCanvas.width;
		   var myCanvasHeight = myCanvas.height;
		   
		   this.printedLog = false;
		   
		   var volconfig = { clim1: 0, clim2: 1, renderstyle: 'iso', isothreshold: 0.15, colormap: 'viridis' };
		  
		  new NRRDLoader().load( this.data.volumeData, function ( volume ) {
	       var texture = new THREE.DataTexture3D( volume.data, volume.xLength, volume.yLength, volume.zLength  );
		   
		   
		   
		   var volumeScale = [ 1.0 / (volume.xLength * volume.spacing[0]),
		        1.0 / (volume.yLength * volume.spacing[1]),
		        1.0 / (volume.zLength * volume.spacing[2]) ];
				
		   var zScale = volumeScale[0] / volumeScale[2];
		   
		   
		   texture.format =  THREE.RGBAFormat;
		   texture.type = THREE.UnsignedByteType;
		   texture.minFilter = texture.magFilter = THREE.LinearFilter;
		   texture.unpackAlignment = 1;
		   texture.needsUpdate = true;
		   
		   // Colormap textures
		   var cmtextures = {
					viridis: new THREE.TextureLoader().load( './assets/textures/cm_viridis.png' ),
					gray: new THREE.TextureLoader().load( './assets/textures/cm_gray.png' )
			};
			
			// Material
			var shader = THREE.ShaderLib[ 'ccvLibVolumeRenderShader' ];
			var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
			uniforms["u_data"].value = texture;
            uniforms["useLut"].value = true;
			uniforms["u_lut"].value = transferTexture ;
			uniforms["clipPlane"].value = new THREE.Matrix4();
	        uniforms["clipping"].value = false ;
	        uniforms["threshold"].value = 1 ;
	        uniforms["multiplier"].value = 1 ;
	        //uniforms["camPos"].value = new THREE.Vector3( 1, 1, 1 );
	        uniforms["step_size"].value = new THREE.Vector3( 1/100, 1/100, 1/100 );
	        uniforms["channel"].value = 1 ;
	        uniforms["viewPort"].value = new THREE.Vector2(myCanvasWidth,myCanvasHeight) ;
	        uniforms["P_inv"].value = new THREE.Matrix4();
			uniforms["depth"].value = null;
			uniforms["zScale"].value = zScale;
			uniforms["controllerPoseMatrix"].value = new THREE.Matrix4();
			uniforms["grabMesh"].value = false;
	
		
			
			var material = new THREE.ShaderMaterial( {
					uniforms: uniforms,
					vertexShader: shader.vertexShader,
					fragmentShader: shader.fragmentShader,
					side: THREE.BackSide // The volume shader uses the backface as its "reference point"
				} );
            // Mesh
				var geometry = new THREE.BoxGeometry( 1, 1, 1);
				//geometry.translate( -0.5, - 0.5, - 0.5 );
				
				var mesh = new THREE.Mesh( geometry, material );
				
				el.setObject3D('mesh', new THREE.Mesh(geometry, material));
				data.modelLoaded = true;
				

		   
	       }, function () {} , function () {console.log("Could not load the data, Data not found")});
        
        
        var cameraEl = document.querySelector('#myCamera');
        cameraEl.setAttribute('camera', 'active', true);

	},
	
	onCollide: function (event) {
		this.data.rayCollided = true;
		//console.log("entity-intesercted2");
	},

	onClearCollide:function (event) {
		this.data.rayCollided = false;
		//console.log("entity-clear-intesercted2");
	},
  
    update: function () {
      // Do something when component's data is updated.
    },
  
    remove: function () {
      // Do something the component or its entity is detached.
    },
  
    tick: function (time, timeDelta) {
	  // Do something on every scene tick or frame.
	  
	  /*if(this.controllerHandler.el.getAttribute('my-buttons-check').grabObject
				  && this.data.rayCollided)
				{
					console.log("GRAB ENTITY2");
					console.log("vr mode: " + this.sceneHandler.is('vr-mode'));
					console.log("this.controllerHandler: " +this.controllerHandler );
				}*/
			var isVrModeActive = this.sceneHandler.is('vr-mode');
			if(this.data.modelLoaded) 
			{
				if( this.my2DclipPlaneHandler !== undefined  && !isVrModeActive)
				{
					
				}
				else if(this.controllerHandler !== undefined && isVrModeActive)
				{
			
				//Input - Controllermatrix
				var controllerMatrix = this.controllerHandler.matrixWorld;	
				//Input - Volumematrix				
				var volumeMatrix =  this.el.getObject3D("mesh").matrixWorld;

				// grab mesh
				if(this.controllerHandler.el.getAttribute('my-buttons-check').grabObject
				  && this.data.rayCollided)
				{
					
					// THIS IS THE PART TO DO THE GRAB (AND DROP) EVENT

					console.log("GRAB ENTITY");
					//inverse of the controllermatrix
					var controllerMatrixInverse =  new THREE.Matrix4();
					//var myMatrix = new THREE.Matrix4();
					this.el.getObject3D("mesh").matrixAutoUpdate  = false;  
					//myMatrix.multiplyMatrices(controllerMatrixInverse.getInverse( controllerMatrix ),volumeMatrix);
					//console.log(myMatrix.elements);
					//this.el.getObject3D("mesh").matrix.multiplyMatrices(  controllerMatrixInverse.getInverse(volumeMatrix),controllerMatrixInverse.getInverse( controllerMatrix));
					//this.el.getObject3D("mesh").matrixWorldNeedsUpdate = true
					//console.log(this.el.getObject3D("mesh").matrixWorld);

					var newObjectPose = new THREE.Matrix4();
					var tmpMatrix =new THREE.Matrix4();
					tmpMatrix.multiplyMatrices(this.controllerPose,volumeMatrix);
					newObjectPose.multiplyMatrices(controllerMatrix,tmpMatrix);
					console.log(newObjectPose.elements);
					this.el.getObject3D("mesh").matrix.set( newObjectPose.elements);
					this.el.getObject3D("mesh").matrixWorldNeedsUpdate = true
				    
				}

				this.controllerPose = controllerMatrix;

			    //material for setting the clipPlane and clipping value
				var material = this.el.getObject3D("mesh").material;
				
				//scalematrix for zscaling
				var scaleMatrix = new THREE.Matrix4();
				scaleMatrix.makeScale (1 , 1 , material.uniforms.zScale.value) ;
				
				//translationmatrix to cube-coordinates ranging from 0 -1
				var translationMatrix = new THREE.Matrix4();
				translationMatrix.makeTranslation ( -0.5, -0.5, -0.5 ) ;
				
				//inverse of the controllermatrix
				var controllerMatrix_inverse =  new THREE.Matrix4();
				controllerMatrix_inverse.getInverse( controllerMatrix );
				
				//outputmatrix - controller_inverse * volume * scale * translation
				var clipMatrix = new THREE.Matrix4();
				clipMatrix.multiplyMatrices(controllerMatrix_inverse,volumeMatrix );
				clipMatrix.multiplyMatrices(clipMatrix,scaleMatrix );
				clipMatrix.multiplyMatrices(clipMatrix,translationMatrix );
				
				//set uniforms of shader
				material.uniforms.clipPlane.value = clipMatrix;
				material.uniforms.clipping.value = this.controllerHandler.el.getAttribute('my-buttons-check').clipPlane;

				}
			}
    }
  });