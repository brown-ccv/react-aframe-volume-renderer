
/* globals AFRAME  THREE*/
import './arcball-controller.js'

AFRAME.registerComponent('arcball-camera', {
    dependencies: ['camera'],

    schema: {
        initialPosition:{type: 'vec3'},
    },

    init: function () {
        var el = this.el;
       var oldPosition;

       this.controls = new THREE.TrackballControls(el.getObject3D('camera'),
                                            el.sceneEl.renderer.domElement);
       this.controls.rotateSpeed = 1.0;
	   this.controls.zoomSpeed = 1.2;
       this.controls.panSpeed = 0.8;
       this.oldPosition = new THREE.Vector3();

       window.addEventListener( 'resize', this.onWindowResize, false );
       this.onWindowResize = this.onWindowResize.bind(this);
       this.onEnterVR = this.onEnterVR.bind(this);
       this.onExitVR = this.onExitVR.bind(this);
     
        el.getObject3D('camera').position.copy(this.data.initialPosition);
        document.body.style.cursor = 'grab';
        document.addEventListener('mousedown', () => {
          document.body.style.cursor = 'grabbing';
        });
        document.addEventListener('mouseup', () => {
          document.body.style.cursor = 'grab';
        });
    },
    
    onWindowResize() {


       // this.controls.handleResize();

    },

    onEnterVR: function() 
    {
        var el = this.el;

        if (!AFRAME.utils.device.checkHeadsetConnected() &&
            !AFRAME.utils.device.isMobile()) { return; }
        this.controls.enabled = false;
        if (el.hasAttribute('look-controls')) {
          el.setAttribute('look-controls', 'enabled', true);
          this.oldPosition.copy(el.getObject3D('camera').position);
          el.getObject3D('camera').position.set(0, 0, 0);
        }
    },

    onExitVR()
    {
        var el = this.el;

        if (!AFRAME.utils.device.checkHeadsetConnected() &&
            !AFRAME.utils.device.isMobile()) { return; }
        this.controls.enabled = false;
        if (el.hasAttribute('look-controls')) {
          el.setAttribute('look-controls', 'enabled', true);
          this.oldPosition.copy(el.getObject3D('camera').position);
          el.getObject3D('camera').position.set(0, 0, 0);
        }
    },

    tick: function () {
        
         this.controls.update();
       
    },

    remove: function() {
        this.controls.reset();
        this.controls.dispose();
    }

});