import React, {Component} from 'react'
import '../../App.css'
import ReactModal from 'react-modal';
//import DataTable from 'react-data-table-component'
import {connect} from 'react-redux';
import {myChangeColorMapAction, mySaveColorMappingState} from '../../redux/AppActions'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const mapStateToProps = state => {
  return { 
    
    volumeData: state.volumeData
   };
};

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const data = [
    { 
      name: 'viridis',
      image: <img height="15x" width="100px"  src='./colormaps/viridis.png' />
    },
    { 
      name: 'natural',
      image: <img height="15x" width="100px"  src='./colormaps/natural.png' />
    },
    {
      name: 'colors',
      image: <img height="15x" width="100px"  src='./colormaps/colors.png' /> 
    },
    {
      name: 'white black',
      image: <img height="15x" width="100px"  src='./colormaps/whiteblack.png' /> 
    },
  
  ];


  const columnsData = [
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
  mapStateToProps,
   {myChangeColorMapAction,mySaveColorMappingState})
   ( class ControlMappingController extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            colorMapSelected:'',
            colorMapModal: false,
            currentMapColor:"./colormaps/viridis.png"
          };

        this.showModal =  this.showModal.bind(this);
        this.datatable = this.datatable.bind(this);
        this.handleDataTableSelected = this.handleDataTableSelected.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentWillMount() {
        ReactModal.setAppElement('body');
       
    }
    
    componentWillUnmount() {

        //-- save state
       // console.log("componentWillUnmount: " +this.state.currentMapColor);
        this.props.mySaveColorMappingState(this.state.currentMapColor);
    }
      showModal  = () => {
        this.setState({ colorMapModal: true });
     };

     handleCloseModal () {

        this.props.myChangeColorMapAction(this.state.currentMapColor, this.props.volumeData);
        this.setState({ colorMapModal: false });
      }

     datatable ()
     {

       return  (
         
         <DataTable  value={data} style={{width: '350px'}}
            selection={this.state.colorMapSelected} onSelectionChange={this.handleDataTableSelected}>
            <Column selectionMode="single" />
           <Column field="image" header="Color" />
           <Column field="name" header="Name" />
         </DataTable>
       );
     }

     handleDataTableSelected= (state) => { 
     
        this.setState({
            colorMapSelected:state.value,
            currentMapColor:state.value.image.props.src
           });
        
      };

    render () {
        let colorMapSelection;
        if(this.state.currentMapColor != '')  
        {
          colorMapSelection = <img className="colorMapImg" src={this.state.currentMapColor} alt="color map" height="15" width={this.props.width}></img>       
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
            style={customStyles}
            contentLabel="Minimal Modal Example"
           >
    
           { this.BasicSelectable  = this.datatable()
           }
           
           <br/>
           <button onClick={this.handleCloseModal}>Apply</button>
         </ReactModal>
         </div>);
   
    }
})
