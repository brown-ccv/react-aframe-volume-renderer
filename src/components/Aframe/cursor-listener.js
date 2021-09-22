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
      //this.lastIndex = (this.lastIndex + 1) % this.COLORS.length;
      //this.el.setAttribute('material', 'color', this.COLORS[this.lastIndex]);
      //   console.log('onMousedown  at: ', evt.detail.intersection.point);
      //console.log('cursor-listener I was mousedown at: ', evt.detail.intersection.point);
    });

    this.el.addEventListener("mousemove ", function (evt) {
      if (this.dragging === true) {
        console.log("draggin  at: ", evt.detail.intersection.point);
      }
    });
    this.el.addEventListener("mouseup ", function (evt) {
      this.dragging = false;
      //this.lastIndex = (this.lastIndex + 1) % this.COLORS.length;
      //this.el.setAttribute('material', 'color', this.COLORS[this.lastIndex]);
      console.log("mouseup  at: ", evt.detail.intersection.point);
    });
  },

  onMousedown: function (evt) {
    this.dragging = true;
    //this.lastIndex = (this.lastIndex + 1) % this.COLORS.length;
    //this.el.setAttribute('material', 'color', this.COLORS[this.lastIndex]);
    //   console.log('onMousedown  at: ', evt.detail.intersection.point);
  },

  onMouseMove: function (evt) {
    if (this.dragging === true) {
      console.log("draggin  at: ", evt.detail.intersection.point);
    }
    //this.lastIndex = (this.lastIndex + 1) % this.COLORS.length;
    //this.el.setAttribute('material', 'color', this.COLORS[this.lastIndex]);
  },

  onMouseUp: function (evt) {
    this.dragging = false;
    //this.lastIndex = (this.lastIndex + 1) % this.COLORS.length;
    //this.el.setAttribute('material', 'color', this.COLORS[this.lastIndex]);
    console.log("mouseup  at: ", evt.detail.intersection.point);
  },
});
