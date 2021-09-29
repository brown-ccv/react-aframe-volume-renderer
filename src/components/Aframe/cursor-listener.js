/* globals AFRAME  */

// Component to change to a sequential color on click.
AFRAME.registerComponent("cursor-listener", {
  init: function () {
    this.lastIndex = -1;
    this.COLORS = ["red", "green", "blue"];
    this.dragging = false;
    this.cameraHandler = document.getElementById("myCamera").object3D;
    this.onMousedown = this.onMousedown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.el.addEventListener("mousedown", function (evt) {
      this.dragging = true;
    });

    this.el.addEventListener("mousemove ", function (evt) {
      if (this.dragging === true) {
        console.log("dragging  at: ", evt.detail.intersection.point);
      }
    });
    this.el.addEventListener("mouseup ", function (evt) {
      this.dragging = false;
    });
  },

  onMousedown: function (evt) {
    this.dragging = true;
  },

  onMouseMove: function (evt) {
    if (this.dragging === true) {
      console.log("dragging at: ", evt.detail.intersection.point);
    }
  },

  onMouseUp: function (evt) {
    this.dragging = false;
    console.log("mouseup  at: ", evt.detail.intersection.point);
  },
});
