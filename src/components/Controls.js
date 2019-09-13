import React, {Component} from 'react'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {connect} from 'react-redux';
import {myChecButtonAction} from '../redux/AppActions'
import {myXSlideAction} from '../redux/AppActions'


export default connect(
     null,
    {myChecButtonAction,myXSlideAction})( class Controls extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        actiavePlane: false,
        xslideValue: 0
      };
  
      this.handleCheckBoxInputChange = this.handleCheckBoxInputChange.bind(this);
      
      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
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


  componentWillMount()
  {
      
  }


  xSlideHandleChange = (value) => {
    this.setState({
      xslideValue:value,
    });
   
   this.props.myXSlideAction(value);
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
         <Slider />
         <br/>

         <label>
         Z Slide <br/>
         </label>
         <Slider />

      </div>

  );
}
})
