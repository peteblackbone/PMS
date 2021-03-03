<template>
  <div v-if="!user.Student_GroupID">
    <project-data-table
      :data="allGroup"
      :loading="loading"
    ></project-data-table>
  </div>
  <div v-else>
    <project-detail :data="selfGroup"></project-detail>
  </div>
</template>

<script>
import DB from "@/mixins/Database";

import ProjectDataTable from "@/components/ProjectDataTable";
import ProjectDetail from "@/components/ProjectDetail";
export default {
  components: {
    ProjectDataTable,
    ProjectDetail
  },
  data() {
    return {
      // user: { Student_GroupID: 5 },
      loading: true,
      allGroup: [],
      GroupData: [],
      selfGroup: {}
    };
  },
  methods: {
    async loadData() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      if (this.gID) {
        let temp = {};
        temp = await DB.Group.GetSelfGroup(this.gID);
        temp.Members = await DB.User.GetAllStudentByGroupID(this.gID);
        // temp.Teachers = await DB.User.
        this.selfGroup = temp;
        // this.GroupData = await DB.Group.GetAllStudentByGroupID(this.gID);
        console.log(this.selfGroup);
      } else {
        this.allGroup = await DB.Group.GetAllGroup();
      }
      this.loading = false;
    }
  },
  beforeMounted() {
    this.loadData();
  }
};
</script>
<style scoped></style>
