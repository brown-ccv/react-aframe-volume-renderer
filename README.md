Aframe Volume Rendering

This project is an effor to integrate data visualization on VR and web browser technologies.
This project was developed using react-js and Aframe (webvr - threejs -webgl2)

## Installation

For local deployment, clone - download the repository and in the project directory run 

### `npm install`

The package manager will install all the depencies. When it is done run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## About this project


WebVR Volume Rendering.

Introduction 

A web based volume visualizer application to support scientific 3D data built on top of webgl that will facilitate the access from any web browser, plus the benefits of VR.

It was implemented using A-frame, a javascript framework easy to learn, use and deploy. It sits on top of Three.js, which is the most used library to support 3D rendering on the web, and html which is the common tool to write static web pages. A-frame follows a composed based pattern, common on game and graphics engines. Additionally, it uses node js to easy deploy the modules the application is based on.

![Application_Arch](./imgs/archit.png)

A-Frame Implementation

Following A-Frame’s philosophy, the application has a custom component that reads, loads and render 3D textures as volume data. This component is attached to an A-Frame entity as follows:

---------------------------------------------------------------------------------------------------------------------------------------
|<a-entity id="volumeCube" class="cube" mixin="cube" myloader="    volumeData:./assets/models/nrrd/00.nrrd " position="0 0 0"  sleepy> |
---------------------------------------------------------------------------------------------------------------------------------------
