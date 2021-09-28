import config from "../assets/config.json";

const initialState = {
  checkBoxValue: false,
  xSlideValueMin: config.range.min,
  xSlideValueMax: config.range.max,
  ySlideValueMin: config.range.min,
  ySlideValueMax: config.range.max,
  zSlideValueMin: config.range.min,
  zSlideValueMax: config.range.max,
  transferFunction: false,
  colorMap: config.colorMaps[0],
  opacity1: 0,
  opacity2: 1,
  lowNode: 0,
  highNode: 1,
  alphaXDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
  alphaYDataArray: [0, 0.11739130434782609, 0.34782608695652173, 1],
  currentColorMap: "",
  channel: 6,
};

export const myReducer = function readCheckBox(state = initialState, action) {
  switch (action.type) {
    case "CHECKBOX_CHANGED": {
      return {
        ...state,
        checkBoxValue: action.payload,
      };
    }
    case "XSLIDE_CHANGED": {
      return {
        ...state,
        xSlideValueMin: action.payload,
        xSlideValueMax: action.payload2,
      };
    }
    case "YSLIDE_CHANGED": {
      return {
        ...state,
        ySlideValueMin: action.payload,
        ySlideValueMax: action.payload2,
      };
    }
    case "ZSLIDE_CHANGED": {
      return {
        ...state,
        zSlideValueMin: action.payload,
        zSlideValueMax: action.payload2,
      };
    }
    case "VOLUME_CHANGED": {
      return {
        ...state,
        transferFunction: action.payload2,
      };
    }
    case "COLOR_MAP_CHANGED": {
      return {
        ...state,
        colorMap: action.payload,
        transferFunction: action.payload !== "" ? true : false,
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
      };
    }
    case "CHANNEL_CHANGED": {
      return {
        ...state,
        channel: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};
