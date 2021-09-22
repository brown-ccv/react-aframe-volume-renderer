import { createContext, useContext, useReducer } from "react";

const VolumeContext = createContext();
const pathPrefix = "./assets/models/";

// Custom component to provide the Volume context
function VolumeProvider(props) {
  const [state, dispatch] = useReducer(volumeReducer, {
    options: {
      measurement: "salt",
      season: "summer",
      tide: "low",
    },
    path: `${pathPrefix}summer_low_salt.png`,
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
  function getPath() {
    const { season, tide, measurement } = state.options;
    const model = `${season}_${tide}_${measurement}.png`;

    console.log("Loading Model:", model);
    return pathPrefix + model;
  }

  switch (action.type) {
    case "TOGGLE_MEASUREMENT": {
      state.options = { ...state.options, measurement: action.payload };
      state.path = getPath();
      return state;
    }
    case "TOGGLE_SEASON": {
      state.options = { ...state.options, season: action.payload };
      state.path = getPath();
      return state;
    }
    case "TOGGLE_TIDE": {
      state.options = { ...state.options, tide: action.payload };
      state.path = getPath();
      return state;
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
