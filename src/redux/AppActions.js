
export const myChecButtonAction = function fetchCheckBox(value){
    return{
        type:"CHECKBOX_CHANGED",
        payload: value,
    }
}

export const myXSlideAction = function fetchXSlide(valueMin,valueMax){
    return{
        type:"XSLIDE_CHANGED",
        payload: valueMin,
        payload2: valueMax,
    }
}

export const myYSlideAction = function fetchYSlide(valueMin,valueMax){
    return{
        type:"YSLIDE_CHANGED",
        payload: valueMin,
        payload2: valueMax,
    }
}

export const myZSlideAction = function fetchZSlide(valueMin,valueMax){
    return{
        type:"ZSLIDE_CHANGED",
        payload: valueMin,
        payload2: valueMax,
    }
}

export const myChangeVolumeAction = function changeVolume(value1,value2){
    return{
        type:"VOLUME_CHANGED",
        payload: value1,
        payload2: value2
    }
}
export const myChangeColorMapAction = function changeColorMap(value){
    return{
        type:"COLOR_MAP_CHANGED",
        payload: value,
    }
}
export const myChangePoint1 = function changePoint1(value){
    return{
        type:"OPACITY1_CHANGED",
        payload: value,
    }
}
export const myChangePoint2 = function changePoint2(value){
    return{
        type:"OPACITY2_CHANGED",
        payload: value,
    }
}

export const myChangeLowNode = function changeLowNode(value){
    return{
        type:"LOW_NODE_CHANGED",
        payload: value,
    }
}
export const myChangeHighNode = function changeHighNode(value){
    return{
        type:"HIGH_NODE_CHANGED",
        payload: value,
    }
}