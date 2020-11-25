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
          <v-toolbar-title
            v-t="{ path: 'DASHBOARD.MANAGE_GROUP.MANAGE_GROUP' }"
          >
            <!-- จัดการกลุ่ม -->
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="showProposalModal">เสนอหัวข้อใหม่</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="showJoinGroupModal(item)">
          mdi-magnify
        </v-icon>
      </template>
      <template v-slot:[`item.GROUP_MEMBER`]="{ item }">
        {{ item.MEMBERS.length }} / {{ item.GROUP_MEMBER }}
      </template>
      <!-- <template v-slot:[`body.prepend`]>
        <tr class="warning">
          <td>{{ ownGroup.GROUP_EN_NAME }}</td>
          <td>asd</td>
          <td>Software</td>
          <td>0 / 2</td>
          <td>Pending</td>
          <td>
            <v-icon size="16" @click="showJoinGroupModal(ownGroup)"
              >mdi-magnify</v-icon
            >
          </td>
        </tr>
      </template> -->
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
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };
    return {
      data: [],
      GroupData: [],
      proposal_modal: false,
      joinGroup_modal: false,
      selectedGroup: null,
      ownGroup: {
        GROUP_ID: 1,
        GROUP_TH_NAME: "ระบบบริหารและจัดการโครงงาน",
        GROUP_EN_NAME: "Project Management Systemaaaaa",
        GROUP_DETAIL: "zasdasd",
        GROUP_TYPE: "Software",
        GROUP_STATUS: "Approved",
        GROUP_MEMBER: "4",
        GROUP_ADVISOR: "A",
        MEMBERS: [
          {
            NAME: "a"
          },
          {
            NAME: "b"
          }
        ]
      },
      headers: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Group_Name"
        },
        { text: "อาจารย์ที่ปรึกษา", value: "GROUP_ADVISOR" },
        { text: "ประเภท", value: "Group_Type" },
        {
          text: "สมาชิก",
          value: "Group_Member"
        },
        { text: "สถานะ", value: "Group_RequestStatus" },
        { text: "Action", value: "actions" }
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
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] }
      ]
    };
  },
  methods: {
    async getGroupData() {
      this.data = await DB.fetch_group();
      console.log("Asdasd");
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
    hideModal() {
      this.proposal_modal = false;
      this.joinGroup_modal = false;
    },
    showProposalModal() {
      this.proposal_modal = true;
    },
    showJoinGroupModal(Group) {
      this.selectedGroup = Group;
      this.joinGroup_modal = true;
    }
  },
  mounted() {
    this.getGroupData();
  }
};
</script>
<style></style>
