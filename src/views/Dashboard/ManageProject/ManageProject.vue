<template>
  <v-card class="ma-2" flat>
    <v-data-table
      :headers="headers"
      :items="data"
      :item-class="rowStyle"
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
      <template v-slot:[`item.FormStatus_ID`]="{ item }">
        <span
          class="circle-dot mr-2"
          :class="`status-${item.FormStatus_ID}`"
        ></span>
        {{ statusText[item.FormStatus_ID] }}
      </template>
      <template v-slot:[`item.FormType_Name`]="{ item }">
        <router-link
          :to="{
            path: 'form_ce',
            query: { gID: item.Form_GroupID, type: item.FormType_ID }
          }"
          >{{ item.FormType_Name }}</router-link
        >
      </template>
      <template v-slot:[`item.Form_UpdatedTime`]="{ item }">
        {{ new Date(item.Form_UpdatedTime).toLocaleDateString() }}
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
export default {
  data: () => ({
    actionMenu: [
      { title: "Preview", method: "previewDoc" },
      { title: "Edit", method: "editDoc" },
      { title: "Delete", method: "deleteDoc" }
    ],

    statusText: [
      "",
      "Pending",
      "Wait Adviser",
      "Wait Instructor",
      "Rejected",
      "Completed"
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ชื่อเอกสาร", value: "FormType_Name" },
      { text: "อัปเดตครั้งที่", value: "rev" },
      { text: "อัปเดตล่าสุด", value: "Form_UpdatedTime" },
      { text: "สถานะ", value: "FormStatus_ID" },
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
  created() {
    this.initialize();
  },

  methods: {
    onClick(methodName) {
      this[methodName]();
    },
    async initialize() {
      this.data = await DB.ManageProject.form(29);

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
.circle-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-flex;
}
/* pending */
.status-1 {
  background-color: #fb6340 !important;
}
/* Wait Adviser */
.status-2 {
  background-color: aquamarine !important;
}
/* Wait Instructor */
.status-3 {
  background-color: aqua !important;
}
/* Rejected */
.status-4 {
  background-color: #f5365c !important;
}
/* Approved */
.status-5 {
  background-color: #2dce89 !important;
}
</style>
