<template>
  <div v-if="loaded" class="overflow-y-auto" style="max-height: 91vh">
    <v-card class="ma-2" tile min-height="88.5vh">
      <v-tabs v-model="tab" color="white" show-arrows background-color="blue">
        <v-tab
          v-for="item in tabs"
          :key="item.name"
          @click="fetchCE(item.name)"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab.name">
          <div class="pa-2 mr-1 pr-3 ml-4 pb-4">
            <item-list
              v-for="(header, i) in tab.headers"
              :key="header.title"
              :header="header"
              :data="data"
              @submit="submit"
            >
              <template v-slot:header>
                <h3 class="mr-2" style="height:28px">
                  {{ i + 1 + ". " }}{{ header.header }}
                </h3>
              </template>
            </item-list>
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
      loaded: false,
      tab: null,
      tabs: CE_HEADER(),
      data: [],
    };
  },
  methods: {
    async fetchCE(val) {
      this.data = {};
      this.data = await DB.fetch_ce(val);
      this.loaded = true;
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

<style></style>
