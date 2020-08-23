<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1 scrollable"
      height="74vh"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Project List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="showModal">Propose new topic</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="joinGroup(item.Group_ID)">
          mdi-pencil
        </v-icon>
        <v-icon small>
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <template>
      <modal-container :active="dialog" :cancellable="1" @close="hideModal">
        <new-topic
          @close="hideModal"
          @newProject="newProject"
          :data="teacher_list"
        ></new-topic>
      </modal-container>
    </template>
  </div>
</template>

<script>
import Axios from "axios";
import DB from "@/mixins/Database";

import ModalContainer from "@/components/ModalContainer";
import NewTopic from "@/components/TopicProposalNewTopic";
export default {
  components: {
    ModalContainer,
    NewTopic,
  },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };
    return {
      data: [{Group_Name:"aaaaaaa",Group_Detail:"zasdasd",Group_Type:"Software",Group_Status:"zczxcxzc"}],
      dialog: false,
      headers: [
        {
          text: "Group Name",
          align: "start",
          sortable: true,
          value: "Group_Name",
        },
        { text: "Detail", value: "Group_Detail" },
        { text: "Type", value: "Group_Type" },
        {
          text: "Member",
          value: "Group_Member",
        },
        { text: "Status", value: "Group_Status" },
        { text: "Action", value: "actions" },
      ],
      teacher_list: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] },
      ],
    };
  },
  methods: {
    newProject(val) {
      DB.propose_new_project(val);
    },
    getGroupData() {
      this.data = DB.fetch_group();
    },
    joinGroup(val) {
      DB.join(val);
    },
    hideModal() {
      this.dialog = false;
    },
    showModal() {
      this.dialog = true;
    },
  },
  mounted() {
    this.getGroupData();
  },
};
</script>
<style></style>
