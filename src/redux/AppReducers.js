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
  colorMap: "",
  opacity1: 0,
  opacity2: 1,
  lowNode: 0,
  highNode: 1,
  alphaXDataArray: null,
  alphaYDataArray: null,
  currentColorMap: "",
  channel: 6,
};

export const myReducer = function readCheckBox(
  state = { initialState },
  action
) {
  switch (action.type) {
    case "CHECKBOX_CHANGED": {
      return {
        checkBoxValue: action.payload,
        volumeData: action.payload2,
      };
    }
    case "XSLIDE_CHANGED": {
      return {
        xSlideValueMin: action.payload,
        xSlideValueMax: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "YSLIDE_CHANGED": {
      return {
        ySlideValueMin: action.payload,
        ySlideValueMax: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "ZSLIDE_CHANGED": {
      return {
        zSlideValueMin: action.payload,
        zSlideValueMax: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "VOLUME_CHANGED": {
      return {
        volumeData: action.payload,
        volumeData2: action.payload,
        transferFunction: action.payload2,
      };
    }
    case "COLOR_MAP_CHANGED": {
      return {
        colorMap: action.payload,
        transferFunction: action.payload !== "" ? true : false,
        volumeData: action.payload2,
      };
    }
    case "OPACITY1_CHANGED": {
      return {
        opacity1: action.payload,
      };
    }
    case "OPACITY2_CHANGED": {
      return {
        opacity2: action.payload,
      };
    }
    case "LOW_NODE_CHANGED": {
      return {
        lowNode: action.payload,
      };
    }
    case "HIGH_NODE_CHANGED": {
      return {
        highNode: action.payload,
      };
    }
    case "UPDATED_APLHA_DATA": {
      return {
        alphaXDataArray: action.payload,
        alphaYDataArray: action.payload2,
        volumeData: action.payload3,
      };
    }
    case "SAVE_COLOR_DATA": {
      return {
        currentColorMap: action.payload,
      };
    }
    case "CHANNEL_CHANGED": {
      return {
        channel: action.payload,
        volumeData: action.payload2,
      };
    }
    default: {
      return {
        checkBoxValue: false,
        transferFunction: false,
        volumeData: "",
        currentColorMap: "",
      };
    }
  }
};
