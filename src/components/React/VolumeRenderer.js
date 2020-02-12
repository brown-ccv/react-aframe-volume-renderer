
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react'
import { connect } from "react-redux";
import Spinner from './Spinner'
import '../../App.css'

const mapStateToProps = state => {

  return { colorMapping: state.checkBoxValue,
           xSlideValueMin: state.xSlideValueMin,
           xSlideValueMax: state.xSlideValueMax,
           ySlideValueMin: state.ySlideValueMin,
           ySlideValueMax: state.ySlideValueMax,
           zSlideValueMin: state.zSlideValueMin,
           zSlideValueMax: state.zSlideValueMax,
           volumeData: state.volumeData,
           transferFunction: state.transferFunction,
           colorMap: state.colorMap,
           opacity1: state.opacity1,
           opacity2: state.opacity2,
           lowNode: state.lowNode,
           highNode: state.highNode,
           alphaXDataArray: state.alphaXDataArray,
           alphaYDataArray: state.alphaYDataArray,
           channel: state.channel,
           cameraState: state.cameraState
  };

};


export default connect(mapStateToProps)(class VolumeRenderer extends Component {

  constructor(props)
  {
    super(props);
    
    this.state = {
      sideBarVisible:true,
    };
  }

  render () {

    return (



        <div className="aframe-container" > 
         

          <div id="modelLoaded" style={{display:'none'}}>
           <Spinner></Spinner>
          </div>
        {/*<input type="hidden" id="modelLoaded" name="custId" value="HERE" onchange={this.modelLoad}/>*/}
        <Scene id="myScene" background="color: black" embedded >
      
        <Entity id="rhand" laser-controls="hand: right" raycaster="objects: .clickableMesh" my-buttons-check={{clipPlane:false,grabObject:false}} collider-check={{intersecting:false}}/>

        <Entity id="my2DclipplaneListener" render-2d-clipplane={{activateClipPlane:true,
          xCLipPlaneMin:this.props.xSlideValueMin,
          xCLipPlaneMax:this.props.xSlideValueMax,
          yCLipPlaneMin:this.props.ySlideValueMin,
          yCLipPlaneMax:this.props.ySlideValueMax,
          zCLipPlaneMin:this.props.zSlideValueMin,
          zCLipPlaneMax:this.props.zSlideValueMax,
          currenAxisAngle:"0 0 0",
          rotateAngle:"0 0 0",
          clipX:"0 0"} } />
        <a-plane visible="false" class="clickable" id="my2Dclipplane" height="1" 
            width="1" material="color: red ; side:double; transparent:true;opacity:0.3" 
            cursor-listener ></a-plane> 

        
        <Entity id="volumeCube" class="clickableMesh"   myloader={{volumeData:this.props.volumeData,rayCollided:false,
               transferFunction:this.props.transferFunction,colorMap:this.props.colorMap,
               opacity1:this.props.opacity1,opacity2:this.props.opacity2,
               lowNode:this.props.lowNode,highNode:this.props.highNode,
               alphaXDataArray:this.props.alphaXDataArray,
               alphaYDataArray:this.props.alphaYDataArray,
               colorMapping:this.props.colorMapping,
               channel:this.props.channel,
               cameraState:this.props.cameraState}}   position="0 0 0"/>
        <a-entity cursor="rayOrigin:mouse" raycaster="objects: .clickable"></a-entity>

        <Entity id="myCamera" camera="active: true"  look-controls  orbit-controls="target: 0 0 0; minDistance: 0.0; maxDistance: 180; initialPosition: 0 0 2"  />
        {/* <Entity id="myCamera" camera="active: true"  look-controls  position="0 0 2"  /> */}


      </Scene>
      </div>

    );
  }
}
);
