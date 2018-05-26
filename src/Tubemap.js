import React, { Component } from 'react';
import Utils from './Utils.js';
import Map from './assets/tubemap.svg';
import _manualFixes from './assets/stationNameFixes.json';
import './Tubemap.css';

const svgPanZoom = require('svg-pan-zoom');

class Tubemap extends Component {
  constructor(props) {
    super(props);

    this.stations = props.stations || {};
    this.correct = props.correct || [];

    this.loadSVG();
    // this.processStationNames();
  }

  loadSVG() {
    var self = this;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", Map, true);
    ajax.send();
    ajax.onload = function(e) {
      var div = document.getElementById("map-container");
      div.innerHTML = ajax.responseText;
      // document.body.insertBefore(div, document.body.childNodes[0]);

      // hideText();
      self.processStationNames();
      // _total = displayTotal();
      //
      // _svgEl = document.getElementById("status-map");

      self.svg = svgPanZoom('#status-map', {
        center: true,
        fit: true,
        mouseWheelZoomEnabled: true,
        panEnabled: true,
        zoomEnabled: true,
      });

      // Set initial zoom level
      self.svg.zoomBy(2);
    }
  }

  processStationNames() {
    var stationNames = document.getElementById("station-names");

    // Loop through each child of the group and extract station names
    // This is a HTMLCollection - an array-like object so no forEach()
    var stations = stationNames.children;
    for(var i = 0; i < stations.length; i++) {
      var station = stations[i];
      var stationName = Utils.normalise(
        station.textContent
               .trim()
               .split("\n")
               .map(w => w.trim())
               .join(" ")
      );

      if(!stationName) { continue; }

      // Manual fixes
      stationName = _manualFixes[stationName] || stationName;

      // Support multiple labels for each station
      this.stations[stationName] = this.stations[stationName] || [];
      this.stations[stationName].push(station);

      // Hide group
      station.setAttribute("display", "none");
    }
  }

  render() {
    return (
      <div id="map-container"></div>
    );
  }
}

export default Tubemap;
