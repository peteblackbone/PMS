<template>
  <div>
    <v-card v-if="!user.gID" class="ma-2" flat>
      <v-data-table
        :headers="headers"
        :items="data"
        class="elevation-1"
        height="72vh"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              Manage Group
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn class="primary white--text" @click="showProposalModal">
              <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
              เสนอหัวข้อใหม่
            </v-btn>
          </v-toolbar>
        </template>
        <template v-if="user.gID" v-slot:[`body.prepend`]>
          <tr class="green accent-3">
            <td>{{ selfGroup.Project_Name }}</td>
            <td>
              <v-chip
                class=" white--text"
                :class="`type-${selfGroup.ProjectType_ID}`"
                small
                >{{ selfGroup.ProjectType_Name }}</v-chip
              >
            </td>
            <td>{{ 1 + " / " + selfGroup.Project_MaxMember }}</td>
            <td>{{ selfGroup.Project_Detail }}</td>
            <td>{{ selfGroup.Section_Term + "/" + selfGroup.Section_Year }}</td>
            <td>{{ selfGroup.RequestStatus_Name }}</td>
            <td>
              <v-icon size="16" @click="showJoinGroupModal(ownGroup)"
                >mdi-magnify</v-icon
              >
            </td>
          </tr>
        </template>
        <template v-slot:[`item.ProjectType_Name`]="{ item }">
          <v-chip
            class=" white--text"
            :class="`type-${item.ProjectType_ID}`"
            small
            >{{ item.ProjectType_Name }}</v-chip
          > </template
        ><template v-slot:[`item.Project_MaxMember`]="{ item }">
          {{ 1 + " / " + item.Project_MaxMember }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="showJoinGroupModal(item)">
            mdi-magnify
          </v-icon>
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
    <v-card v-else class="ma-2" flat>
      <v-data-table
        :headers="groupHeaders"
        :items="groupData"
        class="elevation-1"
        height="72vh"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ selfGroup.Project_Name }} </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn class="error white--text" @click="showProposalModal"
              ><v-icon class="mr-2">mdi-account-cancel-outline</v-icon>
              ออกจากกลุ่ม</v-btn
            >
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import DB from "@/mixins/Database";

import ModalContainer from "@/components/ModalContainer";
import NewTopic from "@/components/TopicProposalNewTopic";
import JoinGroup from "@/components/TopicProposalJoinGroup";
export default {
  components: {
    ModalContainer,
    NewTopic,
    JoinGroup
  },
  data() {
    return {
      user: { gID: 26 },
      data: [],
      GroupData: [],
      selfGroup: {},
      proposal_modal: false,
      joinGroup_modal: false,
      selectedGroup: null,
      allGroupHeaders: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Project_Name",
          width: 500
        },
        // { text: "อาจารย์ที่ปรึกษา", value: "GROUP_ADVISOR" },
        { text: "ประเภท", value: "ProjectType_Name" },
        {
          text: "สมาชิก",
          value: "Project_MaxMember"
        },
        { text: "รายละเอียด", value: "Project_Detail" },
        { text: "ปีการศึกษา", value: "Section_Year" },
        { text: "สถานะ", value: "RequestStatus_Name" },
        { text: "Action", value: "actions" }
      ],
      groupHeader: [{ text: "ชื่อ", value: "Student_Name" }],
      teacher_list: []
    };
  },
  methods: {
    async getGroupData() {
      this.data = await DB.Group.GetAllGroup();
      if (this.user.gID) {
        this.selfGroup = await this.getSelfGroup(this.user.gID);
        this.GroupData = await DB.Group.GetAllStudentByGroupID(this.user.gID);
      }
      console.log(this.data);
    },
    async newProject(val) {
      await DB.propose_new_project(val);
      this.getGroupData();
    },

    async joinGroup(val) {
      await DB.join(val, JSON.parse(localStorage.getItem("user")).user.STD_ID);
      this.hideModal();
      // const objIndex = this.data.findIndex((data) => data.GROUP_ID === val);
      // if (
      //   this.data[objIndex].MEMBERS.length < this.data[objIndex].GROUP_MEMBER
      // ) {
      //   this.data[objIndex].MEMBERS.push({
      //     name: JSON.parse(localStorage.getItem("user")).user,
      //   });
      //   DB.join(val, JSON.parse(localStorage.getItem("user")).user);
      //   this.hideModal();
      // } else {
      //   alert("Group limit exceeded");
      // }
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
    },
    getSelfGroup(gID) {
      console.log(gID);
      this.selfGroup = this.data.filter(group => {
        return group.Project_ID == gID;
      })[0];
      this.data.splice(
        this.data.findIndex(e => e.Project_ID === gID),
        1
      );
    }
  },
  mounted() {
    this.getGroupData();
  }
};
</script>
<style scoped>
.type-1 {
  background-color: rgb(20, 255, 255) !important;
}
.type-2 {
  background-color: rgb(231, 60, 47) !important;
}
</style>
