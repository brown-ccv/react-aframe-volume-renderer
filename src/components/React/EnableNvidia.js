import React, {Component} from 'react'

export default class EnableNvidia extends Component {
  render() {
    return(
      <div>
        <div>
          <h3>Enable Graphics Accelerator on Web Browser</h3>  
        </div>
        <br/>
        <br/>
        <br/>

        <p>
          At this moment, VR on web browsers is only supported on Mozilla Firefox. In order to enable this option in your computer,please follow these steps:
        </p>
        <ol>
          <li>Right Click onn your Desktop and select Nvidia Control Panel</li>
          <li>In the NVIDIA panel window, select the "Program Settings" Tab</li>
          <li>In the 'Select a program' drop list select the Mozilla Firefox (If you dont find it, you will have to click on the 'add' button, look for firefox.exe). In the 'Select the preferred graphics processor for this program' drop list select 'High-Perfomance NVIDIA processor'</li>
        </ol> 
        <br/>
        <br/>

        <img 
          src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/webvrNvidia2.gif" 
          alt="Instructional gif on enabling graphics accelerator on Mozilla Firefox"
          height="400px"
        />
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}