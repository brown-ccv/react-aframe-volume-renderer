/* globals AFRAME THREE */
import { NRRDLoader } from '../loader/NRRDLoader.js';
import '../shaders/ccvLibVolumeShader.js'


var KEYS = [
	'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyP',
	'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown'
];

AFRAME.registerComponent('collider-check', {
	dependencies: ['raycaster', 'my-buttons-check'],


	schema: {
		intersecting: { type: 'boolean', default: false },
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
		intersected: { type: 'boolean', default: false },
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
		volumeData: { type: 'string', default: "" },
		rayCollided: { type: 'boolean', default: false },
		modelLoaded: { type: 'boolean', default: false },
		transferFunction: { type: 'string', default: "false" },
		colorMap: { type: 'string', default: "" },
		opacity1: { type: 'number', default: 0 },
		opacity2: { type: 'number', default: 0 },
		lowNode: { type: 'number', default: 0 },
		highNode: { type: 'number', default: 0 },
		alphaXDataArray: { type: 'array' },
		alphaYDataArray: { type: 'array' },
		colorMapping: { type: 'boolean', default: false },
		channel: { type: 'number', default: 6 },
		cameraState: {type: 'string', default:""}
	},

	init: function () {

		this.objectPose = new THREE.Matrix4();
		this.controllerPose = new THREE.Matrix4();
		this.tempMatrix = new THREE.Matrix4();
		this.onCollide = this.onCollide.bind(this);
		this.grabbed = false;
		this.onSelectStart = this.onSelectStart.bind(this);
		this.onClearCollide = this.onClearCollide.bind(this);
		this.loadModel = this.loadModel.bind(this);
		this.updateTransfertexture = this.updateTransfertexture.bind(this);
		this.updateColorMapping = this.updateColorMapping.bind(this);


		this.el.addEventListener('raycaster-intersected', this.onCollide);
		this.el.addEventListener('raycaster-intersected-cleared', this.onClearCollide);
		this.colorTransfer = new Uint8Array(3 * 256);

		this.group = new THREE.Group();
		//this.el.sceneEl.object3D.add(group);
		this.colorMap = {
			img: null,
			data: null
		}

		this.colorMap.img = document.createElement("img");
		console.log("data: " + this.data.volumeData);
		var sceneEl = this.el;
		console.log(sceneEl.canvas);
		var canvas = document.querySelector('a-canvas');
		console.log(canvas);
		this.colorTransfer = new Uint8Array(3 * 256);

		this.isVrModeOn = false;
		this.mySpeed = 0.1;

		this.sceneHandler = this.el.sceneEl;


		this.controllerHandler = document.getElementById('rhand').object3D;//.getAttribute('my-buttons-check');
		this.controllerHandler.el.addEventListener('selectstart', this.onSelectStart);

		this.clipPlaneListenerHandler = document.getElementById('my2DclipplaneListener').object3D;//.getAttribute('my-buttons-check');
		this.clip2DPlaneRendered = false;

		this.clipPlaneHandler = document.getElementById('my2Dclipplane').object3D;//.getAttribute('my-buttons-check');


		this.controllerHandler.matrixAutoUpdate = false;
		this.grabState = this.controllerHandler.el.getAttribute('my-buttons-check').grabObject;
		var my2DclipPlane = document.getElementById('my2Dclipplane');
		if (my2DclipPlane != undefined) {
			this.my2DclipPlaneHandler = my2DclipPlane.object3D;
		}


		this.opacityControlPoints = [0, 0.1, 0.3, 0.5, 0.75, 0.8, 0.6, 0.5, 0.0];


		var jet_values = [[0, 0, 0.5],
		[0, 0, 1],
		[0, 0.5, 1],
		[0, 1, 1],
		[0.5, 1, 0.5],
		[1, 1, 0],
		[1, 0.5, 0],
		[1, 0, 0],
		[0.5, 0, 0]
		];


		var pData = [];
		this.alphaData = [];
		this.newAlphaData = [];
		var indices = [];
		var zeroArray = [0, 0, 0, 0];
		this.colorMapEnabled = this.data.colorMapping;

		//setting up control points
		for (var i = 0; i < 9; i++) {

			var index = i * 28;
			while (pData.length < index) {
				pData.push(zeroArray);
			}


			pData.push([jet_values[i][0] * 255,
			jet_values[i][1] * 255, jet_values[i][2] * 255,
			this.opacityControlPoints[i] * 255]);
			indices.push(index);

		}

		//interpolation between opacity control points
		for (var j = 0; j < 9 - 1; j++) {
			var dDataA = (pData[indices[j + 1]][3] - pData[indices[j]][3]);
			var dIndex = indices[j + 1] - indices[j];
			var dDataIncA = dDataA / dIndex;
			for (var idx = indices[j] + 1; idx < indices[j + 1]; idx++) {
				var myAlpha = pData[idx - 1][3] + dDataIncA;
				this.alphaData[idx] = myAlpha;
			}
		}


		// interpolation between colors control points
		for (var j = 0; j < 9 - 1; j++) {

			var dDataR = (pData[indices[j + 1]][0] - pData[indices[j]][0]);
			var dDataG = (pData[indices[j + 1]][1] - pData[indices[j]][1]);
			var dDataB = (pData[indices[j + 1]][2] - pData[indices[j]][2]);
			var dDataA = (pData[indices[j + 1]][3] - pData[indices[j]][3]);
			var dIndex = indices[j + 1] - indices[j];

			var dDataIncR = dDataR / dIndex;
			var dDataIncG = dDataG / dIndex;
			var dDataIncB = dDataB / dIndex;
			var dDataIncA = dDataA / dIndex;

			for (var idx = indices[j] + 1; idx < indices[j + 1]; idx++) {
				var myAlpha = pData[idx - 1][3] + dDataIncA;
				var myvector = [pData[idx - 1][0] + dDataIncR, pData[idx - 1][1] + dDataIncG, pData[idx - 1][2] + dDataIncB, myAlpha];
				this.alphaData[idx] = myAlpha;
				pData[idx] = myvector;
			}

		}

		this.myCanvas = this.el.sceneEl.canvas;

		this.printedLog = false;

		var cameraEl = document.querySelector('#myCamera');
		cameraEl.setAttribute('camera', 'active', true);

		this.hiddenLabel = document.getElementById('modelLoaded');
		//this.hiddenLabel.innerHTML = 'false';
	},


	updateTransfertexture: function () {


		var imageTransferData = new Uint8Array(4 * 256);
		for (var i = 0; i < 256; i++) {



			imageTransferData[i * 4 + 0] = this.colorTransfer[i * 3 + 0];
			imageTransferData[i * 4 + 1] = this.colorTransfer[i * 3 + 1];
			imageTransferData[i * 4 + 2] = this.colorTransfer[i * 3 + 2];
			imageTransferData[i * 4 + 3] = this.newAlphaData[i];

		}

		var transferTexture = new THREE.DataTexture(imageTransferData, 256, 1, THREE.RGBAFormat);
		transferTexture.needsUpdate = true

		if (this.el.getObject3D("mesh") !== undefined) {

			var material = this.el.getObject3D("mesh").material;
			material.uniforms.u_lut.value = transferTexture;
			material.uniforms.useLut.value = true;
			material.needsUpdate = true;

		}

	},

	loadModel: function () {

		var currentVolume = this.el.getObject3D('mesh');
		if (currentVolume !== undefined) {
			//clear mesh
			console.log("CLEAR MESH");
			currentVolume.geometry.dispose();
			currentVolume.material.dispose();
			currentVolume = undefined;
		}


		if (this.data.volumeData != "") {
			this.hiddenLabel.style.display = '';
			var el = this.el;
			var data = this.data;
			//var transferTexture = this.transferTexture ;
			var myWidth = this.myCanvas.width;
			var myheight = this.myCanvas.height;
			var colorMap = null;
			var useTransferFunction;
			var hiddenLabel = this.hiddenLabel;
			var enabledColorMapping = this.colorMapEnabled;
			var iam = this;
			console.log(this.data.transferFunction);
			if (this.data.transferFunction == "false") {
				console.log("do not use Transferfunction");
				useTransferFunction = false;
			} else {
				console.log("use Transferfunction");
				useTransferFunction = true;
			}
			//useTransferFunction = true;
			new NRRDLoader().load(this.data.volumeData, function (volume) {
				var texture = new THREE.DataTexture3D(volume.data, volume.xLength, volume.yLength, volume.zLength);
				//console.log("volume.arrayType "+volume.header.type);


				var volumeScale = [1.0 / (volume.xLength * volume.spacing[0]),
				1.0 / (volume.yLength * volume.spacing[1]),
				1.0 / (volume.zLength * volume.spacing[2])];

				var zScale = volumeScale[0] / volumeScale[2];

				if (volume.header.dim == 3) {
					texture.format = THREE.RedFormat;
				}
				else {
					texture.format = THREE.RGBAFormat;
				}

				//texture.type = THREE.UnsignedByteType;
				switch (volume.header.type) {

					// 1 byte data types
					case 'uchar':
						break;
					case 'schar':
						texture.type = THREE.IntType;
						break;
					// 2 byte data types
					case 'ushort':
						texture.type = THREE.UnsignedShortType;
						break;
					case 'sshort':
						texture.type = THREE.ShortType;

						break;
					// 4 byte data types
					case 'uint':
						texture.type = THREE.UnsignedIntType;

						break;
					case 'sint':
						texture.type = THREE.IntType;

						break;
					case 'float':
						texture.type = THREE.FloatType;

						break;
					case 'complex':
						texture.type = THREE.FloatType;

						break;
					case 'double':
						texture.type = THREE.FloatType;

						break;

				}

				//texture.format =  THREE.RGBAFormat;
				//texture.type = THREE.UnsignedByteType;

				texture.minFilter = texture.magFilter = THREE.LinearFilter;
				texture.unpackAlignment = 1;
				texture.needsUpdate = true;

				// Colormap textures
				var cmtextures = {
					viridis: new THREE.TextureLoader().load('./assets/textures/cm_viridis.png'),
					gray: new THREE.TextureLoader().load('./assets/textures/cm_gray.png')
				};

				// Material
				var shader = THREE.ShaderLib['ccvLibVolumeRenderShader'];
				var uniforms = THREE.UniformsUtils.clone(shader.uniforms);
				uniforms["u_data"].value = texture;
				// uniforms["useLut"].value = true;
				uniforms["u_lut"].value = colorMap;
				uniforms["clipPlane"].value = new THREE.Matrix4();
				uniforms["clipping"].value = false;
				uniforms["threshold"].value = 1;
				uniforms["multiplier"].value = 1;

				if (!useTransferFunction) {
					console.log("NOT USING LUT");
					uniforms["channel"].value = 6;
					uniforms["useLut"].value = false;
				} else {
					console.log("USING LUT");
					//uniforms["channel"].value = 6 ;
					uniforms["useLut"].value = false;
				}
				uniforms["step_size"].value = new THREE.Vector3(1 / 100, 1 / 100, 1 / 100);

				uniforms["viewPort"].value = new THREE.Vector2(myWidth, myheight);
				uniforms["P_inv"].value = new THREE.Matrix4();
				uniforms["depth"].value = null;
				uniforms["zScale"].value = zScale;
				uniforms["controllerPoseMatrix"].value = new THREE.Matrix4();
				uniforms["grabMesh"].value = false;
				uniforms["box_min"].value = new THREE.Vector3(0, 0, 0);;
				uniforms["box_max"].value = new THREE.Vector3(1, 1, 1);;



				var material = new THREE.ShaderMaterial({
					uniforms: uniforms,
					transparent: true,
					vertexShader: shader.vertexShader,
					fragmentShader: shader.fragmentShader,
					side: THREE.BackSide // The volume shader uses the backface as its "reference point"
				});
				// Mesh

				var geometry = new THREE.BoxGeometry(1, 1, 1);
				//geometry.translate( -0.5, - 0.5, - 0.5 );



				el.setObject3D('mesh', new THREE.Mesh(geometry, material));
				data.modelLoaded = true;

				// material.uniforms.diffuse.value.setHex ( 0xFF0000 );
				material.needsUpdate = true;

				hiddenLabel.style.display = 'none';
				console.log("MODEL LOADED");
				if( enabledColorMapping )
				{
					iam.updateColorMapping();
					iam.updateTransfertexture();
				}
			    

			}, function () { }, function () { console.log("Could not load the data, Data not found") });
		}


	},

	onCollide: function (event) {
		this.data.rayCollided = true;
		//console.log("entity-intesercted2");
	},

	onClearCollide: function (event) {
		this.data.rayCollided = false;
		//console.log("entity-clear-intesercted2");
	},
	onSelectStart: function (event) {
		//this.data.rayCollided = false;
		console.log("onSelectStart");
	},


	remove: function () {
		// Do something the component or its entity is detached.
	},

	updateColorMapping: function () {

		var imgColorImage = document.querySelector(".colorMapImg");
		var imgWidth = imgColorImage.width;
		var imgHeight = imgColorImage.height;
		var colorCanvas = document.createElement("canvas");
		var el = this.el;

		var alpha = this.alphaData;
		var colorTransfer = this.colorTransfer;
		var iam = this;
		this.colorMap.img.onload = function (data) {

			colorCanvas.height = imgHeight;
			colorCanvas.width = imgWidth;
			var colorContext = colorCanvas.getContext("2d");
			colorContext.drawImage(imgColorImage, 0, 0);
			var colorData = colorContext.getImageData(0, 0, imgWidth, 1).data;
			colorTransfer = new Uint8Array(3 * 256);
			for (var i = 0; i < 256; i++) {

				colorTransfer[i * 3] = colorData[i * 4];
				colorTransfer[i * 3 + 1] = colorData[i * 4 + 1];
				colorTransfer[i * 3 + 2] = colorData[i * 4 + 2];

			}
			iam.colorTransfer = colorTransfer;
			iam.updateTransfertexture();


		};
		this.colorMap.img.src = imgColorImage.src

	},

	update: function (oldData) {
	
		if(oldData.cameraState !== undefined && oldData.cameraState !== this.data.cameraState )
		{
             
		}

		if (oldData.channel !== undefined && oldData.channel !== this.data.channel) {
			if (this.el.getObject3D("mesh") !== undefined) {

				//		console.log("this.data.colorMapping HERE 2");
				var material = this.el.getObject3D("mesh").material;
				material.uniforms.u_lut.value = null;
				material.uniforms.useLut.value = false;
				material.uniforms.channel.value = this.data.channel;
				material.needsUpdate = true;
			}
			return;
		}

		if (oldData.colorMapping !== undefined && oldData.colorMapping !== this.data.colorMapping) {
			//this part updates the color mapping
			this.colorMapEnabled = this.data.colorMapping;
			if (!this.colorMapEnabled) {
				if (this.el.getObject3D("mesh") !== undefined) {

					var material = this.el.getObject3D("mesh").material;
					material.uniforms.u_lut.value = null;
					material.uniforms.useLut.value = false;
					material.uniforms.channel.value = this.data.channel;
					material.needsUpdate = true;

				}
			}
			else {
				this.updateColorMapping();
			}
		}

		if (this.colorMapEnabled) {
			// this part updates the opacity control points
			if ((this.data.alphaXDataArray !== undefined && oldData.alphaXDataArray !== this.data.alphaXDataArray
			) || (this.data.alphaYDataArray !== undefined && oldData.alphaYDataArray !== this.data.alphaYDataArray)) {

				this.newAlphaData = [];
				//console.log("this.data.alphaXDataArray");
				//console.log(this.data.alphaXDataArray);

				for (var i = 0; i <= this.data.alphaXDataArray.length - 2; i++) {
					var scaledColorInit = this.data.alphaXDataArray[i] * 256;
					var scaledColorEnd = this.data.alphaXDataArray[i + 1] * 256;

					var scaledAplhaInit = this.data.alphaYDataArray[i] * 256;
					var scaledAlphaEnd = this.data.alphaYDataArray[i + 1] * 256;

					var deltaX = scaledColorEnd - scaledColorInit;


					for (var j = 1 / deltaX; j < 1; j += 1 / deltaX) {
						// linear interpolation
						this.newAlphaData.push((scaledAplhaInit * (1 - j)) + (scaledAlphaEnd * j));
					}

				}

				this.updateTransfertexture();


			}


			if (this.colorMapEnabled && oldData.colorMap !== undefined && (oldData.colorMap !== this.data.colorMap)) {

				//console.log("ENTER COLOR MAPPING CHANGE");
				if (this.data.transferFunction)
				//if(false)
				{
					var imgColorImage = document.querySelector(".colorMapImg");
					var imgWidth = imgColorImage.width;
					var imgHeight = imgColorImage.height;

					//var localColorMap = this.colorMap;

					var colorCanvas = document.createElement("canvas");
					var el = this.el;
					//var opacities = this.opacity;
					var alpha = this.alphaData;
					var colorTransfer = this.colorTransfer;
					var iam = this;
					this.colorMap.img.onload = function (data) {
						//console.log(imgColorImage);
						colorCanvas.height = imgHeight;
						colorCanvas.width = imgWidth;
						var colorContext = colorCanvas.getContext("2d");
						colorContext.drawImage(imgColorImage, 0, 0);
						var colorData = colorContext.getImageData(0, 0, imgWidth, 1).data;
						colorTransfer = new Uint8Array(3 * 256);
						for (var i = 0; i < 256; i++) {

							colorTransfer[i * 3] = colorData[i * 4];
							colorTransfer[i * 3 + 1] = colorData[i * 4 + 1];
							colorTransfer[i * 3 + 2] = colorData[i * 4 + 2];

						}
						iam.colorTransfer = colorTransfer;
						iam.updateTransfertexture();


					};
					this.colorMap.img.src = imgColorImage.src;
				}
			}

		}



		if (oldData.volumeData !== this.data.volumeData) {
			this.loadModel();
			//this.updateColorMapping();
			//this.updateTransfertexture();
		}



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
		if (this.data.modelLoaded) {
			if (this.clipPlaneListenerHandler != undefined && !isVrModeActive) {
				/*if(this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').activateClipPlane
				&& !this.clip2DPlaneRendered)
				{
					this.clipPlaneHandler.el.setAttribute('visible', true);
					this.clip2DPlaneRendered = true;
				}
				else if(!this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').activateClipPlane
				&& this.clip2DPlaneRendered){
				
					var currentRot = this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').currenAxisAngle;
				    
					this.clipPlaneHandler.el.setAttribute('visible', false);
					this.clip2DPlaneRendered = false;
				}*/


				if (this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').activateClipPlane && !this.clip2DPlaneRendered) {
					this.clip2DPlaneRendered = true;

				}
				else if (!this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').activateClipPlane
					&& this.clip2DPlaneRendered) {
					this.clip2DPlaneRendered = false;
					//	var slice = this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').rotateAngle;
					//var plane3DObject = document.getElementById('my2Dclipplane').object3D;
					//plane3DObject.rotateX(rotate.x * 3.1416/180 );
					//plane3DObject.rotateY(rotate.y * 3.1416/180 );
					//plane3DObject.rotateZ(rotate.z * 3.1416/180 );

					//this.updateMeshClipMatrix(plane3DObject.matrixWorld);

					var material = this.el.getObject3D("mesh").material;
					material.uniforms.box_min.value = new THREE.Vector3(0, 0, 0);
					material.uniforms.box_max.value = new THREE.Vector3(1, 1, 1);
				}

				if (this.clip2DPlaneRendered) {
					var sliceX = this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').clipX;
					var sliceY = this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').clipY;
					var sliceZ = this.clipPlaneListenerHandler.el.getAttribute('render-2d-clipplane').clipZ;


					var material = this.el.getObject3D("mesh").material;

					material.uniforms.box_min.value = new THREE.Vector3(sliceX.x, sliceY.x, sliceZ.x);
					material.uniforms.box_max.value = new THREE.Vector3(sliceX.y, sliceY.y, sliceZ.y);
				}

			}
			else if (this.controllerHandler !== undefined && isVrModeActive) {



				//Input - Controllermatrix
				var controllerMatrix = this.controllerHandler.matrixWorld;
				//console.log(controllerMatrix);
				//Input - Volumematrix				
				//var volumeMatrix =  this.el.getObject3D("mesh").matrixWorld;


				//console.log("grabbed "+ this.grabbed);

				if (!this.controllerHandler.el.getAttribute('my-buttons-check').grabObject &&
					this.grabbed) {

					this.el.getObject3D("mesh").matrix.premultiply(this.controllerHandler.matrixWorld);
					this.el.getObject3D("mesh").matrix.decompose(this.el.getObject3D("mesh").position, this.el.getObject3D("mesh").quaternion, this.el.getObject3D("mesh").scale);
					this.el.sceneEl.object3D.add(this.el.getObject3D("mesh"));
					this.grabbed = false;
				}

				// grab mesh
				if (this.controllerHandler.el.getAttribute('my-buttons-check').grabObject
					&& this.data.rayCollided
					&& !this.grabbed) {


					this.controllerHandler.updateMatrixWorld();

					this.controllerPose.getInverse(this.controllerHandler.matrixWorld);
					this.el.getObject3D("mesh").matrix.premultiply(this.controllerPose);

					this.el.getObject3D("mesh").matrix.decompose(this.el.getObject3D("mesh").position, this.el.getObject3D("mesh").quaternion, this.el.getObject3D("mesh").scale);

					this.controllerHandler.add(this.el.getObject3D("mesh"));



					this.grabbed = true;

					//this.controllerHandler.add(this.el.getObject3D("mesh"));
					//newParent.appendChild(copy);
					//this.el.getObject3D("mesh").applyMatrix(worldToLocal);
					//tmpMatrix.multiplyMatrices( newObjectPose, controllerMatrixInverse.getInverse(this.controllerPose));
					//tmpMatrix2.multiplyMatrices(newObjectPose, tmpMatrix, );
					//tmpMatrix2.transpose();
					//var tmpMatrix2 =new THREE.Matrix4();
					//tmpMatrix2.multiplyMatrices(tmpMatrix,this.el.getObject3D("mesh").matrix);
					//console.log(this.controllerPose.elements[3] + " " + this.controllerPose.elements[7] + " " + this.controllerPose.elements[11]);

					//tmpMatrix2.multiplyMatrices(controllerMatrixInverse.getInverse(this.controllerPose),volumeMatrix);
					//tmpMatrix2.multiply(controllerMatrix);
					//console.log(tmpMatrix2.elements[12] + " " + tmpMatrix2.elements[13] + " " + tmpMatrix2.elements[14]);

					//console.log(this.el.getObject3D("mesh").matrix.elements);
					//var translationPose = new THREE.Matrix4();
					//translationPose.identity();
					//translationPose.makeTranslation(0,0,-1);
					//tmpMatrix.multiplyMatrices( newObjectPose, controllerMatrixInverse.getInverse(this.controllerPose));

					//tmpMatrix.multiplyMatrices(controllerMatrixInverse.getInverse(this.controllerPose),volumeMatrix);
					/*var currentPos = new THREE.Vector3(newObjectPose.elements[12],newObjectPose.elements[13],newObjectPose.elements[14]);
					var oldPos = new THREE.Vector3(this.controllerPose.elements[12],this.controllerPose.elements[13],this.controllerPose.elements[14]);
					var newPos = new THREE.Vector3().subVectors ( currentPos, oldPos);
					//newPos.subVectors ( currentPos, oldPos);
					//nuewPos.multiplyScalar(3.0 );
					if(oldPos.equals(currentPos))
					{
						console.log("EQUALS");
					}
		    		else
					{
						console.log(newPos.x + " " + newPos.y + " " + newPos.z);
					}*/


					//this.el.getObject3D("mesh").matrix.makeTranslation(nuewPos.x,nuewPos.y,nuewPos.z);


					//tmpMatrix.multiplyMatrices(newObjectPose, tmpMatrix);
					//console.log(tmpMatrix.elements[12] + " " + tmpMatrix.elements[13] + " " + tmpMatrix.elements[14]);

					//this.el.getObject3D("mesh").matrix.multiplyMatrices( controllerMatrix,volumeMatrix);
					//this.el.getObject3D("mesh").matrix.multiplyMatrices(tmpMatrix,this.el.getObject3D("mesh").matrix );
					//this.el.getObject3D("mesh").matrixWorldNeedsUpdate = true
					//console.log("AFTER MATRICES CALCULATION");
					//console.log(this.el.getObject3D("mesh").matrix.elements);


				}

				this.updateMeshClipMatrix(controllerMatrix);

			}
		}
	},

	updateMeshClipMatrix: function (currentSpaceClipMatrix) {

		var volumeMatrix = this.el.getObject3D("mesh").matrixWorld;
		//material for setting the clipPlane and clipping value
		var material = this.el.getObject3D("mesh").material;

		//scalematrix for zscaling
		var scaleMatrix = new THREE.Matrix4();
		scaleMatrix.makeScale(1, 1, material.uniforms.zScale.value);

		//translationmatrix to cube-coordinates ranging from 0 -1
		var translationMatrix = new THREE.Matrix4();
		translationMatrix.makeTranslation(-0.5, -0.5, -0.5);

		//inverse of the clipMatrix
		var currentSpaceClipMatrix_inverse = new THREE.Matrix4();
		currentSpaceClipMatrix_inverse.getInverse(currentSpaceClipMatrix);

		//outputmatrix - controller_inverse * volume * scale * translation
		var clipMatrix = new THREE.Matrix4();
		clipMatrix.multiplyMatrices(currentSpaceClipMatrix_inverse, volumeMatrix);
		clipMatrix.multiplyMatrices(clipMatrix, scaleMatrix);
		clipMatrix.multiplyMatrices(clipMatrix, translationMatrix);

		//set uniforms of shader
		material.uniforms.clipPlane.value = clipMatrix;
		material.uniforms.clipping.value = (this.clip2DPlaneRendered || this.controllerHandler.el.getAttribute('my-buttons-check').clipPlane) && !this.grabbed;

	},



});