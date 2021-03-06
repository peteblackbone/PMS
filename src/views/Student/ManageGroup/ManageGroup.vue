<template>
  <div v-if="!gID">
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
      user: {},
      // gID: 28,
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
        temp = await DB.Group.GetSelf(this.gID);
        console.log(temp)
        temp.Members = await DB.Group.GetSelfGroupMember(this.gID);
        temp.Advisor = await DB.Group.GetAdvisor(this.gID);
        this.selfGroup = temp;
        console.log(this.selfGroup);
      } else {
        this.allGroup = await DB.Group.GetAll();
        console.log(this.allGroup)
      }
      this.loading = false;
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>
<style scoped></style>
