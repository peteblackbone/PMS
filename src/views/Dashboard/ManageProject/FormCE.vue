<template>
  <v-card class="ma-2" flat>
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1"
      height="72vh"
      ><template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ data[0].FormType_Name }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="upNewDoc = !upNewDoc">Upload new document</v-btn>
          <template>
            <modal-container :active="upNewDoc" :cancellable="1">
              <template>
                <v-card width="600" height="230">
                  <v-card-title class="blue white--text">
                    Upload New Document
                    <v-spacer></v-spacer>
                    <v-btn icon @click="upNewDoc = !upNewDoc">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <div class="pa-5">
                    <v-file-input
                      show-size
                      truncate-length="50"
                      outlined
                      dense
                      label="Upload file"
                    ></v-file-input>
                  </div>
                  <v-btn
                    style="position: absolute; right: 20px;"
                    @click="apply"
                    right
                    >Apply</v-btn
                  >
                </v-card>
              </template>
            </modal-container>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:[`item.index`]="{ item }">
        {{ data.indexOf(item) + 1 }}
      </template>
      <template v-slot:[`item.actions`]="">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-file-document-multiple-outline</v-icon>
            </v-btn>
          </template>
          <span>ส่งเอกสารใหม่</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.Form_UpdatedTime`]="{ item }">
        <router-link
          :to="{ path: 'form_preview', query: { d: item.Form_ID } }"
          >{{
            new Date(item.Form_UpdatedTime).toLocaleDateString()
          }}</router-link
        >
        <v-badge color="red" inline content="5"></v-badge>
      </template>
      <template v-slot:[`item.FormStatus_ID`]="{ item }">
        <span
          class="circle-dot mr-2"
          :class="`status-${item.FormStatus_ID}`"
        ></span>
        {{ statusText[item.FormStatus_ID] }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import DB from "@/mixins/Database";
import ModalContainer from "@/components/ModalContainer";
export default {
  components: {
    ModalContainer
  },
  data() {
    return {
      upNewDoc: false,
      data: [],
      headers: [
        { text: "#", value: "index" },
        {
          text: "อัปเดตล่าสุด",
          align: "start",
          sortable: false,
          value: "Form_UpdatedTime"
        },
        { text: "สถานะ", value: "FormStatus_ID" }
      ],
      statusText: [
        "",
        "Pending",
        "Wait Adviser",
        "Wait Instructor",
        "Rejected",
        "Completed"
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.data = await DB.ManageProject.formCE(this.gID, this.fID);
      console.log(this.data);
    },
    apply() {
      alert("upload");
    }
  },
  computed: {
    fID() {
      return this.$route.query.type;
    },
    gID() {
      return this.$route.query.gID;
    }
  }
};
</script>

<style>
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
