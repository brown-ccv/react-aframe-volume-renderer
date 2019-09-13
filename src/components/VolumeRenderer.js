
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react'
import { connect } from "react-redux";


const mapStateToProps = state => {
  
  return { clipPlane: state.checkBoxValue,
           xSlideValue: state.xSlideValue,
           ySlideValue: state.ySlideValue,
           zSlideValue: state.zSlideValue
  };

};


export default connect(mapStateToProps)(class VolumeRenderer extends Component {
  render () {
    
    return (


        
        <div className="aframe-container" > 
        
        <Scene id="myScene" embedded >
        {/* <a-mixin id="controller-right" mixin="pointer"
                 vive-controls="hand: right" oculus-touch-controls="hand: right"
                 windows-motion-controls="hand: right"
                 gearvr-controls daydream-controls oculus-go-controls my-buttons-check>
       </a-mixin>
        
        <Entity id="rhand" mixin="controller-right">
          <a-entity raycaster="objects: .collidableMesh; showLine: true; far: 100; " line="color: blue; opacity: 0.5" ></a-entity>
    </Entity> 
    <Entity id="rhand" laser-controls="hand: right"/>
    */}

{/* <a-mixin id="pointer" raycaster="showLine: true; objects: .cube, a-link"
                  super-hands="colliderEvent: raycaster-intersection;
                               colliderEventProperty: els;
                               colliderEndEvent:raycaster-intersection-cleared;
                               colliderEndEventProperty: clearedEls;">
</a-mixin>
       <a-mixin id="controller-right" mixin="pointer"
                 vive-controls="hand: right" oculus-touch-controls="hand: right"
                 windows-motion-controls="hand: right"
                 gearvr-controls daydream-controls oculus-go-controls>
        </a-mixin>

        <a-mixin  id="cube" hoverable 
	             grabbable="startButtons: triggerdown; endButtons: triggerup" 
				 stretchable draggable
                 event-set__dragdrop="_event: drag-drop; geometry.radius: 0.25; geometry.primitive: sphere"
                 event-set__hoveron="_event: hover-start;" 
                 event-set__hoveroff="_event: hover-end;"
                 event-set__dragon="_event: dragover-start;"
                 event-set__dragoff="_event: dragover-end;"
				    >
        </a-mixin>


        <Entity id="rhand" mixin="controller-right"/> 
         
        <Entity id="volumeCube" class="cube" mixin="cube"  myloader=" volumeData:./assets/models/nrrd/00.nrrd" move-cube />

  */}

        <Entity id="rhand" laser-controls="hand: right" raycaster="objects: .clickableMesh" my-buttons-check={{clipPlane:false,grabObject:false}} collider-check={{intersecting:false}}/>
          
       <Entity id="my2DclipplaneListener" render-2d-clipplane={{activateClipPlane:this.props.clipPlane,xCLipPlaneRotation:this.props.xSlideValue,yCLipPlaneRotation:this.props.ySlideValue,zCLipPlaneRotation:this.props.zSlideValue, currenAxisAngle:"0 0 0",rotateAngle:"0 0 0"}} />
               
               
        <a-plane visible="false" class="clickable" id="my2Dclipplane" height="1" width="1" material="color: red ; side:double; transparent:true;opacity:0.3" cursor-listener rotation="0 0 0"></a-plane> 
               

        <Entity id="volumeCube" class="clickableMesh"   myloader={{volumeData:"./assets/models/nrrd/00.nrrd",rayCollided:false}}   position="0 0 0"/>
        <a-entity cursor="rayOrigin:mouse" raycaster="objects: .clickable"></a-entity>
        
        {/* <Entity id="myCamera" camera="active: true"  look-controls  orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 0 0 2"  /> */}
        <Entity id="myCamera" camera="active: true"  look-controls  position="0 0 2"  /> 
       
        
      </Scene>
      </div>
    
    );
  }
}
);
