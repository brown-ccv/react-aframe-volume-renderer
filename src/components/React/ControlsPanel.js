import React, {Component} from 'react'

import { myChangeVolumeAction} from '../../redux/AppActions'
import {connect} from 'react-redux';

import Controls from './Controls';
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';

import {SelectButton} from 'primereact/selectbutton';
import Flexbox from 'flexbox-react';

const options = [
    { value: './assets/models/nrrd/00.nrrd:false', label: 'Spheroid' },
    { value: './assets/models/nrrd/simulation_data.nrrd:false', label: 'Simulation' },
    
  ];

export default connect(null,{myChangeVolumeAction})
   ( class ControlPanel extends Component{

    constructor(props)
    {
      super(props);
      this.state = {
        sideBarVisible:true,
        currentData: null,
        currentVolume:"",
      };
      
      this.volumeSelectChanged = this.volumeSelectChanged.bind(this);
    }

    volumeSelectChanged = (selected) =>
    {
      this.setState({
       currentVolume: selected.value,
       currentData:selected
       });
      
       if(selected.value != null)
       {
        var volumeProperties = selected.value.split(":");
        this.props.myChangeVolumeAction(volumeProperties[0],volumeProperties[1]);
       }
       else{
       
        this.props.myChangeVolumeAction("","");
       }
      
    };

    render () {
        return (
            <div className="voume-renderer mx-1">
              
            <div className="control-button my-3 mx-5">
            <Flexbox display="flex" flexDirection="row" justifyContent="center">
                <Flexbox element="div" justifyContent="space-between" >
                  
                    <Button icon="pi pi-arrow-right" label="Controls" onClick={(e) => this.setState({sideBarVisible:true})}/>
                  
                </Flexbox>
                <Flexbox element="div" justifyContent="center" >
                  
                  <SelectButton value={this.state.currentVolume} options={options} onChange={this.volumeSelectChanged}></SelectButton>
                  
                </Flexbox>
            </Flexbox>
              
            
            </div>
            <Sidebar modal={false} 
               className="ui-sidebar-sm" 
               visible={this.state.sideBarVisible} 
               onHide={(e) => this.setState({sideBarVisible:false})}
               style={{width:'20em', height:'45em'}}    >
               <Controls/>
            </Sidebar> 
          </div>
        );

    }
})