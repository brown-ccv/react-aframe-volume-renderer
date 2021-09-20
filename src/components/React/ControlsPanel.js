import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Sidebar} from 'primereact/sidebar';
import {SelectButton} from 'primereact/selectbutton';

import {myChangeVolumeAction} from '../../redux/AppActions'
import Controls from './Controls';
import { Col, Row, Button, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

// const options = [
//   {value: './assets/models/48hr_20x_23_0.597976_ 0.597976_5.png:false', label: 'Spheroid old' },
//   {value: './assets/models/r06c03f04_49_1.29_1.29_5.00000.png:false', label: 'Spheroid 1 cropped slices' },
//   {value: './assets/models/r06c03f04_90_1.935_1.935_5.00000.png:false', label: 'Spheroid 1 90 slices' },
//   {value: './assets/models/r06c03f03_49_1.29_1.29_5.00000.png:false', label: 'Spheroid 2 cropped slices' },
//   {value: './assets/models/r06c03f03_90_1.935_1.935_5.00000.png:false', label: 'Spheroid 2 90 slices' },
// ];

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
      this.props.myChangeVolumeAction(volumeProperties[0], volumeProperties[1]);
    } else {
      this.props.myChangeVolumeAction("", "");
    }
  };

  render () {
    return (
      <Container fluid className="my-3">
        <Row>
          <Col className="text-center">
            <Button 
              variant="outline-primary"
              active
              onClick={(e) => this.setState({sideBarVisible: true})}
            >
              Options
            </Button>
          </Col>

          <Col className="text-center">
            <ToggleButtonGroup type="radio" name="season" value={1}>
              <ToggleButton value={1}>Summer</ToggleButton>
              <ToggleButton value={2}>Winter</ToggleButton>
            </ToggleButtonGroup>

          </Col>

          <Col className="text-center">
            <ToggleButtonGroup type="radio" name="season" value={2}>
              <ToggleButton value={1}>Temperature</ToggleButton>
              <ToggleButton value={2}>Salinity</ToggleButton>
            </ToggleButtonGroup>
          </Col>

          {/* Model Section TO BE REMOVED */}
          {/* <SelectButton 
            value={this.state.currentVolume}
            options={options} 
            onChange={this.volumeSelectChanged} 
          />  */}
        </Row>
        <Sidebar
          modal={false}
          position="bottom"
          visible={this.state.sideBarVisible} 
          onHide={(e) => this.setState({sideBarVisible:false})}
          style={{width:'20em', height:'45em'}}
        >
          <Controls/>
        </Sidebar>
      </Container>
    );
  }
})