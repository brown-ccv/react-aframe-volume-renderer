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


export default function App() {
  return (
    <Layout />
  );
}
