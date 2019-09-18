import React, {Component} from 'react'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {connect} from 'react-redux';
import {myChecButtonAction,myXSlideAction, myYSlideAction,myZSlideAction,myChangeVolumeAction} from '../redux/AppActions'
import Select from 'react-select'

const options = [
  { value: './assets/models/nrrd/00.nrrd:false', label: 'Spheroid' },
  { value: './assets/models/nrrd/simulation_data.nrrd:true', label: 'Simulation' },
  
]

export default connect(
     null,
    {myChecButtonAction,myXSlideAction,myYSlideAction,myZSlideAction,myChangeVolumeAction})( class Controls extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        currentVolume:"",
        actiavePlane: false,
        xslideValue: 0,
        yslideValue: 0,
        zslideValue: 0
      };
  
      this.handleCheckBoxInputChange = this.handleCheckBoxInputChange.bind(this);
      
      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
      this.ySlideHandleChange = this.ySlideHandleChange.bind(this);
      this.zSlideHandleChange = this.zSlideHandleChange.bind(this);
      this.volumeSelectChanged = this.volumeSelectChanged.bind(this);
      this.options  = ['one', 'two', 'three'];
 }


 handleCheckBoxInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  this.props.myChecButtonAction(value);
  this.setState({
    [name]: value
  });
}


  xSlideHandleChange = (value) => {
    this.setState({
      xslideValue:value,
    });
   
   this.props.myXSlideAction(value);
  };

  ySlideHandleChange = (value) => {
    this.setState({
      yslideValue:value,
    });
   
   this.props.myYSlideAction(value);
  };

  zSlideHandleChange = (value) => {
    this.setState({
      zslideValue:value,
    });
   
   this.props.myZSlideAction(value);
  };

  volumeSelectChanged = (selected) =>
  {
     this.setState({
      currentVolume: selected.value
     });
     var volumeProperties = selected.value.split(":");
     console.log(volumeProperties)
     this.props.myChangeVolumeAction(volumeProperties[0],volumeProperties[1]);
  };

render () {
  return (
      <div className="controls-container" >

        <label>Volume</label>
        <br/>
        <Select options={options} onChange={this.volumeSelectChanged} />
        <br/>
       <label>
        Enable Slice
        <br/>

        <input
          name="actiavePlane"
          type="checkbox"
          checked={this.state.actiavePlane}
          onChange={this.handleCheckBoxInputChange}
          />
         </label>
         <br/> 

         <label>
            X Slide <br/>
            
         </label>
         <Slider min={0} max={360}  value={this.state.xslideValue} onChange={this.xSlideHandleChange}/>
         <br/>

         <label>
         Y Slide <br/>
         </label>
         <Slider min={0} max={360}  value={this.state.yslideValue} onChange={this.ySlideHandleChange}/>
         <br/>

         <label>
         Z Slide <br/>
         </label>
         <Slider min={0} max={360}  value={this.state.zslideValue} onChange={this.zSlideHandleChange}/>

      </div>

  );
}
})
