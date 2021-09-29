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
import ColorMapControl from "./ColorMapControl";
import { range } from "../../assets/config.json";

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
        xValue: 0,
        yValue: 0,
        zValue: 0,
      };

      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
      this.ySlideHandleChange = this.ySlideHandleChange.bind(this);
      this.zSlideHandleChange = this.zSlideHandleChange.bind(this);
    }

    xSlideHandleChange = (value) => {
      this.setState({ xValue: value });
      this.props.myXSlideAction(value[0], value[1]);
    };

    ySlideHandleChange = (value) => {
      this.setState({ yValue: value });
      this.props.myYSlideAction(value[0], value[1]);
    };

    zSlideHandleChange = (value) => {
      this.setState({ zValue: value });
      this.props.myZSlideAction(value[0], value[1]);
    };

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
                  defaultValue={[range.min, range.max]}
                  min={range.min}
                  max={range.max}
                  onChange={this.xSlideHandleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Y </Form.Label>
                <Range
                  allowCross={false}
                  step={0.0009}
                  defaultValue={[range.min, range.max]}
                  min={range.min}
                  max={range.max}
                  onChange={this.ySlideHandleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Z </Form.Label>
                <Range
                  allowCross={false}
                  step={0.0009}
                  defaultValue={[range.min, range.max]}
                  min={range.min}
                  max={range.max}
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
