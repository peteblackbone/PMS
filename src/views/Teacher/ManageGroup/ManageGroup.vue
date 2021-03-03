<template>
  <project-data-table :data="allGroup" :loading="loading"></project-data-table>
</template>

<script>
import DB from "@/mixins/Database";

import ProjectDataTable from "@/components/ProjectDataTable";
export default {
  components: {
    ProjectDataTable
  },
  data() {
    return {
      user: null,
      loading: true,
      allGroup: [],
      GroupData: [],
      selfGroup: {}
    };
  },
  methods: {
    async loadData() {
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
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.loadData();
  }
};
</script>
<style scoped></style>
