<template>
  <div v-if="!gID">
    <project-data-table
      :data="allGroup"
      :loading="loading"
      :headers="allGroupHeaders"
      :type="allType"
      :status="allStatus"
      @newProject="newProject"
      @joinProject="joinProject"
    ></project-data-table>
  </div>
  <div v-else>
    <project-detail :data="selfGroup"></project-detail>
  </div>
</template>

<script>
import ProjectDataTable from "@/components/ProjectDataTable";
import ProjectDetail from "@/components/ProjectDetail";
export default {
  components: {
    ProjectDataTable,
    ProjectDetail
  },
  data() {
    return {
      user: {},
      // gID: 28,
      loading: true,
      GroupData: [],
      selfGroup: {},
      allType: [{ ProjectType_ID: 0, ProjectType_Name: "ทั้งหมด" }],
      allStatus: [{ ProjectStatus_ID: 0, ProjectStatus_Name: "ทั้งหมด" }],
      allGroup: [],
      allGroupHeaders: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Project_NameTH",
          width: 500
        },
        // { text: "อาจารย์ที่ปรึกษา", value: "GROUP_ADVISOR" },
        { text: "ประเภท", value: "Project_TypeID", sortable: false },
        { text: "สมาชิก", value: "Project_MaxMember", sortable: false },
        { text: "รายละเอียด", value: "Project_Detail", sortable: false },
        { text: "ปีการศึกษา", value: "Section_Year" },
        { text: "สถานะ", value: "Project_StatusID" },
        { text: "Action", value: "actions" }
      ]
    };
  },
  methods: {
    async loadData() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if (this.gID) {
        let temp = {};
        temp = await this.Project.GetSelf(this.gID);
        temp.Members = await this.Group.GetSelfGroupMember(this.gID);
        temp.Advisor = await this.Group.GetAdvisor(this.gID);
        this.selfGroup = temp;
      } else {
        const type = await this.Project.AllType();
        const status = await this.Project.AllStatus();
        type.forEach(item => {
          this.allType.push(item);
        });
        status.forEach(item => {
          this.allStatus.push(item);
        });
        this.allGroup = await this.Project.GetAll();
        // this.allGroup.map(async item => item.Members = await this.Project.GroupMember(item.Project_ID))
        console.log(this.allGroup);
      }
      this.loading = false;
    },
    newProject() {
      //
    },
    joinProject() {
      //
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>
<style scoped></style>
