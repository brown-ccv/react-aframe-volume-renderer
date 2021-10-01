import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import { myChangeColorMapAction as changeColorMap } from "../../redux/AppActions";
import { colorMaps, season, tide, measurement } from "../../assets/config.json";

export default function ControlPanel(props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const reduxDispatch = useDispatch(changeColorMap);

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
            onChange={(val) => {
              // Change model
              dispatch({
                type: "TOGGLE_MEASUREMENT",
                payload: val,
              });
              // Change color map
              reduxDispatch(
                changeColorMap(
                  val.value === "salt"
                    ? colorMaps.find((m) => m.name === "Haline")
                    : colorMaps.find((m) => m.name === "Thermal")
                )
              );
            }}
          >
            {measurement.map((m) => {
              return <ToggleButton value={m}>{m.name}</ToggleButton>;
            })}
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
            {season.map((m) => {
              return <ToggleButton value={m}>{m.name}</ToggleButton>;
            })}
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
            {tide.map((m) => {
              return <ToggleButton value={m}>{m.name}</ToggleButton>;
            })}
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
