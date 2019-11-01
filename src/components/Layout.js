import ScrollAnim from 'rc-scroll-anim';

import React, {Component} from 'react'
import Controls from './Controls';
import VolumeRenderer from './VolumeRenderer';

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const EventListener = ScrollAnim.Event;



export default class Layout extends Component {
  render () {
    return (

      <div>
        <div className="nav">
          <Link className="nav-list" to="page0">nav0</Link>
          <Link className="nav-list" to="page1">nav1</Link>
        </div>
        <Element className="pack-page" id="page0">
          <div class="d-flex flex-row justify-content-around mb-5 pb-5 mt-5">
            <div class="col-md-3 mt-5">
              <Controls/>
            </div>
            <div class="col-md-6">
              <VolumeRenderer/>
            </div>
          </div>
        </Element>
        <Element className="pack-page" id="page1">
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
        </Element>
        

        </div>
    );

  }
}
