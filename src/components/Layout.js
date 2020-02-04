

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
              The Center for Computation and Visulization at Brown University (<a href="https://ccv.brown.edu/">CCV</a>)
              is always searching and developing tools to help researchers visualizating and analizing their data.
              Thinking on how to facilitate the access to scienctific data from any type of device and location, and using 
              the latests techonologies on web development and web 3D rendering and Virtual Reality (VR), this application 
              is presented as a an initative to address those goals.<br/>
               

              This is a VR - web 3D volume visualizer application built on top of webgl and <a href="https://aframe.io/">aframe</a>.
              The main goal is to provide a shared and interactive environment to explore volume data, plus the benefits of VR.
              CCV encourages researchers from any field and background interested on using this applicaiton, and to contact us on how 
              it can be used on your studies.<br/>

              The visualization group at CCV is in charge of implementing applications to display 3D data on any kind of Desktop,
              web browser and VR devices. With Over 5 years of experience, it has helped developing projects for the 

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
