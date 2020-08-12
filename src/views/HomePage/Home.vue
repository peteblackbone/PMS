<template>
  <div>
    <v-app-bar height="100" color="white">
      <v-avatar>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      <v-toolbar-title>PMS</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mr-2">Dashboard</span>
      <span class="mr-2">XXXXXX</span>
      <span class="mr-2">YYYYYYYYYYYY</span>
      <v-spacer></v-spacer>
      <div v-if="isLogin">
        <dashboard-profile :data="account_data"></dashboard-profile>
      </div>
      <div v-else>
        <v-btn outlined x-large color="blue">Login</v-btn>
      </div>
    </v-app-bar>
    <div class="home-container">
      <div class="d-lg-flex">
        <div class="recent-list-container">
          <!-- recent list -->
          <recent-list :data="recent_project"></recent-list>
        </div>
        <div>ค้นหาโปรเจค</div>
      </div>
    </div>
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
      isLogin: true,
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
        },{
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
  height: 86vh;
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

  height: 86vh;
}
</style>