<template>
  <div class="container">
    <div class="search-box">
      <span class="text-lg-h6" v-t="{ path: 'APP.FULL_NAME' }"></span>
      <v-text-field
        class="pt-5"
        label="กรอกคำค้นหา..."
        append-icon="mdi-send"
        @click:append="submit"
        @keydown.enter="submit"
        outlined
        dense
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      alert("submit");
    }
  }
};
</script>

<style scoped>
.container {
  height: 500px;
  position: relative;
}
.search-box {
  /* width: 500px; */
  max-width: 500px;
  min-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
