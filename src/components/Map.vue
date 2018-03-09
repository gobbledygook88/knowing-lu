<template>
  <div>
    <div class="map-container">{{ tubemap }}</div>
    <div id="play-container">
      <div>
        <span id="current">0</span>/<span id="total"></span>
        <span id="timer"></span>
        <a id="pause" href=""><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI3Ny4zMzggMjc3LjMzOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjc3LjMzOCAyNzcuMzM4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTE0LjIyLDQ1LjY2NXYxODYuMDEzYzAsMjUuMjIzLDE2LjcxMSw0NS42NiwzNy4zMjcsNDUuNjZjMjAuNjE4LDAsMzcuMzM5LTIwLjQzOCwzNy4zMzktNDUuNjZWNDUuNjY1ICAgYzAtMjUuMjExLTE2LjcyMS00NS42NTctMzcuMzM5LTQ1LjY1N0MzMC45MzEsMCwxNC4yMiwyMC40NTQsMTQuMjIsNDUuNjY1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTIyNS43OCwwYy0yMC42MTQsMC0zNy4zMjUsMjAuNDQ2LTM3LjMyNSw0NS42NTdWMjMxLjY3YzAsMjUuMjIzLDE2LjcxMSw0NS42NTIsMzcuMzI1LDQ1LjY1MnMzNy4zMzgtMjAuNDMsMzcuMzM4LTQ1LjY1MiAgIFY0NS42NjVDMjYzLjEwOSwyMC40NTQsMjQ2LjM5NCwwLDIyNS43OCwweiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /></a>
        <a id="resume" href=""><img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDE2My44NjEgMTYzLjg2MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYzLjg2MSAxNjMuODYxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTM0Ljg1NywzLjYxM0MyMC4wODQtNC44NjEsOC4xMDcsMi4wODEsOC4xMDcsMTkuMTA2djEyNS42MzdjMCwxNy4wNDIsMTEuOTc3LDIzLjk3NSwyNi43NSwxNS41MDlMMTQ0LjY3LDk3LjI3NSAgIGMxNC43NzgtOC40NzcsMTQuNzc4LTIyLjIxMSwwLTMwLjY4NkwzNC44NTcsMy42MTN6IiBmaWxsPSIjMDAwMDAwIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" /></a>
      </div>
      <input id="guess" type="text" placeholder="Enter a station name"></input>
    </div>

    <stats></stats>
  </div>
</template>

<script>
import Stats from './Stats';
import loadTubeMap from './tubeMap';

export default {
  name: 'Map',
  data() {
    return {
      tubemap: loadTubeMap(),
    };
  },
  components: {
    Stats,
  },
};
</script>

<style scoped>
svg {
  font-family: 'HammersmithOne', 'Hammersmith One';
  font-size: 4.6px;

  width: 100%;
  height: 100%;

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}

#map-container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

#play-container {
  position: fixed;
  right: 1em;
  bottom: 1em;
  font-size: 2em;
  z-index: 999;
}

#play-container input {
  width: 15em;
  font-size: 1em;
}
</style>
