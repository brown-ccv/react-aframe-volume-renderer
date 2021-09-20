import React from 'react'
import 'aframe'
import 'aframe-event-set-component'
import 'aframe-orbit-controls'
import 'bootstrap/dist/css/bootstrap.min.css';

import './components/Aframe/my-loader.js'
import './components/Aframe/my-buttons-check.js'
import './components/Aframe/render-2d-clipplane'
import './components/Aframe/cursor-listener'
import './App.css'
import Layout from './components/React/Layout'
import {VolumeContext} from './context/volume-context.js';


export default function App() {
  const [volume, setVolume] = React.useState({ 
    variable: 0,
    season: 0,
    tide: 0,
  })
  const value = {volume, setVolume}

  return (
    <VolumeContext.Provider value={value}>
      <Layout />
    </VolumeContext.Provider>
  );
}
