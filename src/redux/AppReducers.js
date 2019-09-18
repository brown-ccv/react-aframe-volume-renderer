
const initialState = {
    checkBoxValue: false,
    xSlideValue: 0,
    ySlideValue: 0,
    zSlideValue: 0,
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
                return { xSlideValue : action.payload};
            }
        case "YSLIDE_CHANGED":
            {
                return { ySlideValue : action.payload};
            }
        case "ZSLIDE_CHANGED":
            {
                return { zSlideValue : action.payload};
            }
        case "VOLUME_CHANGED":
            {
                return { volumeData : action.payload,
                    transferFunction: action.payload2
                };
            }                 
                
    }
    return state;
}
