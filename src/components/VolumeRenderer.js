

import React, {Component} from 'react'



export default class VolumeRenderer extends Component {
  render () {
    return (
        <div className="aframe-container" > 
      <a-scene embedded>
       
       <a-mixin id="controller-right" 
                 vive-controls="hand: right" oculus-touch-controls="hand: right"
                 windows-motion-controls="hand: right"
                 gearvr-controls daydream-controls oculus-go-controls my-buttons-check>
       </a-mixin>


        <a-entity>
            <a-entity id="rhand" mixin="controller-right"></a-entity>
         </a-entity>

            {/*
             <a-plane id="my2Dclipplane" height="1" width="1" material="color: red ; side:double" ccvclipplane></a-plane> 
             */}  
            <a-entity id="volumeCube" class="cube" mixin="cube" myloader=" volumeData:./assets/models/nrrd/00.nrrd"  ></a-entity>
            
         <a-entity id="myCamera" camera="active: true" look-controls orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 0 0 2" ></a-entity>   
      </a-scene>
      </div>
      
    );
  }
}

