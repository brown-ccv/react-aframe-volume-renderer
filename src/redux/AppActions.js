export const myCheckButtonAction = function fetchCheckBox(value, value2) {
  return {
    type: "CHECKBOX_CHANGED",
    payload: value,
    payload2: value2,
  };
};

export const myXSlideAction = function fetchXSlide(
  valueMin,
  valueMax,
  volumeDataName
) {
  return {
    type: "XSLIDE_CHANGED",
    payload: valueMin,
    payload2: valueMax,
    payload3: volumeDataName,
  };
};

export const myYSlideAction = function fetchYSlide(
  valueMin,
  valueMax,
  volumeDataName
) {
  return {
    type: "YSLIDE_CHANGED",
    payload: valueMin,
    payload2: valueMax,
    payload3: volumeDataName,
  };
};

export const myZSlideAction = function fetchZSlide(
  valueMin,
  valueMax,
  volumeDataName
) {
  return {
    type: "ZSLIDE_CHANGED",
    payload: valueMin,
    payload2: valueMax,
    payload3: volumeDataName,
  };
};

export const myChangeVolumeAction = function changeVolume(value1, value2) {
  return {
    type: "VOLUME_CHANGED",
    payload: value1,
    payload2: value2,
  };
};

export const myChangeColorMapAction = function changeColorMap(
  value,
  volumeDataName
) {
  return {
    type: "COLOR_MAP_CHANGED",
    payload: value,
    payload2: volumeDataName,
  };
};

export const myChangePoint1 = function changePoint1(value) {
  return {
    type: "OPACITY1_CHANGED",
    payload: value,
  };
};

export const myChangePoint2 = function changePoint2(value) {
  return {
    type: "OPACITY2_CHANGED",
    payload: value,
  };
};

export const myChangeLowNode = function changeLowNode(value) {
  return {
    type: "LOW_NODE_CHANGED",
    payload: value,
  };
};

export const myChangeHighNode = function changeHighNode(value) {
  return {
    type: "HIGH_NODE_CHANGED",
    payload: value,
  };
};

export const mySendAlphaPoints = function mySendAlphaPoints(
  xPosArray,
  yPosArray,
  volumeDataName
) {
  return {
    type: "UPDATED_APLHA_DATA",
    payload: xPosArray,
    payload2: yPosArray,
    payload3: volumeDataName,
  };
};

export const mySaveColorMappingState = function mySaveColorMappingState(
  colorMap
) {
  return {
    type: "SAVE_COLOR_DATA",
    payload: colorMap,
  };
};

export const myChannelChanged = function myChannelChanged(
  channel,
  volumeDataName
) {
  return {
    type: "CHANNEL_CHANGED",
    payload: channel,
    payload2: volumeDataName,
  };
};

export const myCameraReset = function myCameraReset() {
  return {
    type: "CAMERA_RESET",
    payload: "camera_reset",
  };
};
