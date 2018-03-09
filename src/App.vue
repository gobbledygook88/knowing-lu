<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
@import url(http://fonts.googleapis.com/css?family=Hammersmith+One);
* {
  font-family: 'HammersmithOne', 'Hammersmith One';
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'HammersmithOne', 'Hammersmith One', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
