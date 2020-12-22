<template>
  <v-card class="card-container">
    <v-card-title class="d-flex"
      ><span>{{ title }}</span
      ><v-spacer></v-spacer
      ><v-chip small :class="`chip-${status}`">{{
        statusText[status]
      }}</v-chip></v-card-title
    >
    <v-divider class="mx-2"></v-divider>
    <v-card-subtitle>แก้ไขล่าสุด : {{ updateTime }}</v-card-subtitle>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      statusText: [
        "",
        "Pending",
        "Wait Adviser",
        "wait ประจำวิชา",
        "Rejected",
        "Completed"
      ]
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    status: {
      type: Number,
      default: 0
    },
    updateTime: {
      type: String
    }
  }
};
</script>

<style scoped>
.card-container {
  width: 30vw;
  height: 26vh;
}
.chip-1 {
  background-color: orange !important;
}
.chip-2 {
  background-color: aquamarine !important;
}
.chip-3 {
  background-color: aqua !important;
}
.chip-4 {
  background-color: red !important;
}
.chip-5 {
  background-color: green !important;
}
</style>
