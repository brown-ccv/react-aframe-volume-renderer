import React, { Component } from "react";

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
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

// const options = [
//   { value: './assets/models/48hr_20x_23_0.597976_ 0.597976_5.png:false', label: 'Spheroid old' },
//   { value: './assets/models/r06c03f04_49_1.29_1.29_5.00000.png:false', label: 'Spheroid 1 cropped slices' },
//   { value: './assets/models/r06c03f04_90_1.935_1.935_5.00000.png:false', label: 'Spheroid 1 90 slices' },
//   { value: './assets/models/r06c03f03_49_1.29_1.29_5.00000.png:false', label: 'Spheroid 2 cropped slices' },
//   { value: './assets/models/r06c03f03_90_1.935_1.935_5.00000.png:false', label: 'Spheroid 2 90 slices' },
// ];

const channelOptions = [
  { value: 6, label: "Default" },
  { value: 1, label: "Red" },
  { value: 2, label: "Green" },
  { value: 3, label: "Blue" },
  { value: 4, label: "Alpha" },
];

const Range = Slider.Range;

const mapStateToProps = (state) => {
  return {
    currentColorMap: state.currentColorMap,
    volumeData: state.volumeData,
  };
};

export default connect(mapStateToProps, {
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
      this.volumeChangedEvent = this.volumeChangedEvent.bind(this);
      this.resetCamera = this.resetCamera.bind(this);
    }

    handleCheckBoxInputChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      this.props.myCheckButtonAction(value, this.props.volumeData);
      this.setState({ activateColorMapping: value });
    }

    xSlideHandleChange = (value) => {
      this.setState({ xslideValue: value });
      this.props.myXSlideAction(value[0], value[1], this.props.volumeData);
    };

    ySlideHandleChange = (value) => {
      this.setState({ yslideValue: value });
      this.props.myYSlideAction(value[0], value[1], this.props.volumeData);
    };

    zSlideHandleChange = (value) => {
      this.setState({ zslideValue: value });
      this.props.myZSlideAction(value[0], value[1], this.props.volumeData);
    };

    volumeChangedEvent = () => {
      console.log("volumeChangedEvent");
      return this.props.volumeData === "" || this.props.volumeData === undefined
        ? true
        : false;
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
      this.props.myChannelChanged(selected.value, this.props.volumeData);
    };

    resetCamera() {
      this.props.myCameraReset();
    }

    render() {
      return (
        <div id="controls">
          <div>
            <br />
            <div
              style={this.props.volumeData !== "" ? {} : { display: "none" }}
            >
              <label>Channel</label>
              <br />
              <Dropdown
                disabled={this.state.activateColorMapping}
                value={this.state.dataCurrentChannel}
                options={channelOptions}
                onChange={this.channelSelectChanged}
                placeholder="Select Channel"
              />
              <br />
            </div>

            <label>
              <br />
              Enable Color Map &nbsp;
              <Checkbox
                id="colorMapCheckBox"
                tooltip="Enabled when a Volume is loaded"
                disabled={
                  this.props.volumeData === "" ||
                  this.props.volumeData === undefined
                    ? true
                    : false
                }
                onChange={this.handleCheckBoxInputChange}
                checked={this.state.activateColorMapping}
              ></Checkbox>
            </label>

            <div
              style={
                this.state.activateColorMapping && this.props.volumeData !== ""
                  ? {}
                  : { display: "none" }
              }
            >
              <ColorMapControl width="250" />
              <OpacityControl width="250" />
            </div>
          </div>

          <div>
            <label>
              X Slide <br />
            </label>
            <Range
              disabled={
                this.props.volumeData === "" ||
                this.props.volumeData === undefined
                  ? true
                  : false
              }
              allowCross={false}
              step={0.0009}
              defaultValue={[0, 1]}
              min={0}
              max={1}
              onChange={this.xSlideHandleChange}
            />
            <br />

            <label>
              {" "}
              Y Slide <br />
            </label>
            <Range
              disabled={
                this.props.volumeData === "" ||
                this.props.volumeData === undefined
                  ? true
                  : false
              }
              allowCross={false}
              step={0.0009}
              defaultValue={[0, 1]}
              min={0}
              max={1}
              onChange={this.ySlideHandleChange}
            />
            <br />

            <label>
              {" "}
              Z Slide <br />{" "}
            </label>
            <Range
              disabled={
                this.props.volumeData === "" ||
                this.props.volumeData === undefined
                  ? true
                  : false
              }
              allowCross={false}
              step={0.0009}
              defaultValue={[0, 1]}
              min={0}
              max={1}
              onChange={this.zSlideHandleChange}
            />
          </div>
        </div>
      );
    }
  }
);
