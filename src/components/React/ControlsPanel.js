import React, {Component} from 'react';
import Flexbox from 'flexbox-react';
import { connect } from 'react-redux';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import {SelectButton} from 'primereact/selectbutton';

import {myChangeVolumeAction} from '../../redux/AppActions'
import Controls from './Controls';

const options = [
  {value: './assets/models/48hr_20x_23_0.597976_ 0.597976_5.png:false', label: 'Spheroid old' },
  {value: './assets/models/r06c03f04_49_1.29_1.29_5.00000.png:false', label: 'Spheroid 1 cropped slices' },
  {value: './assets/models/r06c03f04_90_1.935_1.935_5.00000.png:false', label: 'Spheroid 1 90 slices' },
  {value: './assets/models/r06c03f03_49_1.29_1.29_5.00000.png:false', label: 'Spheroid 2 cropped slices' },
  {value: './assets/models/r06c03f03_90_1.935_1.935_5.00000.png:false', label: 'Spheroid 2 90 slices' },
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
      <div className="voume-renderer mx-1">
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
          className="ui-sidebar-md"
          position="left"
          modal={false}
          visible={this.state.sideBarVisible} 
          onHide={(e) => this.setState({sideBarVisible: false})}
        >
          <Controls/>
        </Sidebar> 
      </div>
    );
  }
})