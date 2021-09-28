import React, { Component } from "react";
import { Container, Form, Row } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { connect } from "react-redux";
import {
  myCheckButtonAction,
  myXSlideAction,
  myYSlideAction,
  myZSlideAction,
  myChangeVolumeAction,
  myChannelChanged,
  myCameraReset,
} from "../../redux/AppActions";

import OpacityControl from "./OpacityControl";
import ColorMapControl from "./ColorMappingController";

const Range = Slider.Range;

export default connect(null, {
  myCheckButtonAction,
  myXSlideAction,
  myYSlideAction,
  myZSlideAction,
  myChangeVolumeAction,
  myChannelChanged,
  myCameraReset,
})(
  class Controls extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentVolume: "",
        xslideValue: 0,
        yslideValue: 0,
        zslideValue: 0,
        activateColorMapping: false,
        currentChannel: 6,
        currentData: null,
        dataCurrentChannel: null,
        dataRange: [0.0, 100.0],
      };
      this.handleCheckBoxInputChange =
        this.handleCheckBoxInputChange.bind(this);
      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
      this.ySlideHandleChange = this.ySlideHandleChange.bind(this);
      this.zSlideHandleChange = this.zSlideHandleChange.bind(this);
      this.volumeSelectChanged = this.volumeSelectChanged.bind(this);
      this.channelSelectChanged = this.channelSelectChanged.bind(this);
      this.resetCamera = this.resetCamera.bind(this);
    }

    handleCheckBoxInputChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      this.props.myCheckButtonAction(value);
      this.setState({ activateColorMapping: value });
    }

    xSlideHandleChange = (value) => {
      this.setState({ xslideValue: value });
      this.props.myXSlideAction(value[0], value[1]);
    };

    ySlideHandleChange = (value) => {
      this.setState({ yslideValue: value });
      this.props.myYSlideAction(value[0], value[1]);
    };

    zSlideHandleChange = (value) => {
      this.setState({ zslideValue: value });
      this.props.myZSlideAction(value[0], value[1]);
    };

    volumeSelectChanged = (selected) => {
      this.setState({
        currentVolume: selected.value,
        currentData: selected,
      });
      let volumeProperties = selected.value.split(":");
      this.props.myChangeVolumeAction(volumeProperties[0], volumeProperties[1]);
    };

    channelSelectChanged = (selected) => {
      this.setState({
        currentChannel: selected.value,
        dataCurrentChannel: selected,
      });
      this.props.myChannelChanged(selected.value);
    };

    resetCamera() {
      this.props.myCameraReset();
    }

    render() {
      return (
        <Container fluid id="controls">
          <Row className="my-3">
            <ColorMapControl width="250" />
          </Row>
          <Row className="my-3">
            <OpacityControl width="250" />
          </Row>

          <Row className="mt-5">
            <h4>Clip</h4>
            <Form className="fullWidth">
              <Form.Group>
                <Form.Label> X </Form.Label>
                <Range
                  allowCross={false}
                  step={0.0009}
                  defaultValue={[0, 1]}
                  min={0}
                  max={1}
                  onChange={this.xSlideHandleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Y </Form.Label>
                <Range
                  allowCross={false}
                  step={0.0009}
                  defaultValue={[0, 1]}
                  min={0}
                  max={1}
                  onChange={this.ySlideHandleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Z </Form.Label>
                <Range
                  allowCross={false}
                  step={0.0009}
                  defaultValue={[0, 1]}
                  min={0}
                  max={1}
                  onChange={this.zSlideHandleChange}
                />
              </Form.Group>
            </Form>
          </Row>
        </Container>
      );
    }
  }
);
