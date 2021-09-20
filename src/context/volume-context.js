import React from "react";

export const VolumeContext = React.createContext({
  volume: {
    season: 0, 
    tide: 0,
    variable: 0,
  },
  setVolume: () => {}
});