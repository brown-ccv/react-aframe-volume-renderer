import React, {Component} from 'react'
import '../App.css'
import ReactModal from 'react-modal';
import DataTable from 'react-data-table-component'
import {connect} from 'react-redux';
import {myChangeColorMapAction} from '../redux/AppActions'

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
  

export default connect(
    null,
   {myChangeColorMapAction})
   ( class OpcacityControl extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            colorMapModal: false,
            currentMapColor:""
          };

        this.showModal =  this.showModal.bind(this);
        this.datatable = this.datatable.bind(this);
        this.handleDataTableSelected = this.handleDataTableSelected.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
      }

      showModal  = () => {
        this.setState({ colorMapModal: true });
     };

     handleCloseModal () {
        this.setState({ colorMapModal: false });
      }

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

    render () {
        let colorMapSelection;
        if(this.state.currentMapColor != '')  
        {
          colorMapSelection = <img className="colorMapImg" src={this.state.currentMapColor} alt="color map" height="15" width="100"></img>       
        }
        else{
          colorMapSelection = ''; 
        }
        return ( <div>
            <button type= "button" onClick={this.showModal}>
            color map
            </button>
            <br/>
            {
             /*<img className="colorMapImg" src="" alt="color map" height="15" width="100"></img> */
             colorMapSelection
            }
            <ReactModal 
            isOpen={this.state.colorMapModal}
            contentLabel="Minimal Modal Example"
           >
    
           { this.BasicSelectable  = this.datatable()
           }
           
           
           <button onClick={this.handleCloseModal}>Apply</button>
         </ReactModal>
         </div>);
   
    }
})
