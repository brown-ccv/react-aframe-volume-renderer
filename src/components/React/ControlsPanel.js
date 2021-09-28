import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import {
  Col,
  Row,
  Button,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import Controls from "./Controls";
import { useVolumeContext } from "../../context/volume-context";

export default function ControlPanel(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const {
    state: { selection },
    dispatch,
  } = useVolumeContext();

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
            name="measurement"
            value={selection.measurement}
            onChange={(val) =>
              dispatch({
                type: "TOGGLE_MEASUREMENT",
                payload: val,
              })
            }
          >
            <ToggleButton value="salt">Salinity</ToggleButton>
            <ToggleButton value="temp">Temperature</ToggleButton>
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="season"
            value={selection.season}
            onChange={(val) =>
              dispatch({
                type: "TOGGLE_SEASON",
                payload: val,
              })
            }
          >
            <ToggleButton value="summer">Summer</ToggleButton>
            <ToggleButton value="winter">Winter</ToggleButton>
          </ToggleButtonGroup>
        </Col>

        <Col className="text-center">
          <ToggleButtonGroup
            type="radio"
            name="tide"
            value={selection.tide}
            onChange={(val) =>
              dispatch({
                type: "TOGGLE_TIDE",
                payload: val,
              })
            }
          >
            <ToggleButton value="low">Low Tide</ToggleButton>
            <ToggleButton value="high">High Tide</ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>

      <Sidebar
        modal={false}
        position="left"
        visible={sidebarVisible}
        onHide={(e) => setSidebarVisible(false)}
      >
        <Controls />
      </Sidebar>
    </Container>
  );
}
