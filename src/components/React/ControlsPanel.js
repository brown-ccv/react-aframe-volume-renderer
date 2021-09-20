import React, {useState} from 'react';
import {Sidebar} from 'primereact/sidebar';
import { Col, Row, Button, Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Controls from './Controls';

export default function ControlPanel(props) {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [volume, setVolume] = useState({
    season: 0, 
    tide: 1
  });

  return (
    <Container fluid className="my-3">
      <Row>
        <Col className="text-center">
          <Button onClick={(e) => setSidebarVisible(!sidebarVisible)}>
            Options
          </Button>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup 
            type="radio" 
            name="season" 
            value={volume.season} 
            onChange={(val) => setVolume({...volume, season: val})}
          >
            <ToggleButton value={0}>Summer</ToggleButton>
            <ToggleButton value={1}>Winter</ToggleButton>
          </ToggleButtonGroup>

        </Col>

        <Col className="text-center">
          <ToggleButtonGroup 
            type="radio" 
            name="tide"
            value={volume.tide}
            onChange={(val) => setVolume({...volume, tide: val})}
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