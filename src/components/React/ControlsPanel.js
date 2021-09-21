import React, {useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import {Col, Row, Button, Container, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

import Controls from './Controls';
import { useVolume } from '../../context/volume-context';

export default function ControlPanel(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const {
    state: {toggles},
    dispatch
  } = useVolume();

  return (
    <Container fluid className="my-3">
      <Row>
        <Col className="text-center">
          <Button onClick={(e) => setSidebarVisible(!sidebarVisible)}>
            Options
          </Button>
        </Col>

        <Col>
          <ToggleButtonGroup 
            type="radio" 
            name="variable"
            value={toggles.measurement}
            onChange={val => dispatch({
              type: "TOGGLE_MEASUREMENT",
              payload: val,
            })}
          >
            <ToggleButton value={0}>Salinity</ToggleButton>
            <ToggleButton value={1}>Temperature</ToggleButton>
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup 
            type="radio" 
            name="season" 
            value={toggles.season} 
            onChange={val => dispatch({
              type: "TOGGLE_SEASON",
              payload: val,
            })}
          >
            <ToggleButton value={0}>Summer</ToggleButton>
            <ToggleButton value={1}>Winter</ToggleButton>
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup 
            type="radio" 
            name="tide"
            value={toggles.tide}
            onChange={val => dispatch({
              type: "TOGGLE_TIDE",
              payload: val,
            })}
          >
            <ToggleButton value={0}>Low Tide</ToggleButton>
            <ToggleButton value={1}>High Tide</ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>

      <Sidebar
        modal={false}
        position="bottom"
        visible={sidebarVisible} 
        onHide={(e) => setSidebarVisible(false)}
        style={{width:'20em', height:'45em'}}
      >
        <Controls/>
      </Sidebar>
    </Container>
  );
}