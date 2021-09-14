import React, {Component} from 'react'

export default class Howto extends Component {
  render() {
    return(
      <div>
        <div>
          <h3>
            Web VR Volume Visualizer user guide 
            <span role="img" aria-label="waving emoji">👋</span>
          </h3>  
        </div>
         
        <ul >
          <li> <a href="#next">User Guide</a></li>
          <li><a href="#next2">Enable VR on Web Browser</a> </li>
        </ul>
        <br/>

        <p id="next" >
          Welcome to the Web-VR Volume viewer. This short guide is meant to help new users on to 
          use the application and and showcase the potential its potential for future research.
        </p>
        <img 
          src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/guide12.png" 
          alt="Example screenshot"
          width="100%"
        />
        <br/>
        <br/>

        <p>
          Click on the buttons to display data on the visualizer. Click on the same button to 
          remove the data from the scene. You can switch between datasets by clicking the 
          respective button.
        </p>  
        <img 
           src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/datasetbuttons.gif" 
           alt="Instructional gif on displaying data"
           width="100%"
        />
        <br/>
        <br/>
           
        <p >
          Use the mouse wheel to zoom in (scroll up) and zoom out (scroll down). Keep pressed the 
          mouse left button and drag the mouse to rotate the data on three different axes.
        </p>
        <img 
           src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/zoomInOut-Rotate.gif" 
           alt="Instructional gif on zooming in and out"
           width="100%"
        />
        <br/>
        <br/>
           
        <p>
          You can visualize the dataset RGBA channels independently. After selecting a set, in the 
          controller’s panel, select the desired channel.
        </p>
        <img 
           src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/channels.gif" 
           alt="Instructional gif on selecting RGBA channels"
           width="100%"
        />
        <br/>
        <br/>
           
        <p>
          Check the “Enable color mapping” box to apply a 1d color texture to the dataset. Some 
          regions will highlight more than others according to specific colors. Use the Transfer 
          function graph to modify the transparency of pixels according to their mapped color. To 
          add point double click on the place you want to put a new control point. Right click on 
          an existing point to delete it.
        </p>
        <img 
           src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/colorMappingTransfer.gif" 
           alt="Instructional gif on applying a color texture"
           width="100%">
        </img>
        <br/>
        <br/>
           
        <p>
          Lastly, use the ranged slices to cut through the dataset on three different axes.
        </p>
        <img 
          src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/slice.gif" 
          alt="Instructional gif on cutting through the dataset on an axis"
          width="100%"
        />
        <br/>
        <br/>
           
        <h2 id="next2">Enable VR on Web Browser</h2>
        <br/>
        
        <a href="#next">Back to top</a>
        <br/>
        
        <p>
          At this moment, VR on web browsers is only supported on Mozilla Firefox. In order to 
          enable this option in your computer,please follow these steps:
        </p>
        <ol>
          <li>Right Click onn your Desktop and select Nvidia Control Panel</li>
          <li>In the NVIDIA panel window, select the "Program Settings" Tab</li>
          <li>
            In the 'Select a program' drop list select the Mozilla Firefox (If you dont find it, 
            you will have to click on the 'add' button, look for firefox.exe). In the 'Select the 
            preferred graphics processor for this program' drop list select 'High-Performance 
            NVIDIA processor'
          </li>
        </ol> 
        <br/>
        <br/>
        <img 
          src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/webvrNvidia2.gif" 
          alt="Instructional gif on enabling graphics accelerator on Mozilla Firefox"
          width="100%"
        />
      </div>
    );
  }
}