import 'aframe'
//import './libs/aframe'
import 'aframe-event-set-component'
import 'aframe-orbit-controls'

import React, {Component} from 'react'

import './App.css'
import './components/Aframe/my-loader.js'
import './components/Aframe/my-buttons-check.js'
import './components/Aframe/render-2d-clipplane'
import './components/Aframe/cursor-listener'
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/React/Layout'




class App extends Component {
  render () {
    return (
      <div>
        <Layout/>
      </div>
    );
  }
}

export default App;
