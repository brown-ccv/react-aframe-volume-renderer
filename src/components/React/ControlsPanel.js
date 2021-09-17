import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Sidebar} from 'primereact/sidebar';
// import {Button} from 'primereact/button';
import {SelectButton} from 'primereact/selectbutton';

import {myChangeVolumeAction} from '../../redux/AppActions'
import Controls from './Controls';
import { Col, Row, Button, Container, Form } from 'react-bootstrap';

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
      <Container fluid className="my-3">
        <Row>
          <Col className="text-center">
            <Button 
              variant="outline-primary"
              active
              onClick={(e) => this.setState({sideBarVisible: true})}
            >
              Controls
            </Button>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label as="legend" className="text-center">
                Season
              </Form.Label>
              <Form.Check type="radio" label="Summer" />
              <Form.Check type="radio" label="Winter" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label as="legend" className="text-center">
                Tide
              </Form.Label>
              <Form.Check type="radio" label="High Tide" />
              <Form.Check type="radio" label="Low Tide" />
            </Form.Group>
          </Col>

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