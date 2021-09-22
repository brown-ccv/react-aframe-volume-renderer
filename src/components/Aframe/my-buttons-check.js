/* globals AFRAME  */
AFRAME.registerComponent("my-buttons-check", {
  schema: {
    clipPlane: { type: "boolean", default: false },
    grabObject: { type: "boolean", default: false },
  },

  init: function () {
    this.el.addEventListener("gripdown", (evt) => {
      this.data.clipPlane = true;
    });

    this.el.addEventListener("gripup", (evt) => {
      this.data.clipPlane = false;
    });

    this.el.addEventListener("triggerdown", (evt) => {
      this.data.grabObject = true;
      console.log(this.data.grabObject);
    });

    this.el.addEventListener("triggerup", (evt) => {
      this.data.grabObject = false;
      console.log(this.data.grabObject);
    });
  },
});
