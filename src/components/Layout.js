

import React, {Component} from 'react'
import Controls from './Controls';
import VolumeRenderer from './VolumeRenderer';
import {Sidebar} from 'primereact/sidebar';
//import {Button} from 'primereact/button';

import ScrollAnim from 'rc-scroll-anim';
import '../styles/scroll_nav.scss';
import '../App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { ReactComponent as CCVLogo } from '../assets/black-ccv-logo.svg';
import { ReactComponent as BrownLogo } from '../assets/brown-logo.svg';
import { ReactComponent as Github} from '../assets/github-brands.svg';

import Kalvin from './kalkal.jpg';
import Camilo from './camilo.jpg';
import Ben from './ben.jpg';

import Flexbox from 'flexbox-react';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

// const Link = ScrollAnim.Link;
// const Element = ScrollAnim.Element;
// const EventListener = ScrollAnim.Event;

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

      <div>  
       {/*  <Sidebar modal={false} className="ui-sidebar-lg" visible={this.state.sideBarVisible} onHide={(e) => this.setState({sideBarVisible:false})}>
           <Controls/>
    </Sidebar> */}

        <Navbar bg="light" expand="lg">
          <div className="navbar-header">
            <a href="https://www.brown.edu">
                <BrownLogo width={100} />
            </a>
            &nbsp;&nbsp;
            <a href="https://ccv.brown.edu">
                <CCVLogo width={100}/>
            </a>
          </div>
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >
                <BrownLogo width={100} />
              </Link> */}
              {/* <Link activeClass="active" className="test1 text-color" to="infoTarget" spy={true} smooth={true} duration={500} >Info&nbsp;</Link>
              <Link activeClass="active" className="test1" to="peopleTarget" spy={true} smooth={true} duration={500} >&nbsp;People</Link> */}
              <Nav.Link href="#infoTarget">Info</Nav.Link>
              <Nav.Link href="#peopleTarget">People</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <div className="d-flex flex-column" id="app">
          
            {/*<div className="control-button my-3 mx-5">
              <Button icon="pi pi-arrow-right" label="Controls" onClick={(e) => this.setState({sideBarVisible:true})}/>
            </div>*/}

            <div className="voume-renderer mx-1">
              <VolumeRenderer/>
            </div>
        </div>

        <Element name="infoTarget" className="element">
          <div id="infoTarget" class="light-page">
            <div className="light-page-title" key="title">
              <p>Web VR Volume Renderer</p>
            </div>
            <p className="light-page-description">
            <p>
            The Center for Computation and Visulization at Brown University (<a href="https://ccv.brown.edu/">CCV</a>)
is always searching and developing tools to help researchers visualizating and analizing their data.
Thinking on how to facilitate the access to scienctific data from any type of device and location, and using
the latests techonologies on web development, web 3D rendering and Virtual Reality (VR), this application
is presented as a an initative to address those goals.<br/>
</p>
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
            </p>
          </div>
        </Element>

        <Element name="peopleTarget" className="element">
          <div id="peopleTarget" class="light-page-new">
            <div className="light-page-title" key="title">
              <p>People</p>
            </div>
            <p className="light-page-description flex-adjustments">             
              <Flexbox display="flex" flexDirection="row" justifyContent="space-around" minHeight="100vh">
                <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                  <Flexbox display="flex" flexDirection="column">
                    <img src={Camilo} height="200px"></img>
                    <div>
                      <a href="mailto:camilo_diaz@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Camilo Diaz</a>
                      <br /><a href="https://github.com/kmilo9999" target="_blank"><Github width={30} /></a>
                    </div>
                  </Flexbox>
                </Flexbox>
                <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                  <Flexbox display="flex" flexDirection="column">
                    <img src={Ben} height="200px"></img>
                    <div>
                      <a href="mailto:benjamin_knorlein@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Benjamin Knörlein</a>
                      <br /><a href="https://github.com/BenKnorlein" target="_blank"><Github width={30} /></a>
                    </div>
                  </Flexbox>
                </Flexbox>
                <Flexbox element="div" justifyContent="center" height="60px" width="33%">
                  <Flexbox display="flex" flexDirection="column">
                    <img src={Kalvin} height="200px"></img>
                    <div>
                      <a href="mailto:kalvin_lam@brown.edu?Subject=Interest in AFrame Viewer" target="_top">Kalvin Lam</a>
                      <br /><a href="https://github.com/theklam" target="_blank"><Github width={30} /></a>
                    </div>
                  </Flexbox>
                </Flexbox>
              </Flexbox>
            </p>
          </div>
        </Element>
      
    </div>
       
    );

  }
}
