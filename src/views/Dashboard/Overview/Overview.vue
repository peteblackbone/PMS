<template>
  <div class="gray ligthen-5">
    <div class="grid-layout-container scrollable overflow-y-auto">
      <grid-layout
        :layout.sync="layout_2"
        :col-num="16"
        :row-height="96"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in layout_2"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          :maxH="6"
          :minW="3"
          :minH="2"
        >
          <overview-card :data="item.data"></overview-card>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "@/utils/helper";
import OverviewCard from "@/components/OverviewCard";

var data1 = {type:"burndown"}
var data2 = {type:"piechart"}
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Container,
    Draggable,
    OverviewCard,
  },
  data() {
    return {
      layout_1: [{ x: 0, y: 0, w: 16, h: 6, i: "0" ,}],
      layout_2: [
        { x: 0, y: 0, w: 8, h: 6, i: "0" ,data:data1},
        { x: 8, y: 0, w: 8, h: 6, i: "1" ,data:data2},
      ],
      layout_3: [
        { x: 0, y: 0, w: 8, h: 6, i: "0" },
        { x: 8, y: 0, w: 8, h: 3, i: "1" },
        { x: 8, y: 3, w: 8, h: 3, i: "2" },
      ],
      layout_4: [
        { x: 0, y: 0, w: 8, h: 3, i: "0" },
        { x: 8, y: 0, w: 8, h: 3, i: "1" },
        { x: 0, y: 3, w: 8, h: 3, i: "2" },
        { x: 8, y: 3, w: 8, h: 3, i: "3" },
      ],
      layout_5: [
        { x: 0, y: 0, w: 6, h: 3, i: "0" },
        { x: 6, y: 0, w: 5, h: 3, i: "1" },
        { x: 0, y: 3, w: 6, h: 3, i: "2" },
        { x: 6, y: 3, w: 5, h: 3, i: "3" },
        { x: 11, y: 0, w: 5, h: 6, i: "4" },
      ],
      layout_6: [
        { x: 0, y: 0, w: 5, h: 3, i: "0" },
        { x: 5, y: 0, w: 5, h: 3, i: "1" },
        { x: 10, y: 0, w: 5, h: 3, i: "2" },
        { x: 0, y: 3, w: 5, h: 3, i: "3" },
        { x: 5, y: 3, w: 5, h: 3, i: "4" },
        { x: 10, y: 3, w: 5, h: 3, i: "5" },
      ],
    };
  },
  methods: {
    
  },
};
</script>

<style>
.grid-layout-container {
  max-height: 91vh;
}
</style>