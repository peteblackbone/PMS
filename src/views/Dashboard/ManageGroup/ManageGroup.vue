<template>
  <div>
    <v-card v-if="!gID" class="ma-2" flat>
      <v-data-table
        :headers="allGroupHeaders"
        :items="data"
        :loading="loading"
        loading-text="Loading... Please wait"
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
        <template v-if="gID" v-slot:[`body.prepend`]>
          <tr class="green accent-3">
            <td>{{ selfGroup.Project_Name }}</td>
            <td>
              <v-chip
                class=" white--text"
                :class="`type-${selfGroup.ProjectType_ID}`"
                small
              >
                {{ selfGroup.ProjectType_Name }}
              </v-chip>
            </td>
            <td>{{ 1 + " / " + selfGroup.Project_MaxMember }}</td>
            <td>{{ selfGroup.Project_Detail }}</td>
            <td>{{ selfGroup.Section_Term + "/" + selfGroup.Section_Year }}</td>
            <td>{{ selfGroup.RequestStatus_Name }}</td>
            <td>
              <v-icon size="16" @click="showJoinGroupModal(ownGroup)">
                mdi-magnify
              </v-icon>
            </td>
          </tr>
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
    <div v-else class="d-flex">
      <v-card class="elevation-1 mr-2" style="width:70%; min-height:89vh">
        <v-toolbar flat color="white">
          <v-toolbar-title>
            {{
              "Manage Group - " +
                (selfGroup.Project_NameTH ? selfGroup.Project_NameTH : "")
            }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn class="error white--text" @click="showProposalModal">
            <v-icon class="mr-2">mdi-account-cancel-outline</v-icon>
            ออกจากกลุ่ม
          </v-btn>
        </v-toolbar>
      </v-card>
      <div style="width:30%">
        <v-card class="elevation-1 mb-2" flat>
          <v-card-text>{{ "Member" }}</v-card-text>
          <v-divider></v-divider>
          <v-list>
            <template v-for="(item, index) in selfGroup.Members">
              <v-list-item :key="item.Student_ID">
                <v-list-item-content>
                  <v-list-item-title>{{
                    item.Student_Firstname + " " + item.Student_Lastname
                  }}</v-list-item-title>
                  <v-list-item-subtitle>asdasd</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                v-if="index != selfGroup.Members.length - 1"
                class="mx-2"
                :key="item"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
        <v-card flat class="elevation-1"
          ><v-card-text>{{ "Teacher" }}</v-card-text>
          <v-divider></v-divider>
          <v-list>
            <template v-for="(item, index) in ['a', 'b']">
              <v-list-item :key="item">
                <v-list-item-content
                  ><v-list-item-title>{{ item }}</v-list-item-title
                  ><v-list-item-subtitle
                    >asdasdasd</v-list-item-subtitle
                  ></v-list-item-content
                >
              </v-list-item>
              <v-divider
                v-if="index != ['a', 'b'].length - 1"
                class="mx-2"
                :key="item"
              ></v-divider>
            </template> </v-list
        ></v-card>
      </div>
    </div>
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
      gID: JSON.parse(sessionStorage.getItem("user")).Student_GroupID,
      loading: true,
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
      teacher_list: [],
      projectDesc: [
        { id: 1, title: "ชื่อภาษาไทย", data: "Project_NameTH" },
        { id: 2, title: "ชื่อภาษาอังกฤษ", data: "Project_NameEN", end: true }
        // { id: 3, title: "สมาชิก", data: "Members" }
        // {
        //   id: 4,
        //   title: "อาจารย์ที่ปรึกษา",
        //   data: [
        //     {
        //       name: "asd zxc",
        //       legacy: "AZ",
        //       faculty: "วิศวกรรมศาสตร์",
        //       field: "ค.อ.บ.วิศวกรรมไฟฟ้า-วิศวกรรมคอมพิวเตอร์"
        //     }
        //   ],
        //   end: true
        // },
        // {
        //   id: 5,
        //   title: "บทคัดย่อ",
        //   data:
        //     "โครงงานนี้มีวัตถุประสงค์เพื่อช่วยจัดการ การทำโครงงานแก่นักศึกษาวิศวกรรมคอมพิวเตอร์ มทร.ล้านนาให้เป็นระบบมากยิ่งขึ้น และเป็นแนวทางในการทำโครงงาน เพื่อให้นักศึกษาสามารถส่งงานหรือเอกสารผ่านทางเว็บไซต์ได้ เพื่อจัดเก็บโครงงานของนักศึกษา เพื่อลดพื้นที่ในการเก็บเอกสาร โดยใช้ เว็บไซต์บริหารและจัดการโครงงานวิศวกรรมคอมพิวเตอร์ มทร.ล้านนา เข้ามาเป็นสื่อกลางระหว่างอาจารย์และนักศึกษาในการทำโครงงาน รวมไปถึงระบบสนับสนุนการส่งโครงงานและเอกสารที่เกี่ยวข้องผ่านทางเว็บไซต์ให้กับอาจารย์และนักศึกษาผลที่คาดว่าจะได้รับ นักศึกษาจะได้รู้ว่าการทำโครงงานควรจะเริ่มต้นยังไงและทางเว็บไซต์จะสามารถช่วยบริหารว่า ช่วงเวลาไหนควรส่งเอกสารไหนอีก อีกทั้งยังลดเวลาและลดค่าใช้จ่ายต่าง ๆ และยังสามารถเพิ่มความสะดวกสบายในการทำโครงงานมากยิ่งขึ้น"
        // }
      ]
    };
  },
  methods: {
    async getGroupData() {
      if (this.gID) {
        let temp = {};
        temp = await DB.Group.GetSelfGroup(this.gID);
        temp.Members = await DB.User.GetAllStudentByGroupID(this.gID);
        // temp.Teachers = await DB.User.
        this.selfGroup = temp;
        // this.GroupData = await DB.Group.GetAllStudentByGroupID(this.gID);
        console.log(this.selfGroup);
      } else {
        this.data = await DB.Group.GetAllGroup();
      }
      this.loading = false;
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
    }
    // getSelfGroup(gID) {
    //   console.log(gID);
    //   this.selfGroup = this.data.filter(group => {
    //     return group.Project_ID == gID;
    //   })[0];
    //   this.data.splice(
    //     this.data.findIndex(e => e.Project_ID === gID),
    //     1
    //   );
    // }
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
