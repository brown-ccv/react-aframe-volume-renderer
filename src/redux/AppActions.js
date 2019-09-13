
export const myChecButtonAction = function fetchCheckBox(value){
    return{
        type:"CHECKBOX_CHANGED",
        payload: value,
    }
}

export const myXSlideAction = function fetchXSldie(value){
    return{
        type:"XSLIDE_CHANGED",
        payload: value,
    }
}