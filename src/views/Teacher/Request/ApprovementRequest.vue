<template>
  <v-card class="ma-2" tile style="height:inherit">
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :loading="loading"
      :search="searchText"
      loading-text="Loading... Please wait"
      class="elevation-1"
      :height="windowHeight"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            Documents Approvement Request
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-2"
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
// import FormStatus from "@/components/FormStatus";
export default {
  components: {
    // FormStatus
  },
  data() {
    return {
      headers: [
        { text: "#", value: "no", sortable: true },
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Project_NameTH",
          width: 500
        },
        {
          text: "ชื่อฟอร์ม",
          value: "Project_FormID",
          sortable: true
        },
        {
          text: "สถานะ",
          value: "Project_FormStatus",
          sortable: true
        }
      ]
    };
  },
  computed: {
    windowHeight() {
      return window.innerHeight - 203;
    }
  }
};
</script>

<style></style>
