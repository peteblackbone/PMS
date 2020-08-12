<template>
  <v-card class="fill-height">
    <div v-if="data.type === 'burndown'">
      <burndown-chart :data="data"></burndown-chart>
      <!-- <project-activity></project-activity> -->
    </div>
    <div v-else-if="data.type === 'piechart'">
      <pie-chart></pie-chart>
    </div>
    <div v-else-if="data.type === 'activity'"></div>
  </v-card>
</template>

<script>
import BurndownChart from "@/components/BurndownChart";
import ProjectActivity from "@/components/ProjectActivity";
import PieChart from "@/components/PieChart";
export default {
  components: {
    BurndownChart,
    ProjectActivity,
    PieChart,
  },
  data() {
    return {
      
    };
  },
  props: {
    data:Object
  },
};
</script>

<style>
.card {
  width: 100%;
  height: 100%;
  max-height: 90vh;
}
</style>