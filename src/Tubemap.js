import React, { Component } from 'react';
import Map from './assets/tubemap.svg'
import './Tubemap.css'

const svgPanZoom = require('svg-pan-zoom');

class Tubemap extends Component {
  constructor(props) {
    super(props);
    this.loadSVG();
  }

  loadSVG() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", Map, true);
    ajax.send();
    ajax.onload = function(e) {
      var div = document.getElementById("map-container")
      div.innerHTML = ajax.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);

      // hideText();
      // _total = displayTotal();
      //
      // _svgEl = document.getElementById("status-map");

      this.svg = svgPanZoom('#status-map', {
        center: true,
        fit: true,
        mouseWheelZoomEnabled: true,
        panEnabled: true,
        zoomEnabled: true
      });

      // Set initial zoom level
      this.svg.zoomBy(2);
    }
  }

  render() {
    return (
      <div id="map-container"></div>
    );
  }
}

export default Tubemap;
