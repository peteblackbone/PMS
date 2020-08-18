<template>
  <v-card width="600" height="400">
    <v-container>
      <v-title>Setting</v-title>
      <v-divider></v-divider>layout
      <v-slider
        v-model="fruits"
        :tick-labels="[1, 2, 3, 4, 5, 6]"
        :max="5"
        step="1"
        ticks="always"
        tick-size="3"
      ></v-slider>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: true,
    };
  },
};
</script>

<style></style>
