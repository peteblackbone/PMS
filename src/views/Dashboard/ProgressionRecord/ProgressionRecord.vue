<template>
  <div>
    <v-container>
      <v-timeline dense>
        <v-timeline-item color="purple lighten-2" fill-dot>
          <v-card>
            <v-card-subtitle>19/4/2563</v-card-subtitle>
            <span class="ml-4 mb-4">งานที่ทำ</span>
            <v-card-text>
              ทำส่วนติดต่อ api
            </v-card-text>
            <span class="ml-4 mb-4">ปัญหา และ วิธีแก้ไข</span>
            <v-card-text>
              ติด cors
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item color="purple lighten-2" fill-dot right>
          <v-card>
            <v-card-title>title</v-card-title>
            <v-card-subtitle>19/4/2563</v-card-subtitle>
            <v-card-text>
              asdasd
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <v-btn fab bottom right absolute color="blue" class="float-btn"> </v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{}],
    };
  },
};
</script>

<style>
.float-btn{
  bottom: 20px !important;
}
</style>
