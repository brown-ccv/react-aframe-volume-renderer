import React, {Component} from 'react'

import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import {connect} from 'react-redux';
import {myChecButtonAction,myXSlideAction, myYSlideAction,myZSlideAction,myChangeVolumeAction,myChangeColorMapAction} from '../redux/AppActions'
import Select from 'react-select'
import ReactModal from 'react-modal';
import DataTable from 'react-data-table-component'
//import {Modal} from './ColorMapControl'
import OpacityControl from './OpacityControl'
const options = [
  { value: './assets/models/nrrd/00.nrrd:false', label: 'Spheroid' },
  { value: './assets/models/nrrd/simulation_data.nrrd:false', label: 'Simulation' },
  
];

const data = [
  { 
    name: 'default',
    image: ''
  },
  { 
    name: 'natural',
    image: './colormaps/natural.png'
  },
  {
    name: 'viridis',
    image: './colormaps/viridis.png'
  },
  {
    name: 'colors',
    image: './colormaps/colors.png'
  },
  {
    name: 'white black',
    image: './colormaps/whiteblack.png'
  },

];

const columns = [
  {
    name: 'Color Map',
    selector: 'colormap',
    cell: d => <img height="15x" width="100px"  src={d.image} />,
  },
  {
    name: 'Name',
    selector: 'name',

  },
  
]
const Range = Slider.Range;


export default connect(
     null,
    {myChecButtonAction,myXSlideAction,myYSlideAction,myZSlideAction,myChangeVolumeAction,myChangeColorMapAction})
    ( class Controls extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
        currentVolume:"",
        actiavePlane: false,
        xslideValue: 0,
        yslideValue: 0,
        zslideValue: 0,
        colorMapModal: false,
        currentMapColor:""
      };

      this.handleCheckBoxInputChange = this.handleCheckBoxInputChange.bind(this);

      this.xSlideHandleChange = this.xSlideHandleChange.bind(this);
      this.ySlideHandleChange = this.ySlideHandleChange.bind(this);
      this.zSlideHandleChange = this.zSlideHandleChange.bind(this);
      this.volumeSelectChanged = this.volumeSelectChanged.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleDataTableSelected = this.handleDataTableSelected.bind(this);
      this.showModal =  this.showModal.bind(this);
      this.datatable = this.datatable.bind(this);
      this.options  = ['one', 'two', 'three'];

      
 }


 handleCheckBoxInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  //this.props.myChecButtonAction(value);
  this.setState({
    [name]: value
  });
}

  showModal  = () => {
     this.setState({ colorMapModal: true });
  };

  handleCloseModal () {
    this.setState({ colorMapModal: false });
  }

  xSlideHandleChange = (value) => {
    
    this.setState({
      xslideValue:value,
    });

   this.props.myXSlideAction(value[0],value[1]);
  };

  ySlideHandleChange = (value) => {
    this.setState({
      yslideValue:value,
    });

   this.props.myYSlideAction(value[0],value[1]);
  };

  zSlideHandleChange = (value) => {
    this.setState({
      zslideValue:value,
    });

   this.props.myZSlideAction(value[0],value[1]);
  };

  volumeSelectChanged = (selected) =>
  {
     this.setState({
      currentVolume: selected.value
     });
     var volumeProperties = selected.value.split(":");
     
     this.props.myChangeVolumeAction(volumeProperties[0],volumeProperties[1]);
  };

  datatable ()
  {
    return  (
      <DataTable
      title="Color Maps"
      columns={columns}
      data={data}
      highlightOnHover
      selectableRows
      onRowSelected={this.handleDataTableSelected}
      />
    );
  }

  handleDataTableSelected= (state) => { 
    //console.log('Selected Rows: ', state.selectedRows[0].image);
    if(state.selectedRows[0] != undefined)
    {
      
      console.log("state.selectedRows[0].image " +state.selectedRows[0].image);
      
      
      this.props.myChangeColorMapAction(state.selectedRows[0].image);

      this.setState({
        currentMapColor:state.selectedRows[0].image
       });
    }
    
  };

  componentWillMount() {
    ReactModal.setAppElement('body');
  }
render () {
  let colorMapSelection;
  if(this.state.currentMapColor != '')  
  {
    colorMapSelection = <img className="colorMapImg" src={this.state.currentMapColor} alt="color map" height="15" width="100"></img>       
  }
  else{
    colorMapSelection = ''; 
  }

  return (
      <div id="controls" className="controls-container" >
       
        <label>Volume</label>
        <br/>
        <Select options={options} onChange={this.volumeSelectChanged} />
        <div> 
       
       <label>
        <br/>
          Enable Color Map &nbsp;
         <input
           name="activateColorMapping"
           type="checkbox"
           checked={this.state.actiavePlane}
           onChange={this.handleCheckBoxInputChange}
           />
         </label>
       
        <div className="color-map-control">
        
        {
          /*<img className="colorMapImg" src="" alt="color map" height="15" width="100"></img> */
          colorMapSelection
        }
        
        <br/>
        <button type= "button" onClick={this.showModal}>
          color map
        </button>
        <br/>
        </div>
        <br/>
        <OpacityControl/>
       </div>
       
       {/*
       <label>
       <br/>
        Enable Slice &nbsp;
        <input
          name="actiavePlane"
          type="checkbox"
          checked={this.state.actiavePlane}
          onChange={this.handleCheckBoxInputChange}
          />
       </label>
       */}
         <br/> 
         <div className="slices-container" >
         <label>
            X Slide <br/>

         </label>
         {/*  <Slider min={0} max={1} step={0.1}  value={this.state.xslideValue} onChange={this.xSlideHandleChange}/> --> */}
         <Range allowCross={false} step={0.0009} defaultValue={[0, 1]} min={0} max={1} onChange={this.xSlideHandleChange}/>

         <br/>

         <label>
         Y Slide <br/>
         </label>
         <Range allowCross={false} step={0.0009} defaultValue={[0, 1]} min={0} max={1} onChange={this.ySlideHandleChange}/>
         <br/>

         <label>
         Z Slide <br/>
         </label>
         <Range allowCross={false} step={0.0009} defaultValue={[0, 1]} min={0} max={1} onChange={this.zSlideHandleChange}/>
         </div>

         <ReactModal 
           isOpen={this.state.colorMapModal}
           contentLabel="Minimal Modal Example"
        >
          { this.BasicSelectable  = this.datatable()
          }
          
          
          <button onClick={this.handleCloseModal}>Apply</button>
        </ReactModal>
      </div>

  );
}
})
