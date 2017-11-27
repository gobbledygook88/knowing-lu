var ajax = new XMLHttpRequest();
var _total;

ajax.open("GET", "tubemap.svg", true);
ajax.send();
ajax.onload = function(e) {
  var div = document.createElement("div");
  div.setAttribute("id", "map-container");
  div.innerHTML = ajax.responseText;
  document.body.insertBefore(div, document.body.childNodes[0]);

  hideText();
  _total = displayTotal();

  svgPanZoom('#status-map', {
    center: true,
    fit: true,
    mouseWheelZoomEnabled: true,
    panEnabled: true,
    zoomEnabled: true
  });
}

var _s = {};
var _manualFixes = {
  // Parsed text: Correct text
  "bromley bybow": "bromley by bow",
  "custom house for excel": "custom house",
  "cutty sark for maritime greenwich": "cutty sark",
  "harrow onthehill": "harrow on the hill",
  "heathrow t erminals 1   2   3": "heathrow terminals 1 2 3",
  "highbury  islington": "highbury  islington",  // Note: two spaces
  "s t   jam e s  s park": "st james park",
};

function hideText() {
  var stationNames = document.getElementById("station-names");

  // Loop through each child of the group and extract station names
  // This is a HTMLCollection - an array-like object so no forEach()
  var stations = stationNames.children;
  for(var i = 0; i < stations.length; i++) {
    var station = stations[i];
    var stationName = normalise(
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
    _s[stationName] = _s[stationName] || [];
    _s[stationName].push(station);

    // Hide group
    station.setAttribute("display", "none");
  }
}

function displayTotal() {
  var el = document.getElementById("total");
  var total = Object.keys(_s).length;
  el.innerHTML = total;
  return total;
}

function show(name) {
  _s[name].forEach(el => el.setAttribute("display", "visible"));
}

function normalise(name) {
  return name.toLowerCase()
              .replace(/[^\w\s]/gi, "")  // Remove punctuation
              .replace(/ and /gi, "  ")  // Remove 'and'. Note: two spaces
              .trim();
}

var current = document.getElementById("current");
var counter = 0;
var timer = document.getElementById("timer");
var seconds = 0;
var minutes = 0;
var hours = 0;

function pad(n) {
  return n ? (n > 9 ? n : "0" + n) : "00";
}

function add() {
  seconds++;
  if(seconds >= 60) {
    seconds = 0;
    minutes++;
    if(minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  timer.textContent = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

var started = false;
var t;

document.getElementById("guess").addEventListener("input", function(e) {
  // Start timer if not started already
  if(!started) {
    t = setInterval(add, 1000);
    started = true;
  }

  var guess = normalise(this.value);

  if(_s[guess]) {
    show(guess);
    this.value = "";

    // Remove
    delete _s[guess];

    // Increment counter and update
    counter++;
    current.innerHTML = counter;

    // Stop timer if all guessed correctly
    if(counter == _total) {
      clearInterval(t);
    }
  }
});

document.getElementById("pause").addEventListener("click", function(e) {
  // Stop the timer
  clearInterval(t);

  // Hide map
  document.getElementById("map-container").style.display = "none";

  // Show stats
  document.getElementById("stats-container").style.display = "visible";

  e.preventDefault();
});

document.getElementById("resume").addEventListener("click", function(e) {
  // Start the timer
  t = setInterval(add, 1000);

  // Hide stats
  document.getElementById("stats-container").style.display = "none";

  // Show map
  document.getElementById("map-container").style.display = "visible";

  e.preventDefault();
});

/*
Stop/Pause button
- stops the clock and switches to stats view

Statistics
{
  "time_spent": 0,
  "stations_total": 0,
  "stations_correct": 0,
  "lines": {
    "Bakerloo": 0
  },
  "zones": {
    "Zone 1": 0,
    "Zone 2": 0
  }
}

Lines breakdown: abstract line chart with percentages
Zones breakdown: abstract zone map with percentages

Show averages
*/
