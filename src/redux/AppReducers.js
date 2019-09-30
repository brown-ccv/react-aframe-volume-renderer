
const initialState = {
    checkBoxValue: false,
    xSlideValueMin: 0,
    xSlideValueMax: 0,
    ySlideValueMin: 0,
    ySlideValueMax: 0,
    zSlideValueMin: 0,
    zSlideValueMax: 0,
    volumeData:"",
    transferFunction: false
  };
  

export const myReducer = function readCheckBox(state ={initialState},action){
  
    switch(action.type )
    {
        case "CHECKBOX_CHANGED":
            {
                return { checkBoxValue : action.payload};
            }
        
        case "XSLIDE_CHANGED":
            {
                return { xSlideValueMin : action.payload,
                    xSlideValueMax : action.payload2
                };
            }
        case "YSLIDE_CHANGED":
            {
                return { ySlideValueMin : action.payload,
                    ySlideValueMax : action.payload2};
            }
        case "ZSLIDE_CHANGED":
            {
                return { zSlideValueMin : action.payload,
                    zSlideValueMax : action.payload2};
            }
        case "VOLUME_CHANGED":
            {
                return { volumeData : action.payload,
                    transferFunction: action.payload2
                };
            }                 
        default:
            {
                return { checkBoxValue : false,
                    transferFunction: action.payload2
                };
            }            
    }
    
}
