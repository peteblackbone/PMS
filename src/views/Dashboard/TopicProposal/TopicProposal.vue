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
        <v-icon small class="mr-2" @click="join(item.Group_ID)">
          mdi-pencil
        </v-icon>
        <v-icon small>
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <template>
        <modal-container :active="dialog" :cancellable="1" @close="hideModal">
            <new-topic @close="hideModal"></new-topic>
        </modal-container>
    </template>
  </div>
</template>

<script>
import ModalContainer from "@/components/ModalContainer"
import NewTopic from "@/components/TopicProposalNewTopic"
import Axios from "axios";
export default {
    components:{
        ModalContainer,
        NewTopic
    },
  data() {
    return {
      data: [],
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
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    };
  },
  methods: {
    async fetch_group() {
      this.data = await Axios.get(
        "http://192.168.86.247:3000/student/topic"
      ).then((res) => {
        return res.data;
      });
    },
    join(id) {
      Axios.post("http://192.168.86.247:3000/student/topic/join", {
        STD_GroupID: id,
        STD_ID: 1,
      });
    },
    hideModal(){
        this.dialog = false;
    },
    showModal(){
        this.dialog =true;
    }
  },
  mounted() {
    this.fetch_group();
  },
};
</script>
<style></style>
