<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize">
    <v-data-table
      :headers="allGroupHeaders"
      :items="filteredItems"
      :loading="loading"
      :search="searchText"
      loading-text="Loading... Please wait"
      :height="windowHeight"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            Manage Group
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-2"
          ></v-text-field>
          <v-select
            v-model="typeFilter"
            :items="projectType"
            item-text="ProjectType_Name"
            item-value="ProjectType_ID"
            hide-details
            outlined
            dense
            label="Type"
            class="mr-2"
            style="width:1%"
          ></v-select>
          <v-select
            v-model="statusFilter"
            :items="projectStatus"
            item-text="ProjectStatus_Name"
            item-value="ProjectStatus_ID"
            hide-details
            outlined
            dense
            label="Status"
            style="width:2%"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn class="primary white--text" @click="showProposalModal">
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เสนอหัวข้อใหม่
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.ProjectType_Name`]="{ item }">
        <v-chip
          class=" white--text"
          :class="`type-${item.ProjectType_ID}`"
          small
        >
          {{ item.ProjectType_Name }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_MaxMember`]="{ item }">
        {{ 1 + " / " + item.Project_MaxMember }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showJoinGroupModal(item)">
          mdi-magnify
        </v-icon>
      </template>
      <template v-slot:[`item.Project_StatusID`]="{ item }">
        <group-status :status="item.Project_StatusID"></group-status>
      </template>
    </v-data-table>
    <template>
      <modal-container
        :active="proposal_modal"
        :cancellable="1"
        @close="hideModal"
      >
        <new-topic
          @close="hideModal"
          @newProject="newProject"
          :data="teacher_list"
          :alltype="allType"
        ></new-topic>
      </modal-container>
    </template>
    <template>
      <modal-container
        :active="joinGroup_modal"
        :cancellable="1"
        @close="hideModal"
      >
        <join-group
          @submit="joinGroup"
          @close="hideModal"
          :data="selectedGroup"
        >
        </join-group>
      </modal-container>
    </template>
  </v-card>
</template>

<script>
import DB from "@/mixins/Database";

import ModalContainer from "@/components/ModalContainer";
import NewTopic from "@/components/TopicProposalNewTopic";
import JoinGroup from "@/components/TopicProposalJoinGroup";
import GroupStatus from "@/components/GroupStatus";

export default {
  components: {
    ModalContainer,
    NewTopic,
    JoinGroup,
    GroupStatus
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedGroup: null,
      allType: [],
      typeFilter: 0,
      projectType: [{ ProjectType_ID: 0, ProjectType_Name: "ทั้งหมด" }],
      statusFilter: 0,
      projectStatus: [{ ProjectStatus_ID: 0, ProjectStatus_Name: "ทั้งหมด" }],
      searchText: "",
      proposal_modal: false,
      joinGroup_modal: false,
      teacher_list: [],
      windowHeight: 0,
      allGroupHeaders: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Project_NameTH",
          width: 500
        },
        // { text: "อาจารย์ที่ปรึกษา", value: "GROUP_ADVISOR" },
        { text: "ประเภท", value: "ProjectType_Name", sortable: false },
        { text: "สมาชิก", value: "Project_MaxMember", sortable: false },
        { text: "รายละเอียด", value: "Project_Detail", sortable: false },
        { text: "ปีการศึกษา", value: "Section_Year" },
        { text: "สถานะ", value: "Project_StatusID" },
        { text: "Action", value: "actions" }
      ]
    };
  },
  computed: {
    filteredItems() {
      return this.data
        .filter(item => {
          return !this.typeFilter || item.ProjectType_ID == this.typeFilter;
        })
        .filter(item => {
          return (
            !this.statusFilter || item.ProjectStatus_ID == this.statusFilter
          );
        });
    }
    // windowHeight() {
    //   return window.innerHeight - 203;
    // }
  },
  methods: {
    async loadData() {
      this.allType = await DB.Project.alltype();
      const status = await DB.Project.allstatus();
      this.allType.forEach(item => {
        this.projectType.push(item);
      });
      status.forEach(item => {
        this.projectStatus.push(item);
      });
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      console.log(window.innerHeight);
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    async newProject(val) {
      await DB.Project.proposeNewProject(val);
      this.getGroupData();
    },

    async joinGroup(val) {
      await DB.join(val, JSON.parse(localStorage.getItem("user")).user.STD_ID);
      this.hideModal();
    },
    async getAllTeacher() {
      this.teacher_list = await DB.User.GetAllTeacher();
    },
    hideModal() {
      this.proposal_modal = false;
      this.joinGroup_modal = false;
    },
    showProposalModal() {
      this.getAllTeacher();
      this.proposal_modal = true;
    },
    showJoinGroupModal(Group) {
      this.selectedGroup = Group;
      this.joinGroup_modal = true;
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
/* Hardware */
.type-1 {
  background-color: #69f0ae !important;
}
/* Software */
.type-2 {
  background-color: #ffd54f !important;
}
/* Sofware and Hardware */
.type-3 {
  background-color: #b388ff !important;
}
</style>
