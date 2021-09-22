import React, {Component} from 'react';
import Flexbox from 'flexbox-react';
import { connect } from 'react-redux';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {SelectButton} from 'primereact/selectbutton';

import {myChangeVolumeAction} from '../../redux/AppActions'
import Controls from './Controls';

const options = [
  
  {value: './assets/models/winter_high_salt_2018.json:false', label: 'winter high salt' },
  {value: './assets/models/winter_low_salt_2018.json:false', label: 'winter low salt' },
  {value: './assets/models/summer_high_salt_2018.json:false', label: 'summer high salt' },
  {value: './assets/models/summer_low_salt_2018.json:false', label: 'summer low salt' },
  {value: './assets/models/winter_high_temp_2018.json:false', label: 'winter high temp' },
  {value: './assets/models/winter_low_temp_2018.json:false', label: 'winter low temp' },
  {value: './assets/models/summer_high_temp_2018.json:false', label: 'summer high temp' },
  {value: './assets/models/summer_low_temp_2018.json:false', label: 'summer low temp' },

];

export default connect(null, {myChangeVolumeAction})
( class ControlPanel extends Component{

  constructor(props) {
    super(props);
    this.state = {
      sideBarVisible: false,
      currentData: null,
      currentVolume:"",
    };
    this.volumeSelectChanged = this.volumeSelectChanged.bind(this);
  }

  volumeSelectChanged = (selected) => {
    this.setState({
      currentVolume: selected.value,
      currentData:selected
    });
    
    if(selected.value != null) {
      var volumeProperties = selected.value.split(":");
      this.props.myChangeVolumeAction(volumeProperties[0],volumeProperties[1]);
    } else {
      this.props.myChangeVolumeAction("", "");
    }
  };

  render () {
    return (
      <div className="mx-1">
        <Flexbox justifyContent="center" className="my-3 mx-3">
          <Button 
            icon="pi pi-arrow-right" 
            label="Controls" 
            onClick={(e) => this.setState({sideBarVisible: true})}
          />
          <SelectButton 
            value={this.state.currentVolume}
            options={options} 
            onChange={this.volumeSelectChanged} 
          /> 
        </Flexbox>

        <Sidebar
          modal={false} 
          position="bottom"
          visible={this.state.sideBarVisible} 
          onHide={(e) => this.setState({sideBarVisible:false})}
          style={{width:'20em', height:'45em'}}
        >
          <Controls/>
        </Sidebar>
      </div>
    );
  }
})