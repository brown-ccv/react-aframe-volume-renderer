import {createContext, useContext, useReducer} from "react";

const VolumeContext = createContext();

// Custom component to provide the Volume context
function VolumeProvider(props) {
  const [state, dispatch] = useReducer(volumeReducer, {
    selector: {
      measurement: 0,
      season: 0, 
      tide: 0,
    },
    path: "",
  })

  const value = {state, dispatch}
  return (
    <VolumeContext.Provider value={value}>
      {props.children}
    </VolumeContext.Provider>
  );
}

// Custom hook to get the current VolumeContext 
function useVolume() {
  const context = useContext(VolumeContext);
  if (context === undefined) {
    throw new Error("useVolume must be used within a VolumeProvider")
  }
  return context;
}

// Custom reducer to update the VolumeContext
function volumeReducer(state, action) {
  function getPath() {
    let path = "";
    state.selector.season ? path += "winter_" : path += "summer_";
    state.selector.tide ? path += "high_" : path += "low_";
    state.selector.measurement ? path += "temp" : path += "salt";
    path += ".png"
    
    console.log("Loading Model:", path)
    return "./assets/models/" + path;
  }

  switch(action.type) {
    case "TOGGLE_MEASUREMENT": {
      state.selector = {...state.selector, measurement: action.payload}
      state.path = getPath()
      return state;
    }
    case "TOGGLE_SEASON": {
      state.selector = {...state.selector, season: action.payload}
      state.path = getPath()
      return state;
    }
    case "TOGGLE_TIDE": {
      state.selector = {...state.selector, tide: action.payload}
      state.path = getPath()
      return state;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// Custom component to get the current VolumeContext (class based components)
function VolumeConsumer(props) {
  return (
    <VolumeContext.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error('VolumeConsumer must be used within a VolumeProvider')
        }
        return props.children(context)
      }}
    </VolumeContext.Consumer>
  )
}

export {useVolume, VolumeProvider, VolumeConsumer}