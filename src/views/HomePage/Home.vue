<template>
  <div class="home-container">
    <v-app-bar height="60" color="transparent" elevate-on-scroll>
      <v-avatar>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      <v-toolbar-title style="width:420px"
        >Project Management Systems</v-toolbar-title
      >
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="primary"
        right
        class="mr-4"
      >
        <v-tab v-for="item in tabs" :key="item.title" :to="item.route"
          >{{ item.title }}
          <v-icon class="ml-2" v-if="item.icon">{{ item.icon }}</v-icon>
        </v-tab>
      </v-tabs>
      <!-- <div v-if="isLogin">
        <dashboard-profile :data="account_data"></dashboard-profile>
      </div>
      <div v-else>
        <v-btn outlined x-large color="blue">Login</v-btn>
      </div> -->
    </v-app-bar>
    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <v-footer absolute class="font-weight-medium footer-color">
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
    </v-footer>
  </div>
</template>

<script>
import DashboardProfile from "@/components/DashboardProfile";
import RecentList from "@/components/RecentList";
import Entry from "@/components/Entry";
export default {
  components: {
    DashboardProfile,
    RecentList,
    Entry,
  },
  data() {
    return {
      tab: null,
      tabs: [
        { title: "หน้าหลัก", route: "/" },
        { title: "ค้นหาโครงงาน", route: "/search" },
        { title: "เกี่ยวกับ", route: "/about" },
        { title: "เข้าสู่ระบบ", route: "/login", icon: "mdi-lock" },
      ],
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
  min-height: inherit;
  /* background-image: url("../../assets/aff4cc28ca93b3507d41ba0f88ec53db.jpg"); */
  background-image: linear-gradient(
      to bottom,
      rgba(245, 246, 252, 0.52),
      rgba(117, 19, 93, 0.73)
    ),
    url("../../assets/aff4cc28ca93b3507d41ba0f88ec53db.jpg");
  background-size: cover;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.footer-color{
  background-color: #ffffff55;
}
</style>
