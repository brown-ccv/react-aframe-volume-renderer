

import React, {Component} from 'react'
import Controls from './Controls';
import VolumeRenderer from './VolumeRenderer';



export default class Layout extends Component {
  render () {
    return (

        <div class="d-flex flex-row justify-content-around mb-5 pb-5 mt-5">
          <div class="col-md-3 mt-5">
            <Controls/>
          </div>
          <div class="col-md-6">
            <VolumeRenderer/>
          </div>
        </div>
    );

  }
}
