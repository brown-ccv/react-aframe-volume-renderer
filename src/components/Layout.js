
import {Entity, Scene} from 'aframe-react';
import React, {Component} from 'react'
import Controls from './Controls';
import VolumeRenderer from './VolumeRenderer';



export default class Layout extends Component {
  render () {
    return (

        <div>
            <table>
              <tbody>
                <tr>
                    <td> <Controls/> </td>
                    <td><VolumeRenderer/></td>
                </tr>
              </tbody>
            </table>
        </div>
    );

  }
}