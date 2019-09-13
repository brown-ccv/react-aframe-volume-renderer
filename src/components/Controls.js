import React, {Component} from 'react'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {connect} from 'react-redux';
import {myChecButtonAction} from '../redux/AppActions'
import {myXSlideAction} from '../redux/AppActions'
import {myYSlideAction} from '../redux/AppActions'
import {myZSlideAction} from '../redux/AppActions'


export default connect(
     null,
    {myChecButtonAction,myXSlideAction,myYSlideAction,myZSlideAction})( class Controls extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        actiavePlane: false,
        xslideValue: 0,
        yslideValue: 0,
        zslideValue: 0
      };
  
      this.handleCheckBoxInputChange = this.handleCheckBoxInputChange.bind(this);
      
      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
      this.ySlideHandleChange = this.ySlideHandleChange.bind(this);
      this.zSlideHandleChange = this.zSlideHandleChange.bind(this);
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

render () {
  return (
      <div className="controls-container" >

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
