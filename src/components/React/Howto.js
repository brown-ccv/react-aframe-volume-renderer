import React from "react";
import { Modal, ModalBody, Navbar, Nav, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function Howto(props) {
  return (
    <div>
      <Modal size="xl" backdrop="static" scrollable={true} show={props.show}>
        <ModalHeader>
          <Modal.Title>
            Web VR Volume Visualizer
            <span role="img" aria-label="waving emoji">
              👋
            </span>
          </Modal.Title>
          <Navbar sticky="top" expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#user-guide">User Guide</Nav.Link>
                <Nav.Link href="#enabling-vr">Enabling VR</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </ModalHeader>

        <ModalBody>
          <h2 id="user-guide" className="mb-4">
            User Guide
          </h2>
          <Row>
            <p>
              Welcome to the Web-VR Volume viewer. This short guide is meant to
              help new users on to use the application and and showcase the
              potential its potential for future research.
            </p>
            <img
              src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/guide12.png"
              alt="Example screenshot"
              width="100%"
            />
            <hr className="my-4" />
          </Row>
          <Row>
            <p>
              Click on the buttons to display data on the visualizer. Click on
              the same button to remove the data from the scene. You can switch
              between datasets by clicking the respective button.
            </p>
            <img
              src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/datasetbuttons.gif"
              alt="Instructional gif on displaying data"
              width="100%"
            />
            <hr className="my-4" />
          </Row>
          <Row>
            <p>
              Use the mouse wheel to zoom in (scroll up) and zoom out (scroll
              down). Keep pressed the mouse left button and drag the mouse to
              rotate the data on three different axes.
            </p>
            <img
              src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/zoomInOut-Rotate.gif"
              alt="Instructional gif on zooming in and out"
              width="100%"
            />
            <hr className="my-4" />
          </Row>
          <Row>
            <p>
              You can visualize the dataset RGBA channels independently. After
              selecting a set, in the controller’s panel, select the desired
              channel.
            </p>
            <img
              src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/channels.gif"
              alt="Instructional gif on selecting RGBA channels"
              width="100%"
            />
            <hr className="my-4" />
          </Row>

          <Row>
            <p>
              Check the “Enable color mapping” box to apply a 1d color texture
              to the dataset. Some regions will highlight more than others
              according to specific colors. Use the Transfer function graph to
              modify the transparency of pixels according to their mapped color.
              To add point double click on the place you want to put a new
              control point. Right click on an existing point to delete it.
            </p>
            <img
              src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/colorMappingTransfer.gif"
              alt="Instructional gif on applying a color texture"
              width="100%"
            ></img>
            <hr className="my-4" />
          </Row>
          <Row>
            <p>
              Lastly, use the ranged slices to cut through the dataset on three
              different axes.
            </p>
            <img
              src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/slice.gif"
              alt="Instructional gif on cutting through the dataset on an axis"
              width="100%"
            />
            <hr className="my-4" />
          </Row>

          <h2 id="enabling-vr" className="mb-4">
            Enable VR on Web Browser
          </h2>
          <Row>
            <p>
              At this moment, VR on web browsers is only supported on Mozilla
              Firefox. In order to enable this option in your computer, please
              follow these steps:
            </p>
            <ol>
              <li className="mx-3">
                Right Click onn your Desktop and select Nvidia Control Panel
              </li>
              <li className="mx-3">
                In the NVIDIA panel window, select the "Program Settings" Tab
              </li>
              <li className="mx-3">
                In the 'Select a program' drop list select the Mozilla Firefox
                (If you dont find it, you will have to click on the 'add'
                button, look for firefox.exe). In the 'Select the preferred
                graphics processor for this program' drop list select 'High-
                Performance NVIDIA processor'
              </li>
            </ol>
            <img
              src="https://raw.githubusercontent.com/brown-ccv/react-aframe-volume-renderer/master/imgs/webvrNvidia2.gif"
              alt="Instructional gif on enabling graphics accelerator on Mozilla Firefox"
              width="100%"
            />
          </Row>
        </ModalBody>

        <Modal.Footer>
          <Button variant="primary" onClick={() => props.close()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
