import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { connect } from "react-redux";
import { myChangeColorMapAction as changeColorMap } from "../../redux/AppActions";

import { colorMaps } from "../../assets/config.json";

const mapStateToProps = (state) => {
  return { colorMap: state.colorMap };
};

export default connect(mapStateToProps, { changeColorMap })(
  class ColorMapControl extends Component {
    render() {
      return (
        <div className="fullWidth">
          <h4>Color Map</h4>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" className="fullWidth">
              <img
                src={this.props.colorMap.src}
                alt="Selected color map"
                height="15"
                width="65%"
                className="mr-2"
              />
              {this.props.colorMap.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {colorMaps.map((color) => {
                return (
                  <Dropdown.Item
                    key={color.name}
                    active={this.props.colorMap === color}
                    onClick={() => this.props.changeColorMap(color)}
                  >
                    <img
                      src={color.src}
                      alt={color.name}
                      height="15"
                      width="65%"
                      className="mr-2"
                    />
                    {color.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    }
  }
);
