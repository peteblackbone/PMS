<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import store from "./store/index";
export default {
  store,
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=K2D:wght@100;200;300;400;500;600;700;800&display=swap');
#app{
  font-family: 'K2D', sans-serif;
}
#nprogress .bar {
  background: #fff !important;
}

::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-thumb {
  background-clip: content-box;
  border: 2px solid transparent;
  border-radius: 7px;
  box-shadow: inset 0 0 0 20px;
}
::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}
::-webkit-scrollbar-corner {
  background-color: transparent;
}
::-webkit-scrollbar-track-piece {
  width: 8px;
}
/* .scrollable::-webkit-scrollbar-thumb {
  color: #00000000;
  transition: color 0.5s;
} */
::-webkit-scrollbar-thumb {
  color: #666666ff;
}
/* html, body {
  height: 100%;
  margin: 0;
} */
</style>