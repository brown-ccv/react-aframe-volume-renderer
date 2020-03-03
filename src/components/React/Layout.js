

import React, {Component} from 'react'

import VolumeRenderer from './VolumeRenderer';
import ControlsPanel from './ControlsPanel';



import '../../styles/scroll_nav.scss';
import '../../App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { ReactComponent as CCVLogo } from '../../assets/black-ccv-logo.svg';
import { ReactComponent as BrownLogo } from '../../assets/brown-logo.svg';
import { ReactComponent as Github} from '../../assets/github-brands.svg';

import Kalvin from './kalkal.jpg';
import Camilo from './camilo.jpg';
import Ben from './ben.jpg';
import NSFEPSCoR from './nsfepscor.jpg'

import Flexbox from 'flexbox-react';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

export default class Layout extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      sideBarVisible:true,
    };
  }

  render () {
    return (

      <div id="visualizer">  
        <Navbar sticky="top" bg="light" expand="lg">
          <div className="navbar-header">
            <a href="https://www.brown.edu">
                <BrownLogo width={100} />
            </a>
            &nbsp;&nbsp;
            <a href="https://ccv.brown.edu">
                <CCVLogo width={100}/>
            </a>
          </div>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#visualizer">Vizualizer</Nav.Link>
              <Nav.Link href="#infoTarget">Info</Nav.Link>
              <Nav.Link href="#peopleTarget">People</Nav.Link>
              <Nav.Link href="#acknowledgements ">Acknowledgements</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <div className="d-flex flex-column" id="app">
            <div   className="voume-renderer mx-1">  
              <ControlsPanel/>
              <VolumeRenderer/>
            </div>
        </div>

        <Element name="infoTarget" className="element">
          <div id="infoTarget" className="light-page">
            <div className="light-page-title" key="title">
              <p>Web VR Volume Renderer</p>
            </div>
            
            <div className="light-page-description">

            <p>
              The Center for Computation and Visulization at Brown University (<a href="https://ccv.brown.edu/">CCV</a>)
              is always searching and developing tools to help researchers visualizating and analizing their data.
              Thinking on how to facilitate the access to scienctific data from any type of device and location, and using
              the latests techonologies on web development, web 3D rendering and Virtual Reality (VR), this application
             is presented as a an initative to address those goals.<br/>
              </p>
            </div>
            
            <div className="light-page-description">
              <p>
                This page demonstrates a VR-capable 3D volume visualization tool built
                on top of webgl and <a href="https://aframe.io/">aframe</a>. The main
                goal of the project is to provide an easily accessible and interactive
                environment to explore and showcase volumetric data with the added
                benefits of Virtual Reality if VR-capable hardware is available. The
                Center for Computation and Visualization at Brown University  (<a
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
                    <img src={Camilo} height="200px"></img>
                    <div >
                      <a className="peopleLink" href="mailto:camilo_diaz@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Camilo Diaz</a>
                      <br /><a className="peopleLink" href="https://github.com/kmilo9999" target="_blank"><Github width={30} /></a>
                    </div>
                  </Flexbox>
                </Flexbox>
                <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                  <Flexbox display="flex" flexDirection="column">
                    <img src={Ben} height="200px"></img>
                    <div>
                      <a className="peopleLink" href="mailto:benjamin_knorlein@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Benjamin Knörlein</a>
                      <br /><a className="peopleLink" href="https://github.com/BenKnorlein" target="_blank"><Github width={30} /></a>
                    </div>
                  </Flexbox>
                </Flexbox>
                <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                  <Flexbox display="flex" flexDirection="column">
                    <img src={Kalvin} height="200px"></img>
                    <div>
                      <a className="peopleLink" href="mailto:kalvin_lam@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Kalvin Lam</a>
                      <br /><a className="peopleLink" href="https://github.com/theklam" target="_blank"><Github width={30} /></a>
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
               The development of framework for the volume visualization was 
              supported by the NSF EPSCoR grant 1655221: "RII Track-1: Rhode Island Consortium for Coastal Ecology Assessment, Innovation, and Modeling (C-AIM)"
               </p>
               
             </div>
             <Flexbox display="flex" flexDirection="row" justifyContent="space-around" minHeight="100vh">
                <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                  <Flexbox display="flex" flexDirection="column">
                    <img src={NSFEPSCoR}></img>
                  </Flexbox>
                </Flexbox>
             </Flexbox>
        
          </div>
          </Element>
      
    </div>
       
    );

  }
}
