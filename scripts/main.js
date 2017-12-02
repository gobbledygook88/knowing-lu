var _total;
var _svg;
var _svgEl;
var _stations;

function loadSVG() {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "tubemap.svg", true);
  ajax.send();
  ajax.onload = function(e) {
    var div = document.createElement("div");
    div.setAttribute("id", "map-container");
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);

    hideText();
    _total = displayTotal();

    _svgEl = document.getElementById("status-map");

    _svg = svgPanZoom('#status-map', {
      center: true,
      fit: true,
      mouseWheelZoomEnabled: true,
      panEnabled: true,
      zoomEnabled: true
    });

    // Set initial zoom level
    _svg.zoomBy(2);
  }
}
loadSVG();

function loadStations() {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "stations.json", true);
  ajax.send();
  ajax.onreadystatechange = function() {
    if(ajax.readyState === 4) {
      if(ajax.status === 200) {
        _stations = JSON.parse(ajax.responseText);
      }
    }
  }
}
loadStations();

var _s = {};
var _correct = {};
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

function inView(elDims, vbDims) {
  return (
    elDims.bottom <= vbDims.bottom &&
    elDims.left >= vbDims.left &&
    elDims.right <= vbDims.right &&
    elDims.top >= vbDims.top
  );
}

function panIntoView(elDims, vbDims) {
  // Compute how much we need to move by
  console.log(elDims);
  var inv = _svgEl.getScreenCTM().inverse();
  // Transform element position into SVG coordinates
  var svgTop = _svgEl.createSVGPoint();
  svgTop.x = elDims.top;
  svgTop.y = elDims.left;
  var svgTopP = svgTop.matrixTransform(inv);
  console.log(inv, svgTopP);

  // Find which direction to move in
  var h;  // 1 is left, -1 is right
  var v;  // 1 is down, -1 is up

  // _svg.pan({x: elDims.x, y: elDims.y});
  _svg.panBy({x: 0, y: -300});
}


function isVisible(name) {
  // Since the svg is 'full-screen', we take the body rectangle as the viewbox
  var vbDims = document.body.getBoundingClientRect();

  _s[name].forEach(function(el) {
    var elDims = el.getBoundingClientRect();
    if(!inView(elDims, vbDims)) {
      console.log(el);
      panIntoView(elDims, vbDims);
    }
  });
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

  // Check if guess has already been guessed
  if(_correct[guess]) {
    console.log("Already guessed");
  }

  // Check if guess is correct
  if(_s[guess]) {
    show(guess);

    // Check if station name is fully in view (may not be due to pan and zoom)
    isVisible(guess);

    // Pan to station name if necessary

    // Reset input field
    this.value = "";

    // Remove DOM references
    delete _s[guess];

    // Add to correct guesses
    _correct[guess] = true;  // TODO copy lines and zones

    // Increment counter and update
    counter++;
    current.innerHTML = counter;

    // Stop timer if all guessed correctly
    if(counter == _total) {
      clearInterval(t);
    }
  }
});

function blur(el) {
  el.style.filter = "blur(3px)";
  el.style.opacity = 0.2;
}

function unblur(el) {
  el.style.filter = "none";
  el.style.opacity = 1;
}

function enableSVGPanZoom() {
  _svg.enablePan();
  _svg.enableZoom();
}

function disableSVGPanZoom() {
  _svg.disablePan();
  _svg.disableZoom();
}

var color = Chart.helpers.color;
var lineStatsData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [{
    label: 'Dataset 1',
    backgroundColor: color("#FF0000").alpha(0.5).rgbString(),
    borderColor: "#FF0000",
    borderWidth: 1,
    data: [10, 20, 30, 40, 50, 60, 70]
  }]
};

function createDataArray(keys, obj, key) {
  let values = [];
  for(let k of keys) {
    values.push(obj[k][key]);
  }

  return values;
}

function updateStats() {
  // Calculate per line statistics
  let lineStats = {};
  for(const [line, stations] of Object.entries(_stations.lines)) {
    let normalisedStations = stations.map(normalise);

    let correct = 0;
    for(let s of Object.keys(_correct)) {
      if(normalisedStations.includes(s)) {
        correct++;
      }
    }
    lineStats[line] = {
      total: stations.length,
      correct: correct,
      percentage: Number((correct / stations.length * 100).toFixed(2))
    };
  }
  lineStatsData.labels = Object.keys(lineStats).sort();
  lineStatsData.datasets[0].data = createDataArray(lineStatsData.labels, lineStats, "percentage");
  window.lineStatsChart.update();

  // Calculate per zone statistics
}

document.getElementById("pause").addEventListener("click", function(e) {
  // Stop the timer
  clearInterval(t);

  blur(document.getElementById("map-container"));
  disableSVGPanZoom();

  // Show stats
  document.getElementById("stats-container").style.display = "block";
  updateStats();

  e.preventDefault();
});

document.getElementById("resume").addEventListener("click", function(e) {
  // Start the timer
  t = setInterval(add, 1000);

  // Hide stats
  document.getElementById("stats-container").style.display = "none";

  unblur(document.getElementById("map-container"));
  enableSVGPanZoom();

  e.preventDefault();
});

window.onload = function() {
  var ctx = document.getElementById("line-canvas").getContext("2d");
  window.lineStatsChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: lineStatsData,
    options: {
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      legend: {
        display: false
      },
      title: {
        display: false,
        text: 'By line'
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100
          }
        }],
        yAxes: [{
          ticks: {
            mirror: false
          }
        }]
      },
      tooltips: {
        enabled: false
      }
    }
  });
};
