
const initialState = {
    checkBoxValue: false,
    xSlideValue: 0
  };
  

export const myReducer = function readCheckBox(state ={initialState},action){
  
    switch(action.type )
    {
        case "CHECKBOX_CHANGED":
            {
                return { checkBoxValue :  action.payload};
            }
        
        case "XSLIDE_CHANGED":
            {
                return { xSlideValue : action.payload};
            }
                
    }
    return state;
}
