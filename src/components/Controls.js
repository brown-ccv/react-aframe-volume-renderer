import React, {Component} from 'react'

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {connect} from 'react-redux';

@connect((store)=>{
    return{
      foo: 1
    }
})
export default class Controls extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isGoing: false,
          numberOfGuests: 2
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
   }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

    componentWillMount()
    {
        
    }

  render () {
    return (
        <div className="controls-container" >

         <label>
          Enable Slice
          <br/>

          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
            />
           </label>
           <br/> 

           <label>
              X Slide <br/>
              
           </label>
           <Slider />
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
}
