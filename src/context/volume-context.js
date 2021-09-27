import { createContext, useContext, useReducer } from "react";
import config from "../assets/config.json";

const VolumeContext = createContext();

// Custom component to provide the Volume context
function VolumeProvider(props) {
  const [state, dispatch] = useReducer(volumeReducer, {
    selection: {
      season: config.season[0],
      tide: config.tide[0],
      measurement: config.measurement[0],
    },
    slices: 55,
    extension: ".png",
    x_spacing: 2.0,
    y_spacing: 2.0,
    z_spacing: 1.0,
  });

  const value = { state, dispatch };
  return (
    <VolumeContext.Provider value={value}>
      {props.children}
    </VolumeContext.Provider>
  );
}

// Custom hook to get the current VolumeContext
function useVolumeContext() {
  const context = useContext(VolumeContext);
  if (context === undefined) {
    throw new Error("useVolume must be used within a VolumeProvider");
  }
  return context;
}

// Custom reducer to update the VolumeContext
function volumeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MEASUREMENT": {
      return {
        selection: {
          ...state.selection,
          measurement: action.payload,
        },
      };
    }
    case "TOGGLE_SEASON": {
      return {
        selection: {
          ...state.selection,
          season: action.payload,
        },
      };
    }
    case "TOGGLE_TIDE": {
      return {
        selection: {
          ...state.selection,
          tide: action.payload,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Custom component to get the current VolumeContext (class based components)
function VolumeConsumer(props) {
  return (
    <VolumeContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "VolumeConsumer must be used within a VolumeProvider"
          );
        }
        return props.children(context);
      }}
    </VolumeContext.Consumer>
  );
}

export { useVolumeContext, VolumeProvider, VolumeConsumer };
