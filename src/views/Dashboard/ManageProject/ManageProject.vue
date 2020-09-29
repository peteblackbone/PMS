<template>
  <div v-if="loaded" class="overflow-y-auto" style="max-height: 91vh">
    <v-card class="ma-2" tile min-height="88.5vh">
      <v-tabs v-model="tab" color="white" show-arrows background-color="blue">
        <v-tab
          v-for="(item, i) in tabs"
          :key="item.name"
          @click="fetchCE(item.name)"
        >
          <span v-if="update[i]"
            ><v-badge color="pink" dot>{{ item.name }} </v-badge></span
          >
          <span v-else>{{ item.name }}</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(tab, i) in tabs" :key="tab.name">
          <div class="pa-2 mr-1 pr-3 ml-4 pb-4">
            <!-- <div class="arrow-pointer">comments</div> -->
            <!-- <v-simple-table>
              <thead>
                <tr>
                  <th>ตำแหน่ง</th>
                  <th>ชื่อ</th>
                  <th>สถานะ</th>
                  <th>คอมเมนต์</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in data.comments" :key="item">
                  <td>{{ item.role }}</td>
                  <td>{{ item.name }}</td>
                  <td><span :class="{'success white--text' : item.status,'error--text' : !item.status}">Rejected</span></td>
                  <td>{{ item.comment}}</td>
                </tr>
              </tbody>
            </v-simple-table> -->

            <!-- <v-expansion-panels>
              <v-expansion-panel v-for="item in advisors" :key="item" @click="alert('aaa')">
                <v-expansion-panel-header>
                  <div class="d-flex">
                    <span style="width:100px" class="mr-4">{{
                      item.role
                    }}</span>
                    <span style="width:300px" class="mr-4">{{
                      item.name
                    }}</span>
                    <span style="width:100px" class="success--text mr-4"
                      >approved</span
                    >
                    <span style="width:100px" class="mr-4">comment</span>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <h4>Comment</h4>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels> -->
            <v-badge color="pink" content="2" class="bbt" overlap>
              <v-btn icon depressed @click="expand2 = !expand2" 
                ><v-avatar>
                  <v-icon color="white">mdi-comment-processing-outline</v-icon>
                </v-avatar>
              </v-btn>
            </v-badge>

            <div class="d-flex">
              <div style="width:100%">
                <item-list
                  v-for="(header, i) in tab.headers"
                  :key="header.title"
                  :header="header"
                  :data="data"
                  @submit="submit"
                >
                  <template v-slot:header>
                    <h4 class="mr-2" style="height:28px">
                      {{ i + 1 + ". " }}{{ header.header }}
                    </h4>
                  </template>
                </item-list>
              </div>
              <div>
                <v-expand-x-transition>
                  <v-card
                    v-show="expand2"
                    height="100"
                    width="300"
                    class="mx-auto"
                    flat
                    >asdasd asd asd</v-card
                  >
                </v-expand-x-transition>
              </div>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import ItemList from "@/components/ManageProjectItemList";
import DB from "@/mixins/Database";
import { CE_HEADER } from "@/utils/ce_header.js";
export default {
  components: {
    ItemList,
  },
  data() {
    return {
      update: [true, false, true, false, true, false],
      expand2: false,
      loaded: false,
      tab: null,
      tabs: CE_HEADER(),
      data: [],
      advisors: [
        { name: "a", role: "ที่ปรึกษา" },
        { name: "b", role: "ที่ปรึกษา" },
        { name: "c", role: "ประจำวิชา" },
      ],
    };
  },
  methods: {
    async fetchCE(val) {
      this.data = {};
      this.data = await DB.fetch_ce(val);
      this.loaded = true;
      console.log(this.tabs);
    },
    submit({ val, field }) {
      this.data[field] = val;
      DB.update(this.data);
    },
  },
  mounted() {
    this.fetchCE("CE01");
  },
};
</script>

<style>
.arrow-pointer {
  vertical-align: middle;
  width: 80px;
  height: 38px;
  top: 20px;
  right: 0px;
  background: hotpink;
  position: absolute;
  z-index: 5;
}
.arrow-pointer:after {
  content: "";
  position: absolute;
  left: -25px;
  bottom: 0;
  width: 0;
  height: 0;
  border-right: 25px solid hotpink;
  border-top: 19px solid transparent;
  border-bottom: 19px solid transparent;
}
.bbt {
  position: absolute;
  top: -40px;
  right: 15px;
}
</style>
