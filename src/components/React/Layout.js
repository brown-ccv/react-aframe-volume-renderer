import React, {Component} from 'react'
import Flexbox from 'flexbox-react';
import {Button} from 'primereact/button';
import { Element } from 'react-scroll'
import { Modal, Navbar, Nav, ModalTitle, ModalBody } from 'react-bootstrap';

import '../../styles/scroll_nav.scss';
import '../../App.css';

import VolumeRenderer from './VolumeRenderer';
import ControlsPanel from './ControlsPanel';
import Howto from './Howto'

import { ReactComponent as CCVLogo } from '../../assets/black-ccv-logo.svg';
import { ReactComponent as BrownLogo } from '../../assets/brown-logo.svg';
import { ReactComponent as Github} from '../../assets/github-brands.svg';
import Kalvin from './kalkal.jpg';
import Camilo from './camilo.jpg';
import Ben from './ben.jpg';
import NSFEPSCoR from './nsfepscor.jpg'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedHowto: false,
      openedNvidia: false,
      sideBarVisible:true,
    };
    //this.openGuide = this.openGuide.bind(this);
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({ count: prevState.count + 1 }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  toggleOpened() {
    this.setState(prevState => ({ openedHowto: !prevState.openedHowto }))
  }
  toggleOpened2() {
    this.setState(prevState => ({ openedNvidia: !prevState.openedNvidia }))
  }

  newWindowUnloaded() {
    this.setState({ opened: false })
  }

  render () {
    return (
      <div id="visualizer">  
        <Navbar sticky="top" bg="light" expand="lg">
          <div className="navbar-header">
            <a href="https://www.brown.edu"><BrownLogo width={100} /></a>
            &nbsp;&nbsp;
            <a href="https://ccv.brown.edu"><CCVLogo width={100}/></a>
          </div>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#visualizer">Vizualizer</Nav.Link>
              <Nav.Link href="#Guide">Guide</Nav.Link>
              <Nav.Link href="#infoTarget">Info</Nav.Link>
              <Nav.Link href="#peopleTarget">People</Nav.Link>
              <Nav.Link href="#acknowledgements ">Acknowledgements</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        {/* Volume Viewer */}
        <div className="d-flex flex-column" id="app">
          <div className="voume-renderer mx-1">  
            <ControlsPanel/>
            <VolumeRenderer/>
          </div>
        </div>

        <Element name="Guide" className="element">
          <div  id="Guide" className="light-page-new-short">
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="light-page-subtitle">
              <p>Learn How To Use it</p>
              <Button label="Guide" onClick={() => this.toggleOpened()} />
              <Modal
                size="lg"
                backdrop="static"
                keyboard={false}
                show={this.state.openedHowto}
              >
                <ModalHeader closeButton>
                  <ModalTitle>Guide</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <Howto />
                </ModalBody>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => this.toggleOpened()}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <br/>
          </div>
        </Element>

        <Element name="infoTarget" className="element">
          <div id="infoTarget" className="light-page-long">
            <div className="light-page-title" key="title">
              <p>Web VR Volume Renderer</p>
            </div>
            
            <div className="light-page-description">

              <p>
                The Center for Computation and Visualization at Brown 
                University (<a href="https://ccv.brown.edu/">CCV</a>)
                is always searching and developing tools to help researchers visualizations and analyzing their data.
                Thinking on how to facilitate the access to scientific data from any type of device and location, and using
                the latests technologies on web development, web 3D rendering and Virtual Reality (VR), this application
                is presented as a an initiative to address those goals.<br/>
              </p>
            </div>
            
            <div className="light-page-description">
              <p>
                This page demonstrates a VR-capable 3D volume visualization tool built
                on top of webgl and <a href="https://aframe.io/">aframe</a>. The main
                goal of the project is to provide an easily accessible and interactive
                environment to explore and showcase volumetric data with the added
                benefits of Virtual Reality if VR-capable hardware is available. (<a
                href="https://ccv.brown.edu/">CCV</a>) encourages researchers from any
                field and background interested in using this application to contact us
                about how it can be used for your research projects.<br/>
              </p>
            </div>

            <div className="light-page-description">
              <p>
                CCV's goal is to help researchers in visualizing and analyzing their
                data and provides tools which facilitate the access to scientific data
                from any type of device and location by using the latest technologies on
                web development, 3D web rendering and Virtual Reality (VR). With over 5
                years of experience, it has assisted researchers in projects at Brown
                University and affiliated RI institutions.<br/>
              </p>
              <p>
                This work was supported by the NSF EPSCoR grant 1655221: "RII Track-1:
                Rhode Island Consortium for Coastal Ecology Assessment, Innovation, and
                Modeling (C-AIM)"<br/>
              </p>
            </div>
          </div>
        </Element>

        <Element name="peopleTarget" className="element">
          <div id="peopleTarget" className="light-page-new">
            <div className="light-page-title" key="title">
              <p>People</p>
            </div>
                       
            <Flexbox display="flex" flexDirection="row" justifyContent="space-around" minHeight="100vh">
              <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                <Flexbox display="flex" flexDirection="column">
                  <img src={Camilo} alt="Camilo" height="200px" />
                  <div>
                    <a className="peopleLink" href="mailto:camilo_diaz@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Camilo Diaz</a>
                    <br />
                    <a className="peopleLink" href="https://github.com/kmilo9999" target="_blank" rel="noopener noreferrer"><Github width={30} /></a>
                  </div>
                </Flexbox>
              </Flexbox>
              <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                <Flexbox display="flex" flexDirection="column">
                  <img src={Ben} alt="Ben" height="200px" />
                  <div>
                    <a className="peopleLink" href="mailto:benjamin_knorlein@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Benjamin Knörlein</a>
                    <br />
                    <a className="peopleLink" href="https://github.com/BenKnorlein" target="_blank" rel="noopener noreferrer"><Github width={30} /></a>
                  </div>
                </Flexbox>
              </Flexbox>
              <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                <Flexbox display="flex" flexDirection="column">
                  <img src={Kalvin} alt="Kevin" height="200px" />
                  <div>
                    <a className="peopleLink" href="mailto:kalvin_lam@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Kalvin Lam</a>
                    <br />
                    <a className="peopleLink" href="https://github.com/theklam" target="_blank" rel="noopener noreferrer"><Github width={30} /></a>
                  </div>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </div>
        </Element>

        <Element name="acknowledgements" className="element">
          <div id="acknowledgements" className="light-page">
             <div className="light-page-title" key="title">
              <p>Acknowledgements</p>
             </div>

             <div className="light-page-description">
               <p>
                  The development of framework for the volume visualization was supported by the 
                  NSF EPSCoR grant 1655221: "RII Track-1: Rhode Island Consortium for Coastal 
                  Ecology Assessment, Innovation, and Modeling (C-AIM)"
               </p>
             </div>

            <Flexbox display="flex" flexDirection="row" justifyContent="space-around" minHeight="100vh">
              <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                <Flexbox display="flex" flexDirection="column">
                  <img src={NSFEPSCoR} alt="Rhode Island NSF EPSCoR"/>
                </Flexbox>
              </Flexbox>
            </Flexbox>
          </div>
        </Element>
      </div>
    );
  }
}
