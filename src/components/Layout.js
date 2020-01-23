

import React, {Component} from 'react'
import Controls from './Controls';
import VolumeRenderer from './VolumeRenderer';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';

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
         <Sidebar modal={false} className="ui-sidebar-lg" visible={this.state.sideBarVisible} onHide={(e) => this.setState({sideBarVisible:false})}>
           <Controls/>
        </Sidebar>

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
          <Navbar.Brand href="#home">Web VR Volume Renderer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >
                <BrownLogo width={100} />
              </Link> */}
              <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} >Info&nbsp;</Link>
              <Link activeClass="active" className="test1" to="test2" spy={true} smooth={true} duration={500} >&nbsp;People</Link>
              {/* <Nav.Link href="#app">App</Nav.Link> */}
              {/* <Nav.Link href="#info">Info</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <div className="d-flex flex-column" id="app">
          
            <div className="control-button my-3 mx-5">
              <Button icon="pi pi-arrow-right" label="Controls" onClick={(e) => this.setState({sideBarVisible:true})}/>
            </div>

            <div className="voume-renderer mx-1">
              <VolumeRenderer/>
            </div>
        </div>

        <Element name="test1" className="element">
          <div id="info" class="light-page">
            <div className="light-page-title" key="title">
              <p>Web VR Volume Renderer</p>
            </div>
            <p className="light-page-description">
              
              A web based volume visualizer application to support scientific 3D data built on top of webgl that will facilitate the access from any web browser, plus the benefits of VR.

              It was implemented using A-frame, a javascript framework easy to learn, use and deploy. It sits on top of Three.js, which is the most used library to support 3D rendering on the web, and html which is the common tool to write static web pages. A-frame follows a composed based pattern, common on game and graphics engines. Additionally, it uses node js to easy deploy the modules the application is based on.
            </p>
          </div>
        </Element>

        <Element name="test2" className="element">
          <div id="info" class="light-page-new">
            <div className="light-page-title" key="title">
              <p>People</p>
            </div>
            <p className="light-page-description">
              
              A web based volume visualizer application to support scientific 3D data built on top of webgl that will facilitate the access from any web browser, plus the benefits of VR.

              It was implemented using A-frame, a javascript framework easy to learn, use and deploy. It sits on top of Three.js, which is the most used library to support 3D rendering on the web, and html which is the common tool to write static web pages. A-frame follows a composed based pattern, common on game and graphics engines. Additionally, it uses node js to easy deploy the modules the application is based on.
            </p>
          </div>
        </Element>
      
    </div>
       
    );

  }
}
