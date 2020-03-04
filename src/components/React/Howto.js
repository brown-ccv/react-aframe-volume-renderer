import React, {Component} from 'react'

export default class Howto extends Component {
   render()
   {
       return(
           <div>
               <div>
                 <h3>Web VR Volume Visualizer user guide 👋</h3>  
               </div>
            <br/>
            <p>
                Welcome to the Web-VR Volume viewer. This short guide is meant to help new users on to use the application and 
                and showcase the potential its potential for future research.
            </p>
            <img src=
               "https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/guide12.png" 
               height="400px">
            </img>
            <br/>
            <br/>
            <p>Click on the buttons to display data on the visualizer. Click on the same button to remove the data from the scene. You can switch between datasets by clicking the respective button.
            </p>  

            <img src=
               "https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/datasetbuttons.gif" 
               height="400px">
            </img>
            <br/>
            <br/>
           
            <p>
              Use the mouse wheel to zoom in (scroll up) and zoom out (scroll down). Keep pressed the mouse left button and drag the mouse to rotate the data on three different axes.
            </p>
            <img src=
               "https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/zoomInOut-Rotate.gif" 
               height="400px">
            </img>

            <br/>
            <br/>
           
            <p>
              You can visualize the dataset RGBA channels independently. After selecting a set, in the controller’s panel, select the desired channel.
            </p>
            <img src=
               "https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/channels.gif" 
               height="400px">
            </img>
            <br/>
            <br/>
           
            <p>
            Check the “Enable color mapping” box to apply a 1d color texture to the dataset. Some regions will highlight more than others according to specific colors. Use the Transfer function graph to modify the transparency of pixels according to their mapped color. To add point double click on the place you want to put a new control point. Right click on an existing point to delete it.
            </p>
            <img src=
               "https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/colorMappingTransfer.gif" 
               height="400px">
            </img>
            <br/>
            <br/>
           
            <p>
            Lastly, use the ranged slices to cut through the dataset on three different axes
            </p>
            <img src=
               "https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/slice.gif" 
               height="400px">
            </img>
            <br/>
            <br/>
            
           </div>
       );
   }
}