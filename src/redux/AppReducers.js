import config from "../assets/config.json"

const initialState = {
  checkBoxValue: false,
  xSlideValueMin: 0,
  xSlideValueMax: 0,
  ySlideValueMin: 0,
  ySlideValueMax: 0,
  zSlideValueMin: 0,
  zSlideValueMax: 0,
  volumeData: "",
  transferFunction: false,
  colorMap: config.colorMaps[0],
  opacity1: 0,
  opacity2: 1,
  lowNode: 0,
  highNode: 1,
  // alphaXDataArray: null,
  // alphaYDataArray: null,
  alphaXDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
  alphaYDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
  currentColorMap: "",
  channel: 6,
};

export const myReducer = function readCheckBox(
  // state = { initialState },
  state = initialState,
  action
) {
  switch (action.type) {
    case "CHECKBOX_CHANGED": {
      return {
        ...state,
        checkBoxValue: action.payload,
        volumeData: action.payload2,
      };
    }
    case "XSLIDE_CHANGED": {
      return {
        ...state,
        xSlideValueMin: action.payload,
        xSlideValueMax: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "YSLIDE_CHANGED": {
      return {
        ...state,
        ySlideValueMin: action.payload,
        ySlideValueMax: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "ZSLIDE_CHANGED": {
      return {
        ...state,
        zSlideValueMin: action.payload,
        zSlideValueMax: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "VOLUME_CHANGED": {
      return {
        ...state,
        volumeData: action.payload,
        volumeData2: action.payload,
        transferFunction: action.payload2,
      };
    }
    case "COLOR_MAP_CHANGED": {
      return {
        ...state,
        colorMap: action.payload,
        transferFunction: action.payload !== "" ? true : false,
        volumeData: action.payload2,
      };
    }
    case "OPACITY1_CHANGED": {
      return {
        ...state,
        opacity1: action.payload,
      };
    }
    case "OPACITY2_CHANGED": {
      return {
        ...state,
        opacity2: action.payload,
      };
    }
    case "LOW_NODE_CHANGED": {
      return {
        ...state,
        lowNode: action.payload,
      };
    }
    case "HIGH_NODE_CHANGED": {
      return {
        ...state,
        highNode: action.payload,
      };
    }
    case "UPDATED_APLHA_DATA": {
      return {
        ...state,
        alphaXDataArray: action.payload,
        alphaYDataArray: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "SAVE_COLOR_DATA": {
      return {
        ...state,
        currentColorMap: action.payload,
      };
    }
    case "CHANNEL_CHANGED": {
      return {
        ...state,
        channel: action.payload,
        volumeData: action.payload2,
      };
    }
    default: {
      return {
        checkBoxValue: state.checkBoxValue,
        // xSlideValueMin: 0,
        // xSlideValueMax: 0,
        // ySlideValueMin: 0,
        // ySlideValueMax: 0,
        // zSlideValueMin: 0,
        // zSlideValueMax: 0,
        volumeData: state.volumeData,
        transferFunction: state.transferFunction,
        colorMap: state.colorMap,
        opacity1: state.opacity1,
        opacity2: state.opacity2,
        lowNode: state.lowNode,
        highNode: state.highNode,
        alphaXDataArray: state.alphaXDataArray,
        alphaYDataArray: state.alphaYDataArray,
        currentColorMap: state.currentColorMap,
        channel: state.channel,

        // checkBoxValue: false,
        // transferFunction: false,
        // volumeData: "",
        // currentColorMap: "",
        // alphaXDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
        // alphaYDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
      };
    }
  }
};
