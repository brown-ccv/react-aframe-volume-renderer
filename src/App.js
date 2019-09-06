import 'aframe'
import 'super-hands'
import 'aframe-event-set-component'
import 'aframe-physics-system'
import 'aframe-physics-extras'
import 'aframe-orbit-controls'

import React, {Component} from 'react'

import Navbar from 'react-brownccv/dist/components/Navbar'
import BrownFooter from 'react-brownccv/dist/components/BrownFooter'
import './App.css'
import './components/my-loader.js'
import './components/my-buttons-check.js'
import VolumeRenderer from './components/VolumeRenderer';


class App extends Component {
  render () {
    return (
      <div>
        <Navbar/>
        <VolumeRenderer/>
        <BrownFooter/>
      </div>
    );
  }
}

export default App;
