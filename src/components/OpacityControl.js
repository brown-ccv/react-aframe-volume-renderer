import React, {Component} from 'react'

export default class OpcacityControl extends Component {

    init(){

        this.lowNode = 0.7;
        this.highNode = 0.95;
        this.minLevel = 0;
        this.maxLevel = 1;
    }

    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        var opCanvas = this.refs.canvas;
        var opContext = this.refs.canvas.getContext('2d');
        var height = 70;
		var padding = 10;
        var controlsContainer = document.getElementById("controls");

        opCanvas.width = controlsContainer.clientWidth - 2*padding -2; // 2 for border, i guess
        opCanvas.height = height+padding*2;
        
        opCanvas.width = 200; // 2 for border, i guess
        
        //opCanvas.height = 100;
        var width = opCanvas.width-2*padding;

        var lowNodeX = ~~(width*this.lowNode)+padding;
		var highNodeX = ~~(width*this.highNode)+padding;
		var minLevelY = ~~(height-(this.minLevel*height))+padding;
        var maxLevelY = ~~(height-(this.maxLevel*height))+padding;
        
        opContext.clearRect(0, 0, opCanvas.width, opCanvas.height);
        // draw guide lines
		var linesCount = 10;
			
		opContext.strokeStyle = "rgba(128, 128, 128, 0.8)";
		opContext.lineWidth = 0.5;
        opContext.beginPath();
        
        for(var i = 0; i < linesCount; i++){
            var y = 1-Math.pow(i/(linesCount-1), 2);
            var y = padding + (height)*y;
            y = ~~y+0.5;
            opContext.moveTo(padding, y);
            opContext.lineTo(width+padding, y);
        }

        opContext.stroke();
			
		opContext.strokeStyle = "#AAAAAA";
		opContext.lineWidth = 2;
		opContext.beginPath();
		opContext.moveTo(padding, minLevelY);
		opContext.lineTo(lowNodeX, minLevelY);
		opContext.lineTo(highNodeX, maxLevelY);
		opContext.lineTo(width+padding, maxLevelY);
        opContext.stroke();
        
        opContext.fillStyle = "#FFAA00";

        opContext.beginPath();
		opContext.arc(lowNodeX, minLevelY, 5, 0, 2*Math.PI);
        opContext.fill();
        
        opContext.fillStyle = "#FFAA00";

        opContext.beginPath();
		opContext.arc(highNodeX, maxLevelY, 5, 0, 2*Math.PI);
        opContext.fill();
        
			
    }
    render() {
        return(
          <div>
            <canvas ref="canvas"  />
          </div>
        )
      }
}