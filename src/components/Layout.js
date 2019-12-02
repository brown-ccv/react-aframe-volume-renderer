

import React, {Component} from 'react'
import Controls from './Controls';
import VolumeRenderer from './VolumeRenderer';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';

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

        <div className="d-flex flex-column">
          
            <div className="control-button my-3 mx-5">
              <Button icon="pi pi-arrow-right" label="Controls" onClick={(e) => this.setState({sideBarVisible:true})}/>
            </div>

            <div className="voume-renderer mx-1">
              <VolumeRenderer/>
            </div>
        </div>
    
    </div>
       
    );

  }
}
