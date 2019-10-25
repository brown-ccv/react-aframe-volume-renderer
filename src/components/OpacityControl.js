import React, {Component} from 'react'
import '../App.css'
import { connect } from "react-redux";
import {myChangePoint1,myChangePoint2,myChangeLowNode,myChangeHighNode} from '../redux/AppActions'

export default connect(
    null,
   {myChangePoint1,myChangePoint2,myChangeLowNode,myChangeHighNode})
   ( class OpcacityControl extends Component {

    constructor(props) {
        super(props);
        this.lowNode = 0;
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
        this.width = 0

       
        //this.nodesY =[];

        this.lowNodeX = ~~(this.width*this.lowNode)+this.padding;
		this.highNodeX = ~~(this.width*this.highNode)+this.padding;
		this.minLevelY = ~~(this.height-(this.minLevel*this.height))+this.padding;
        this.maxLevelY = ~~(this.height-(this.maxLevel*this.height))+this.padding;

        this.nodes =[{x:this.lowNodeX,y:this.minLevelY},{x:this.highNodeX,y:this.maxLevelY}];

        this.changePointer = this.changePointer.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.draggPointer = this.draggPointer.bind(this);
        this.doubleClick = this.doubleClick.bind(this);
    }


    
    componentDidMount() {
        this.updateCanvas();
        this.opCanvas.addEventListener('mousemove', this.changePointer);
        document.addEventListener("mousemove", this.draggPointer);
        this.opCanvas.addEventListener("mousedown",this.onMouseDown);
        document.addEventListener("mouseup", this.onMouseUp);
        this.opCanvas.addEventListener("dblclick",this.doubleClick);
    }

    componentWillUnmount() {
        this.opCanvas.removeEventListener('mousemove', this.changePointer);
        document.removeEventListener("mousemove", this.draggPointer);
        this.opCanvas.removeEventListener("mousedown",this.onMouseDown);
        document.removeEventListener("mouseup", this.onMouseUp);
        this.opCanvas.removeEventListener("dblclick",this.doubleClick);
    }

    updateCanvas() {
        this.opCanvas = this.refs.canvas;
        this.opContext = this.refs.canvas.getContext('2d');
        
        var controlsContainer = document.getElementById("controls");

        this.opCanvas.width = controlsContainer.clientWidth - 2*this.padding -2; 
        this.opCanvas.height = this.height+this.padding*2;
        
        this.opCanvas.width = 200; 
        this.width = this.opCanvas.width-2*this.padding;

 
        
        this.opCanvas.style.border = "1px solid";
        this.opContext.clearRect(0, 0, this.opCanvas.width, this.opCanvas.height);
        
		
			
		this.opContext.strokeStyle = "rgba(128, 128, 128, 0.8)";
		this.opContext.lineWidth = 2;
        //this.opContext.beginPath();
        
        /*
        var linesCount = 10;
        for(var i = 0; i < linesCount; i++){
            var y = 1-Math.pow(i/(linesCount-1), 2);
            var y = this.padding + (this.height)*y;
            y = ~~y+0.5;
            this.opContext.moveTo(this.padding, y);
            this.opContext.lineTo(this.width+this.padding, y);
        }*/

        
        
        /*this.opContext.stroke();
			
		this.opContext.strokeStyle = "#AAAAAA";
		this.opContext.lineWidth = 2;
		this.opContext.beginPath();
		this.opContext.moveTo(this.padding, this.minLevelY);
		this.opContext.lineTo(this.lowNodeX, this.minLevelY);
		this.opContext.lineTo(this.highNodeX, this.maxLevelY);
		this.opContext.lineTo(this.width+this.padding, this.maxLevelY);
        this.opContext.stroke();
        
        if(this.hovering && this.nodeHovered == 0 || this.dragging && this.nodeDragged == 0){
            this.opContext.fillStyle = "#FFFF55";
        } else {
            this.opContext.fillStyle = "#FFAA00";
        }

        this.opContext.beginPath();
		this.opContext.arc(this.lowNodeX, this.minLevelY, 5, 0, 2*Math.PI);
        this.opContext.fill();
        
        if(this.hovering && this.nodeHovered == 1 || this.dragging && this.nodeDragged == 1){
            this.opContext.fillStyle = "#FFFF55";
        } else {
            this.opContext.fillStyle = "#FFAA00";
        }

        this.opContext.beginPath();
		this.opContext.arc(this.highNodeX, this.maxLevelY, 5, 0, 2*Math.PI);
        this.opContext.fill();*/
        
        //for(var i = 0; i< this.nodes.length; i++)
        //{
            this.nodes[0].x = ~~(this.width*this.nodes[0].x)+this.padding;
            this.nodes[0].y = ~~(this.height-(this.nodes[0].y*this.height))+this.padding;

            this.nodes[1].x = ~~(this.width*this.nodes[1].x)+this.padding;
            this.nodes[1].y = ~~(this.height-(this.nodes[1].y*this.height))+this.padding;
        //}


        this.lowNodeX = ~~(this.width*this.lowNode)+this.padding;
		this.highNodeX = ~~(this.width*this.highNode)+this.padding;
		this.minLevelY = ~~(this.height-(this.minLevel*this.height))+this.padding;
        this.maxLevelY = ~~(this.height-(this.maxLevel*this.height))+this.padding;
        this.nodes =[{x:this.lowNodeX,y:this.minLevelY},{x:this.highNodeX,y:this.maxLevelY}];
        if(this.nodes.length > 1 )
        {
          
            this.opContext.beginPath();
            this.opContext.moveTo(this.padding, this.minLevelY);
            this.opContext.lineTo(this.nodes[0].x, this.nodes[0].y);
            for(var i = 0; i <= this.nodes.length - 2; i++)
            {
             
                this.opContext.moveTo(this.nodes[i].x, this.nodes[i].y);
                this.opContext.lineTo(this.nodes[i + 1].x, this.nodes[i + 1].y);
                this.opContext.stroke();
            }

            this.opContext.lineTo(this.width+this.padding, this.maxLevelY);
            this.opContext.stroke();
        }
        
      
        this.opContext.strokeStyle = "#AAAAAA";
        this.opContext.lineWidth = 2;
       
        for(var i = 0; i< this.nodes.length; i++)
        {
            if(this.nodeHovered == i)
            {
                this.opContext.fillStyle = "#FFFF55";
            }
            else
            {
                this.opContext.fillStyle = "#FFAA00";
            }
            this.opContext.beginPath();
            this.opContext.arc(this.nodes[i].x, this.nodes[i].y, 5, 0, 2*Math.PI);
            this.opContext.fill();
        };
       
			
    }

    
 
    doubleClick(evt)
    {
     
     var newPoint = {x: evt.offsetX, y: evt.offsetY}
     

     var indexToBeInserted = - 1;
     for(var i = 0; i< this.nodes.length; i++)
     {
         if(this.nodes[i].x > newPoint.x)
         {
                indexToBeInserted = i;
                break;  
         }
     }
     
     if(indexToBeInserted == -1)
     {
        this.nodes.push(newPoint);
     }
     else{
        this.nodes.splice(indexToBeInserted, 0, newPoint);
     }
     
     this.updateCanvas();

    }

    changePointer(e)
    {
      
        
       /* if(Math.sqrt(Math.pow(e.offsetX-this.lowNodeX, 2)+Math.pow(e.offsetY-this.minLevelY, 2)) <= this.hoverRadius){
          
            if(!this.hovering){
                this.opCanvas.className = "pointer";
                this.nodeHovered = 0;
                this.hovering = true;
                this.updateCanvas();
            }
        } else if(Math.sqrt(Math.pow(e.offsetX-this.highNodeX, 2)+Math.pow(e.offsetY-this.maxLevelY, 2)) <= this.hoverRadius){
      
            if(!this.hovering){
                this.opCanvas.className = "pointer";
                this.nodeHovered = 1;
                this.hovering = true;
                this.updateCanvas();
            }
        } else {
        
            if(this.hovering){
                this.opCanvas.className = "";
                this.hovering = false;
                this.updateCanvas();
            }
        }*/

        var hitPoint = false;
        for(var i = 0; i< this.nodes.length; i++)
        {
            if(Math.sqrt(Math.pow(e.offsetX-this.nodes[i].x, 2)+Math.pow(e.offsetY-this.nodes[i].y, 2)) <= this.hoverRadius)
            {
                this.opCanvas.className = "pointer";
                this.nodeHovered = i;
                hitPoint = true;
                this.hovering = true;
                this.updateCanvas();
                break;
            }
        }
 
        if(!hitPoint)
        {
            this.nodeHovered = -1;
            if(this.hovering)
            {
                    this.opCanvas.className = "";
                    this.hovering = false;
                    this.updateCanvas();
            }
        }
       

    }

    draggPointer(e)
    {
        if(this.dragging){
            e.preventDefault();
            var diffX = this.dragStart[0]-e.screenX;
            var diffY = this.dragStart[1]-e.screenY;
            
           /*if(this.nodeDragged == 0){
                this.lowNodeX = Math.max(this.padding, Math.min(this.width+this.padding, this.startPos[0]-diffX));
                this.minLevelY = Math.max(this.padding, Math.min(this.height+this.padding, this.startPos[1]-diffY));

                this.lowNode = (this.lowNodeX-this.padding)/this.width;
                this.lowNode = Math.min(this.lowNode, this.highNode);
                this.minLevel = 1-(this.minLevelY-this.padding)/this.height;

                this.props.myChangeLowNode(this.lowNode);
                this.props.myChangePoint1(this.minLevel);
               // console.log("minLevel: " +this.minLevel);
            } else {
                this.highNodeX = Math.max(this.padding, Math.min(this.width+this.padding, this.startPos[0]-diffX));
                this.maxLevelY = Math.max(this.padding, Math.min(this.height+this.padding, this.startPos[1]-diffY));

                this.highNode = (this.highNodeX-this.padding)/this.width;
                this.highNode = Math.max(this.highNode, this.lowNode);
                this.maxLevel = 1-(this.maxLevelY-this.padding)/this.height;

                this.props.myChangeHighNode(this.highNode);
                this.props.myChangePoint2(this.maxLevel);
                //console.log("maxLevel " +this.maxLevel);
            }*/

            if(this.nodeDragged != -1)
            {
                this.nodes[this.nodeDragged].x = Math.max(this.padding, Math.min(this.width+this.padding, this.startPos[0]-diffX));
                this.nodes[this.nodeDragged].y = Math.max(this.padding, Math.min(this.height+this.padding, this.startPos[1]-diffY));

                //this.lowNode = (this.lowNodeX-this.padding)/this.width;
               // this.lowNode = Math.min(this.lowNode, this.highNode);
                //this.minLevel = 1-(this.minLevelY-this.padding)/this.height;

               // this.props.myChangeLowNode(this.lowNode);
              //  this.props.myChangePoint1(this.minLevel);
            }
            
            this.updateCanvas();
        }

        // turn off hovering if cursor left opacity canvas
        if(this.hovering && e.target != this.opCanvas){
            this.opCanvas.className = "";
            this.hovering = false;
           this.updateCanvas();
        }
    }

    onMouseDown(e)
    {
      
       /* if(Math.sqrt(Math.pow(e.offsetX-this.lowNodeX, 2)+Math.pow(e.offsetY-this.minLevelY, 2)) <= this.hoverRadius){
        
            this.dragging = true;
            this.nodeDragged = 0;
            this.dragStart = [e.screenX, e.screenY];
            this.startPos = [this.lowNodeX, this.minLevelY];
        } else if(Math.sqrt(Math.pow(e.offsetX-this.highNodeX, 2)+Math.pow(e.offsetY-this.maxLevelY, 2)) <= this.hoverRadius){
        
            this.dragging = true;
            this.nodeDragged = 1;
            this.dragStart = [e.screenX, e.screenY];
            this.startPos = [this.highNodeX, this.maxLevelY];
        }*/
        
        for(var i = 0; i< this.nodes.length; i++)
        {
            if(Math.sqrt(Math.pow(e.offsetX-this.nodes[i].x, 2)+Math.pow(e.offsetY-this.nodes[i].y, 2)) <= this.hoverRadius)
            {
                this.dragging = true;
                this.nodeDragged = i;
                this.dragStart = [e.screenX, e.screenY];
                this.startPos = [this.nodes[i].x, this.nodes[i].y];
            }
        }

    }

  

    onMouseUp(e)
    { 
        this.dragging = false;
        this.nodeDragged = -1;
    }

    render() {
        return(
          <div>
            <canvas ref="canvas" id="opacityControls" />
          </div>
        )
      }
})