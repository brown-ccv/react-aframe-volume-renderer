import React, { Component } from "react";
import { connect } from "react-redux";
import { mySendAlphaPoints } from "../../redux/AppActions";

const mapStateToProps = (state) => {
  return { volumeData: state.volumeData };
};

export default connect(mapStateToProps, { mySendAlphaPoints })(
  class OpacityControl extends Component {
    constructor(props) {
      super(props);
      this.lowNode = 0.2;
      this.highNode = 1;
      this.minLevel = 0;
      this.maxLevel = 1;
      this.opCanvas = null;
      this.opContext = null;

      this.dragging = false;
      this.hovering = false;
      this.nodeDragged = -1;
      this.nodeHovered = -1;
      this.dragStart = [0, 0];
      this.startPos = [0, 0];
      this.height = 70;
      this.padding = 10;
      // distance where clicks and hovering near control nodes are registered
      this.hoverRadius = 15;
      this.width = 0;

      //this.nodesY =[];

      this.lowNodeX = ~~(this.width * this.lowNode) + this.padding;
      this.highNodeX = ~~(this.width * this.highNode) + this.padding;
      this.minLevelY =
        ~~(this.height - this.minLevel * this.height) + this.padding;
      this.maxLevelY =
        ~~(this.height - this.maxLevel * this.height) + this.padding;

      this.initPoint1X = 0;
      this.initPoint2X = this.props.width * 0.11;
      this.initPoint3X = this.props.width * 0.32;
      this.initPoint4X = this.props.width * 0.92;

      this.nodes = [
        { x: this.initPoint1X, y: 0 },
        { x: this.initPoint2X, y: 15 },
        { x: this.initPoint3X, y: 35 },
        { x: this.initPoint4X, y: 70 },
      ];

      this.nodesCanvasSpace = [];
      this.normalizedXCanvasSpace = [];
      this.normalizedYCanvasSpace = [];

      this.changePointer = this.changePointer.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.draggPointer = this.draggPointer.bind(this);
      this.addPoint = this.addPoint.bind(this);
      this.removePoint = this.removePoint.bind(this);
      this.sendAlphaData = this.sendAlphaData.bind(this);
      this.resetOpacityPoints = this.resetOpacityPoints.bind(this);
    }

    componentDidMount() {
      this.updateCanvas();
      this.opCanvas.addEventListener("mousemove", this.changePointer);
      document.addEventListener("mousemove", this.draggPointer);
      this.opCanvas.addEventListener("mousedown", this.onMouseDown);
      document.addEventListener("mouseup", this.onMouseUp);
      this.opCanvas.addEventListener("dblclick", this.addPoint);
      this.opCanvas.addEventListener("contextmenu", this.removePoint);
    }

    componentWillUnmount() {
      this.opCanvas.removeEventListener("mousemove", this.changePointer);
      document.removeEventListener("mousemove", this.draggPointer);
      this.opCanvas.removeEventListener("mousedown", this.onMouseDown);
      document.removeEventListener("mouseup", this.onMouseUp);
      this.opCanvas.removeEventListener("dblclick", this.addPoint);
      this.opCanvas.removeEventListener("contextmenu", this.removePoint);
      //-- Save state
    }

    updateCanvas() {
      this.opCanvas = this.refs.canvas;
      this.opContext = this.refs.canvas.getContext("2d");

      var controlsContainer = document.getElementById("controls");

      this.opCanvas.width =
        controlsContainer.clientWidth - 2 * this.padding - 2;
      this.opCanvas.height = this.height + this.padding * 2;

      this.opCanvas.width = this.props.width;
      this.width = this.opCanvas.width - 2 * this.padding;

      this.opCanvas.style.border = "1px solid";
      this.opContext.clearRect(0, 0, this.opCanvas.width, this.opCanvas.height);

      this.opContext.strokeStyle = "rgba(128, 128, 128, 0.8)";
      this.opContext.lineWidth = 2;

      this.nodesCanvasSpace = [];

      for (let i = 0; i < this.nodes.length; i++) {
        let xPosInvertedCanvas = ~~this.nodes[i].x + this.padding;
        let yPosInvertedCanvas =
          ~~(this.height - this.nodes[i].y) + this.padding;
        this.nodesCanvasSpace.push({
          x: xPosInvertedCanvas,
          y: yPosInvertedCanvas,
        });
      }

      if (this.nodesCanvasSpace.length > 1) {
        // console.log("this.nodesCanvasSpace.length: " + this.nodesCanvasSpace.length);
        this.opContext.beginPath();
        this.opContext.moveTo(this.padding, this.minLevelY);
        this.opContext.lineTo(
          this.nodesCanvasSpace[0].x,
          this.nodesCanvasSpace[0].y
        );

        for (let i = 0; i <= this.nodesCanvasSpace.length - 2; i++) {
          this.opContext.moveTo(
            this.nodesCanvasSpace[i].x,
            this.nodesCanvasSpace[i].y
          );
          this.opContext.lineTo(
            this.nodesCanvasSpace[i + 1].x,
            this.nodesCanvasSpace[i + 1].y
          );
          this.opContext.stroke();
        }

        this.opContext.lineTo(this.width + this.padding, this.maxLevelY);
        this.opContext.stroke();
      }

      this.opContext.strokeStyle = "#AAAAAA";
      this.opContext.lineWidth = 2;

      for (let i = 0; i < this.nodesCanvasSpace.length; i++) {
        if (this.nodeHovered === i) this.opContext.fillStyle = "#FFFF55";
        else this.opContext.fillStyle = "#FFAA00";

        this.opContext.beginPath();
        this.opContext.arc(
          this.nodesCanvasSpace[i].x,
          this.nodesCanvasSpace[i].y,
          5,
          0,
          2 * Math.PI
        );
        this.opContext.fill();
      }

      this.sendAlphaData();
    }

    sendAlphaData() {
      this.normalizedXCanvasSpace = [];
      this.normalizedYCanvasSpace = [];
      for (let i = 0; i < this.nodesCanvasSpace.length; i++) {
        this.normalizedXCanvasSpace.push(
          (this.nodesCanvasSpace[i].x - this.padding) / this.width
        );
        this.normalizedYCanvasSpace.push(
          1 - (this.nodesCanvasSpace[i].y - this.padding) / this.height
        );
      }

      this.props.mySendAlphaPoints(
        this.normalizedXCanvasSpace,
        this.normalizedYCanvasSpace,
        this.props.volumeData
      );
    }

    resetOpacityPoints() {
      this.nodes = [
        { x: this.initPoint1X, y: 0 },
        { x: this.initPoint2X, y: 15 },
        { x: this.initPoint3X, y: 35 },
        { x: this.initPoint4X, y: 70 },
      ];
      this.updateCanvas();
    }

    removePoint(evt) {
      evt.preventDefault();
      if (
        this.nodeHovered !== -1 &&
        this.nodeHovered !== 0 &&
        this.nodeHovered !== this.nodes.length - 1
      ) {
        this.nodes.splice(this.nodeHovered, 1);
        this.nodeHovered = -1;
      }
    }

    addPoint(evt) {
      // insert points in canvas space
      var newPoint = {
        x: evt.offsetX - this.padding,
        y: this.height - evt.offsetY + this.padding,
      };
      //console.log("newPoint: " +newPoint.x + " "+newPoint.y)

      var indexToBeInserted = -1;
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].x > newPoint.x) {
          indexToBeInserted = i;
          break;
        }
      }

      if (indexToBeInserted === -1) this.nodes.push(newPoint);
      else this.nodes.splice(indexToBeInserted, 0, newPoint);

      //  for(let i = 0; i< this.nodes.length; i++) {
      //   console.log(this.nodes[i].x + " " + this.nodes[i].y)
      //  }

      this.updateCanvas();
    }

    changePointer(e) {
      var hitPoint = false;
      for (let i = 0; i < this.nodes.length; i++) {
        var normalizedCoordinates = {
          x: this.nodes[i].x + this.padding,
          y: this.height - this.nodes[i].y + this.padding,
        };
        if (
          Math.sqrt(
            Math.pow(e.offsetX - normalizedCoordinates.x, 2) +
              Math.pow(e.offsetY - normalizedCoordinates.y, 2)
          ) <= this.hoverRadius
        ) {
          this.opCanvas.className = "pointer";
          this.nodeHovered = i;
          hitPoint = true;
          this.hovering = true;
          this.updateCanvas();
          break;
        }
      }

      if (!hitPoint) {
        this.nodeHovered = -1;
        if (this.hovering) {
          this.opCanvas.className = "";
          this.hovering = false;
          this.updateCanvas();
        }
      }
    }

    draggPointer(e) {
      if (this.dragging) {
        e.preventDefault();
        var diffX = this.dragStart[0] - e.screenX;
        var diffY = this.dragStart[1] - e.screenY;

        if (
          this.nodeDragged === 0 ||
          this.nodeDragged === this.nodes.length - 1
        ) {
          this.nodes[this.nodeDragged].y = Math.max(
            this.minLevel,
            Math.min(this.height, this.startPos[1] + diffY)
          );
        } else if (this.nodeDragged !== -1) {
          let leftPoint = this.nodes[this.nodeDragged - 1].x;
          let rightPoint = this.nodes[this.nodeDragged + 1].x;
          this.nodes[this.nodeDragged].x = Math.max(
            leftPoint,
            Math.min(rightPoint, this.startPos[0] - diffX)
          );
          this.nodes[this.nodeDragged].y = Math.max(
            this.minLevel,
            Math.min(this.height, this.startPos[1] + diffY)
          );
        }

        this.updateCanvas();
      }

      // turn off hovering if cursor left opacity canvas
      if (this.hovering && e.target !== this.opCanvas) {
        this.opCanvas.className = "";
        this.hovering = false;
        this.nodeHovered = -1;
        this.updateCanvas();
      }
    }

    onMouseDown(e) {
      for (let i = 0; i < this.nodes.length; i++) {
        let normalizedCoordinates = {
          x: this.nodes[i].x + this.padding,
          y: this.height - this.nodes[i].y + this.padding,
        };
        if (
          Math.sqrt(
            Math.pow(e.offsetX - normalizedCoordinates.x, 2) +
              Math.pow(e.offsetY - normalizedCoordinates.y, 2)
          ) <= this.hoverRadius
        ) {
          this.dragging = true;
          this.nodeDragged = i;
          this.dragStart = [e.screenX, e.screenY];
          this.startPos = [this.nodes[i].x, this.nodes[i].y];
        }
      }
    }

    onMouseUp(e) {
      this.dragging = false;
      this.nodeDragged = -1;
    }

    render() {
      return (
        <div>
          <canvas ref="canvas" id="opacityControls" />
          <br />
          <button onClick={this.resetOpacityPoints}>Reset</button>
        </div>
      );
    }
  }
);
