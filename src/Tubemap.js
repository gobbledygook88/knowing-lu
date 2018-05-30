import React, { Component } from 'react';
import Utils from './Utils.js';
import Map from './assets/tubemap.svg';
import _manualFixes from './assets/stationNameFixes.json';
import './Tubemap.css';

const svgPanZoom = require('svg-pan-zoom');

class Tubemap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: props.stations,
      correct: props.correct,
    }
    this.updateStations = props.updateStations;

    this.loadSVG();
  }

  loadSVG() {
    var self = this;
    var ajax = new XMLHttpRequest();
    ajax.open("GET", Map, true);
    ajax.send();
    ajax.onload = function(e) {
      var div = document.getElementById("map-container");
      div.innerHTML = ajax.responseText;

      self.processStationNames();
      // _total = displayTotal();

      self.svgEl = document.getElementById("status-map");

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
    let stationNames = document.getElementById("station-names");
    let stations = {};

    // Loop through each child of the group and extract station names
    // This is a HTMLCollection - an array-like object so no forEach()
    let stationDOMEls = stationNames.children;
    for(var i = 0; i < stationDOMEls.length; i++) {
      let station = stationDOMEls[i];
      let stationName = Utils.normalise(
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
      stations[stationName] = stations[stationName] || [];
      stations[stationName].push(station);

      // Hide group
      if (!this.state.correct[stationName]) {
        station.setAttribute("display", "none");
      }
    }

    // Update stations state via the parent
    this.updateStations(stations);
  }

  panIntoView(elDims, vbDims) {
    // Compute how much we need to move by
    console.log(elDims);
    var inv = this.svgEl.getScreenCTM().inverse();
    // Transform element position into SVG coordinates
    var svgTop = this.svgEl.createSVGPoint();
    svgTop.x = elDims.top;
    svgTop.y = elDims.left;
    var svgTopP = svgTop.matrixTransform(inv);
    console.log(inv, svgTopP);

    // Find which direction to move in
    var h;  // 1 is left, -1 is right
    var v;  // 1 is down, -1 is up

    // this.svg.pan({x: elDims.x, y: elDims.y});
    this.svg.panBy({x: 0, y: -300});
  }

  panToLatest() {
    const latest = this.props.latest;
    const els = this.props.stations[latest];

    if (!latest) {
      return;
    }

    // Since the svg is 'full-screen', we take the body rectangle as the viewbox
    var vbDims = document.body.getBoundingClientRect();
    els.forEach(function(el) {
      var elDims = el.getBoundingClientRect();
      if(!Utils.inView(elDims, vbDims)) {
        console.log(el);
        this.panIntoView(elDims, vbDims);
      }
    }, this);
  }

  render() {
    this.panToLatest();

    return (
      <div id="map-container"></div>
    );
  }
}

export default Tubemap;
