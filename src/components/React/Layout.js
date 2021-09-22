import React, { useState } from 'react'
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';

import VolumeRenderer from './VolumeRenderer';
import ControlsPanel from './ControlsPanel';
import Howto from './Howto'
import Footer from './Footer'

import { VolumeProvider } from '../../context/volume-context';

export default function Layout(props) {
  const [showHowto, setShowHowto] = useState(false);

  return (
    <div id="visualizer">
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="https://ridatadiscovery.org"><img
          src="/assets/images/ricaim-logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Rhode Island Data Discovery Center"
        /></Navbar.Brand>

        <Nav>
          <Nav.Link href="#visualizer">Visualizer</Nav.Link>
          <Nav.Link href="#information">Info</Nav.Link>
        </Nav>
      </Navbar>

      <Container fluid id="visualizer" className="mb-3">
        <VolumeProvider>
          <ControlsPanel />
          <VolumeRenderer />
        </VolumeProvider>
      </Container>

      <Container fluid id="information" className="bg-secondary text-light">
        <Row className="justify-content-md-center py-5">
          <Col xs={8}>
            <div className="d-flex flex-column">
              <h1 className="my-4">
                Narragansett Bay Volume Renderer
              </h1>

              <p className="my-4">
                The main goal of the project is to provide an easily accessible and interactive
                environment to explore and showcase volumetric Naragansett Bay data with the added
                benefits of Virtual Reality If VR-capable hardware is available.<br/>
              </p>

              <h2 className="mt-4 text-center">
                Learn How To Use the Volume Renderer
              </h2>
              <Button variant="primary" onClick={() => setShowHowto(true)}  className="mb-4">Launch Instructions</Button>

              <Howto
                show={showHowto}
                close={() => setShowHowto(false)}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
