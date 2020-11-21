<template>
  <div class="grey lighten-5">
    <v-toolbar height="56px" flat>
      <v-toolbar-title>Project Descriptions</v-toolbar-title>
      <v-divider class="mx-4" vertical inset></v-divider>
    </v-toolbar>
    <div>
      <v-container>
        <v-row no-gutters>
          <v-col v-for="item in projectDesc" :key="item" cols="12">
            <v-row>
              <v-col cols="3" class="d-flex justify-end">{{
                item.title
              }}</v-col>
              <v-col cols="9">{{ item.data }}</v-col>
            </v-row>
            <v-divider v-show="item.end"></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectDesc: [
        { title: "ชื่อภาษาไทย", data: "132165496" },
        { title: "ชื่อภาษาอังกฤษ", data: "asdasd", end: true },
        { title: "สมาชิก" },
        { title: "อาจารย์ที่ปรึกษา", end: true },
        { title: "บทคัดย่อ" },
      ],
    };
  },
};
</script>

<style></style>
