<template>
  <div style="max-width:inherit">
    <!-- <v-app-bar
      height="100"
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-avatar>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      <v-toolbar-title>PMS</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mr-2">หน้าหลัก</span>
      <span class="mr-2">ค้นหาโครงงาน</span>
      <span class="mr-2">YYYYYYYYYYYY</span>
      <v-spacer></v-spacer>
      <div v-if="isLogin">
        <dashboard-profile :data="account_data"></dashboard-profile>
      </div>
      <div v-else>
        <v-btn outlined x-large color="blue">Login</v-btn>
      </div>
    </v-app-bar> -->
    <div class="home-container">
      <v-main>
        <router-view></router-view>
      </v-main>
      <!-- <div class="d-lg-flex">
        <div class="recent-list-container">
          <recent-list :data="recent_project"></recent-list>
        </div>
        <div>ค้นหาโปรเจค</div>
      </div> -->
    </div>
    <!-- <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <div class="mx-12" style="display:inline-grid">
          <v-icon>mdi-bookshelf</v-icon>
          <span class="yellow--text text--darken-2">247,154</span>
          <span>โครงงานทั้งหมด</span>
        </div>
        <div class="mx-12" style="display:inline-grid">
          <v-icon>mdi-monitor-cellphone</v-icon>
          <span class="yellow--text text--darken-2">152,245</span>
          <span>ประเภทซอฟต์แวร์</span>
        </div>
        <div class="mx-12" style="display:inline-grid">
          <v-icon>mdi-chip</v-icon>
          <span class="yellow--text text--darken-2">154,214</span>
          <span>ประเภทฮาร์ดแวร์</span>
        </div>
      </v-col>
    </v-footer> -->
  </div>
</template>

<script>
import DashboardProfile from "@/components/DashboardProfile";
import RecentList from "@/components/RecentList";
export default {
  components: {
    DashboardProfile,
    RecentList,
  },
  data() {
    return {
      isLogin: false,
      account_data: { name: "asdasd", email: "cvcvxcv@dasd.com" },
      recent_project: [
        {
          title: "เครื่องขายขนมอัตโนมัติ",
          advisor: "อาจารย์ aaaaaaaa",
          tags: ["Hardware", "Iot", "Arduino"],
        },
        {
          title: "เว็บแปลภาษา",
          advisor: "อาจารย์ bbbbbbb",
          tags: ["Software", "Vuejs"],
        },
        {
          title: "เครื่องขายขนมอัตโนมัติ",
          advisor: "อาจารย์ aaaaaaaa",
          tags: ["Hardware", "Iot", "Arduino"],
        },
        {
          title: "เว็บแปลภาษา",
          advisor: "อาจารย์ bbbbbbb",
          tags: ["Software", "Vuejs"],
        },
      ],
    };
  },
};
</script>

<style>
.recent-list-container {
  width: 50vw;
  height: 70vh;
  padding: 100px;
}
.middle {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.home-container {
  height: calc(100%);
  /* background-image: url("../../assets/aff4cc28ca93b3507d41ba0f88ec53db.jpg"); */
  background-image:
    linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
    url('../../assets/aff4cc28ca93b3507d41ba0f88ec53db.jpg');
  background-size:cover;
}
</style>
