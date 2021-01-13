<template>
  <v-card class="ma-2" flat>
    <v-data-table
      :headers="headers"
      :items="data"
      :item-class="rowStyle"
      :loading="loading"
      loading-text="Loading... Please wait"
      class="elevation-1"
      height="72vh"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Manage Project</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Form_StatusID`]="{ item }">
        <form-status :item="item.data"></form-status>
      </template>
      <template v-slot:[`item.FormType_Name`]="{ item }">
        <router-link
          :to="{
            path: 'form_ce',
            query: { gID: item.Form_GroupID, type: item.Form_TypeID }
          }"
          >{{ item.FormType_Name }}</router-link
        >
      </template>
      <template v-slot:[`item.Form_UpdatedTime`]="{ item }">
        <span v-if="item.data != undefined">
          {{ new Date(item.data.Form_UpdatedTime).toLocaleDateString() }}
          <!-- {{ item.data.Form_UpdatedTime.toLocaleDateString() }} -->
        </span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left min-width="20vw">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="gray">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="previewDoc(item)"
              ><v-list-item-title>Preview</v-list-item-title></v-list-item
            >
            <v-list-item @click="editDoc(item)"
              ><v-list-item-title>Edit</v-list-item-title></v-list-item
            >
            <v-list-item @click="deleteDoc(item)"
              ><v-list-item-title>Delete</v-list-item-title></v-list-item
            >
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import DB from "@/mixins/Database";
import FormStatus from "@/components/FormStatus";
export default {
  components: {
    FormStatus
  },
  data: () => ({
    loading: true,
    actionMenu: [
      { title: "Preview", method: "previewDoc" },
      { title: "Edit", method: "editDoc" },
      { title: "Delete", method: "deleteDoc" }
    ],

    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ชื่อเอกสาร", value: "FormType_Name" },
      { text: "อัปเดตครั้งที่", value: "rev", sortable: false },
      { text: "อัปเดตล่าสุด", value: "Form_UpdatedTime" },
      { text: "สถานะ", value: "Form_StatusID", sortable: false },
      { text: "", value: "actions", sortable: false }
    ],
    data: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  mounted() {
    this.initialize();
  },

  methods: {
    onClick(methodName) {
      this[methodName]();
    },
    async initialize() {
      const initData = [
        { FormType_Name: "CE01", Form_TypeID: 1 },
        { FormType_Name: "CE02", Form_TypeID: 2 },
        { FormType_Name: "CE03", Form_TypeID: 3 },
        { FormType_Name: "CE04", Form_TypeID: 4 },
        { FormType_Name: "CE05", Form_TypeID: 5 },
        { FormType_Name: "CE06", Form_TypeID: 6 },
        { FormType_Name: "CE07", Form_TypeID: 7 }
      ];
      const temp = await DB.Project.latestEachForm(29);
      if (temp) {
        initData.map(element => {
          element.data = temp.find(
            item => item.Form_TypeID == element.Form_TypeID
          );
        });
      }
      this.data = initData;
      this.loading = false;
    },
    rowStyle() {
      return "tb-row";
    },
    previewDoc(item) {
      console.log("preview", item);
    },
    editDoc() {
      console.log("edit");
    },
    deleteDoc() {
      console.log("delete");
    }
  }
};
</script>
<style>
.tb-row {
  height: 10vh;
}
</style>
