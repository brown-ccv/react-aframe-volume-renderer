
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react'
import { connect } from "react-redux";


const mapStateToProps = state => {

  return { clipPlane: state.checkBoxValue,
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
           highNode: state.highNode
  };

};


export default connect(mapStateToProps)(class VolumeRenderer extends Component {
  render () {

    return (



        <div className="aframe-container" > 

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
        <a-plane visible="false" class="clickable" id="my2Dclipplane" height="1" width="1" material="color: red ; side:double; transparent:true;opacity:0.3" cursor-listener ></a-plane> 
        <Entity id="volumeCube" class="clickableMesh"   myloader={{volumeData:this.props.volumeData,rayCollided:false,
               transferFunction:this.props.transferFunction,colorMap:this.props.colorMap,
               opacity1:this.props.opacity1,opacity2:this.props.opacity2,
               lowNode:this.props.lowNode,highNode:this.props.highNode}}   position="0 0 0"/>
        <a-entity cursor="rayOrigin:mouse" raycaster="objects: .clickable"></a-entity>

        <Entity id="myCamera" camera="active: true"  look-controls  orbit-controls="target: 0 0 0; minDistance: 0.0; maxDistance: 180; initialPosition: 0 0 2"  />
        {/* <Entity id="myCamera" camera="active: true"  look-controls  position="0 0 2"  /> */}


      </Scene>
      </div>

    );
  }
}
);
