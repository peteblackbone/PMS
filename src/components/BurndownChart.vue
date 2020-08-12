<template>
  <div class="chart-container">
    <canvas ref="burndown"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  methods: {
    sumArrayUpTo(arrData, index) {
      var total = 0;
      for (var i = 0; i <= index; i++) {
        if (arrData.length > i) {
          total += arrData[i];
        }
      }
      return total;
    },

    createChart(elementId, burndownData, scopeChange = []) {
      Chart.defaults.global.defaultFontFamily = "Arial";
      Chart.defaults.global.defaultFontSize = 14;

      const totalHoursInSprint = burndownData[0];
      const idealHoursPerDay = totalHoursInSprint / 9;
      var i = 0;

      var speedData = {
        labels: [
          "Day 1",
          "Day 2",
          "Day 3",
          "Day 4",
          "Day 5",
          "Day 6",
          "Day 7",
          "Day 8",
          "Day 9",
          "Day 10",
        ],
        datasets: [
          {
            label: "Burndown",
            data: burndownData,
            fill: false,
            borderColor: "#EE6868",
            backgroundColor: "#EE6868",
            lineTension: 0,
          },
          {
            label: "Ideal",
            borderColor: "#6C8893",
            backgroundColor: "#6C8893",
            lineTension: 0,
            borderDash: [5, 5],
            fill: false,
            data: [
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 0)
              ), // 1
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 1)
              ), // 2
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 2)
              ), // 3
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 3)
              ), // 4
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 4)
              ), // 5
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 5)
              ), // 6
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 6)
              ), // 7
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 7)
              ), // 8
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 8)
              ), // 9
              Math.round(
                totalHoursInSprint -
                  idealHoursPerDay * i++ +
                  this.sumArrayUpTo(scopeChange, 9)
              ), // 10
            ],
          },
        ],
      };

      var chartOptions = {
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "top",
          labels: {
            boxWidth: 80,
            fontColor: "black",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: Math.round(burndownData[0] * 1.1),
              },
            },
          ],
        },
      };

      var lineChart = new Chart(this.$refs.burndown, {
        type: "line",
        data: speedData,
        options: chartOptions,
      });
    },
  },
  mounted() {
    this.createChart(
      "burndown43",
      [200, 160, 160, 140, 90, 90, 80, 50, 30, 8], // burndown data
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // scope change
    );
  },
};
</script>

<style>
.chart-container {
  position: absolute;
  padding: 10px;
  height: 100%;
  width: 100%;
}
</style>