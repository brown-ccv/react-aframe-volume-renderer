
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

export const myYSlideAction = function fetchXSldie(value){
    return{
        type:"YSLIDE_CHANGED",
        payload: value,
    }
}

export const myZSlideAction = function fetchXSldie(value){
    return{
        type:"ZSLIDE_CHANGED",
        payload: value,
    }
}

export const myChangeVolumeAction = function changeVolume(value1,value2){
    return{
        type:"VOLUME_CHANGED",
        payload: value1,
        payload2: value2
    }
}