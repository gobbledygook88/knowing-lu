<template>
  <div id="stats-container">
    <h3>Stats</h3>
    <div class="canvas-container">
      <canvas id="line-canvas"></canvas>
    </div>
    <div class="canvas-container">
      <canvas id="zone-canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stats',
  data() {
    return {
      msg: 'This is the home page',
    };
  },
};
</script>

<style scoped>
#stats-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
}

.canvas-container {
  position: relative;
  width: 50%;
}
</style>
