import React from "react";

export const VolumeContext = React.createContext({
  volume: {
    measurement: 0,
    season: 0, 
    tide: 0,
  },
  setVolume: () => {}
});