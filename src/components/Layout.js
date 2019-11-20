

import React, {Component} from 'react'
import Controls from './Controls';
import VolumeRenderer from './VolumeRenderer';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';

import ScrollAnim from 'rc-scroll-anim';
import '../styles/scroll_nav.scss';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const EventListener = ScrollAnim.Event;

export default class Layout extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      sideBarVisible:false,
    };
  }

  render () {
    return (

      <div>  
         <Sidebar modal={false} className="ui-sidebar-lg" visible={this.state.sideBarVisible} onHide={(e) => this.setState({sideBarVisible:false})}>
           <Controls/>
        </Sidebar>

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        
        <div className="d-flex flex-column">
          
            <div className="control-button my-3 mx-5">
              <Button icon="pi pi-arrow-right" label="Controls" onClick={(e) => this.setState({sideBarVisible:true})}/>
            </div>

            <div className="voume-renderer mx-1">
              <VolumeRenderer/>
            </div>
        </div>
        
        <p>The Socio-Ecological City Project (SECP) is an intensive data collection effort 
                    focused on assembling a comprehensive longitudinal geospatial dataset to better 
                    understand the changing relationships between people, industrial hazards, and nature. 
                    Focused on socio-environmental change in the city of Providence, RI over the past century, 
                    the SECP has compiled information on every manufacturing facility operating in the state since 1953.
                    We have also collected information on all parks, playgrounds, 
                    cemeteries and schools that have existed in Providence since 1915. 
                    Currently, we are compiling additional geospatial data that inventories hazardous retail sites
                    such as gas stations, dry cleaners, and auto repair shops. When complete, the data and related 
                    visual and statistical analyses will become available to the public through this website. 
                    Our hope is that by making visible a treasure trove of lost historical knowledge about urban 
                    land use (residential, industrial, and commercial) the website will function as a platform and 
                    research tool for strengthening and forging new relationships with policymakers, planners, 
                    regulatory agencies, and community and social justice organizations. 
                    The SECP is committed to working toward environmental justice and the reduction or elimination 
                    of environmental exposures, and promoting public health by assisting state regulators and
                    legislators with systematic analyses of proposed and existing environmental health policies and 
                    regulations. This website and research is supported by funds from the 
                    <a href="https://www.niehs.nih.gov/"> National Institute of Environmental Health Sciences </a> through Brown University’s  
                    <a href="https://www.brown.edu/research/projects/superfund/"> Superfund Research Program </a>, the <a href="https://www.brown.edu/academics/institute-environment-society/">Institute at Brown for Environment and Society</a>, 
                    and seed grants from <a href="https://www.brown.edu/research/">Brown University Office of the Vice President for Research</a>, and <a href="https://www.brown.edu/initiatives/social-science-research/">Social 
                    Science Research Institute</a>. Website design provided by the Brown University <a href="https://brown.edu/cis/data-science/">Data Science 
                    Practice</a> group.</p>
    
    </div>
       
    );

  }
}
