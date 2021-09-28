/* globals AFRAME  THREE*/
import "./arcball-controller.js";

var bind = AFRAME.utils.bind;

AFRAME.registerComponent("arcball-camera", {
  dependencies: ["camera"],

  schema: {
    initialPosition: { type: "vec3" },
  },

  init: function () {
    var el = this.el;
    this.vrcam = document.querySelector("#myCamera");
    this.controls = new THREE.TrackballControls(
      el.getObject3D("camera"),
      el.sceneEl.renderer.domElement
    );

    this.meshObjectHandler = document.getElementById("volumeCube").object3D;
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.oldPosition = new THREE.Vector3();
    this.oldMatrix = new THREE.Matrix4();

    this.debugPosition = false;

    this.bindMethods();
    this.onWindowResize = this.onWindowResize.bind(this);

    el.sceneEl.addEventListener("enter-vr", this.onEnterVR);
    el.sceneEl.addEventListener("exit-vr", this.onExitVR);

    window.addEventListener("resize", this.onWindowResize, false);

    el.getObject3D("camera").position.copy(this.data.initialPosition);

    // set the pointer to grab/grabbing when over the vr canvas
    const aCanvas = document.querySelector(".a-canvas");
    aCanvas.style.cursor = "grab";

    document.addEventListener("mousedown", () => {
      aCanvas.style.cursor = "grabbing";
    });
    document.addEventListener("mouseup", () => {
      aCanvas.style.cursor = "grab";
    });
  },

  onWindowResize() {},

  bindMethods: function () {
    this.onEnterVR = bind(this.onEnterVR, this);
    this.onExitVR = bind(this.onExitVR, this);
  },

  onEnterVR: function () {
    var el = this.el;
    this.debugPosition = true;
    if (
      !AFRAME.utils.device.checkHeadsetConnected() &&
      !AFRAME.utils.device.isMobile()
    ) {
      return;
    }
    this.controls.enabled = false;
    if (el.hasAttribute("look-controls")) {
      el.setAttribute("look-controls", "enabled", true);
      this.oldMatrix.copy(this.meshObjectHandler.matrixWorld);
      this.oldPosition.copy(el.getObject3D("camera").position);
      el.getObject3D("camera").position.set(0, 0, 0);
    }
  },

  update: function (oldData) {
    var controls = this.controls;
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
  },

  onExitVR: function () {
    console.log("exit VR");
    var el = this.el;
    this.debugPosition = false;
    if (
      !AFRAME.utils.device.checkHeadsetConnected() &&
      !AFRAME.utils.device.isMobile()
    ) {
      return;
    }
    this.controls.enabled = true;
    el.getObject3D("camera").position.set(0, 0, 2);
    //console.log("this.meshObjectHandler.matrixWorld");
    console.log(
      "this.meshObjectHandler.el.getAttribute('myloader').myMeshPosition"
    );
    var mesh =
      this.meshObjectHandler.el.getAttribute("myloader").myMeshPosition;
    console.log(mesh);

    if (el.hasAttribute("look-controls")) {
      el.setAttribute("look-controls", "enabled", false);
    }
  },

  tick: function () {
    if (this.controls.enabled) {
      this.controls.update();
    }
    if (this.debugPosition) {
    }
  },

  remove: function () {
    this.controls.reset();
    this.controls.dispose();
    this.el.sceneEl.removeEventListener("enter-vr", this.onEnterVR);
    this.el.sceneEl.removeEventListener("exit-vr", this.onExitVR);
  },
});
