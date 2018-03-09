import normaliseStationName from './normaliseStationName';

const s = {};
const correct = {};
const manualFixes = {
  // Parsed text: Correct text
  'bromley bybow': 'bromley by bow',
  'custom house for excel': 'custom house',
  'cutty sark for maritime greenwich': 'cutty sark',
  'harrow onthehill': 'harrow on the hill',
  'heathrow t erminals 1   2   3': 'heathrow terminals 1 2 3',
  'highbury  islington': 'highbury  islington',  // Note: two spaces
  's t   jam e s  s park': 'st james park',
};
let svg;
let el;

function hideText() {
  const stationNames = document.getElementById('station-names');

  // Loop through each child of the group and extract station names
  // This is a HTMLCollection - an array-like object so no forEach()
  const stations = stationNames.children;
  for (let i = 0; i < stations.length; i += 1) {
    const station = stations[i];
    let stationName = normaliseStationName(
        station.textContent
               .trim()
               .split('\n')
               .map(w => w.trim())
               .join(' '),
    );

    if (!stationName) { continue; }

    // Manual fixes
    stationName = manualFixes[stationName] || stationName;

    // Support multiple labels for each station
    s[stationName] = s[stationName] || [];
    s[stationName].push(station);

    // Hide group
    station.setAttribute('display', 'none');
  }
}

function loadTubeMap() {
  const ajax = new XMLHttpRequest();
  ajax.open('GET', 'tubemap.svg', true);
  ajax.send();
  ajax.onload = () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'map-container');
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);

    hideText();
    // total = displayTotal();

    el = document.getElementById('status-map');

    svg = window.svgPanZoom('#status-map', {
      center: true,
      fit: true,
      mouseWheelZoomEnabled: true,
      panEnabled: true,
      zoomEnabled: true,
    });

    // Set initial zoom level
    svg.zoomBy(2);
  };
}

export default {
  map: svg,
  el,
  loadTubeMap,
};
