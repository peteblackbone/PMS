import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";

import Login from "../views/Login/Login.vue";
import Home from "../views/HomePage/Home.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Profile from "../views/Dashboard/Profile/Profile.vue";
import Appointment from "../views/Dashboard/Appointment/Appointment.vue";
import Overview from "../views/Dashboard/Overview/Overview.vue";
import Description from "../views/Dashboard/ProjecDescription/Description.vue";
import Github from "../views/Dashboard/Github/Github.vue";
import GoogleCalendar from "../views/Dashboard/GoogleCalendar/GoogleCalendar.vue";
import Trello from "../views/Dashboard/Trello/TrelloBoard.vue";
import GoogleDrive from "../views/Dashboard/GoogleDrive/GoogleDrive.vue";
import ProjectManual from "../views/Dashboard/ProjectManual/ProjectManual.vue";
import TopicProposal from "../views/Dashboard/TopicProposal/TopicProposal.vue";
import CE01 from "../views/Dashboard/ManageProject/ManageProject.vue";
import ProgressionRecord from "../views/Dashboard/ProgressionRecord/ProgressionRecord.vue";

import SearchProject from "../components/SearchProject.vue";
import About from "../components/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "Home | PMS",
      metaTags: [
        {
          name: "description",
          content: "The home page of our example app.",
        },
        {
          property: "og:description",
          content: "The home page of our example app.",
        },
      ],
    },
    children: [
      {
        path: "",
        name: "Home",
        component: SearchProject,
        meta: { title: "Home | PMS" },
      },
      {
        path: "search",
        name: "Search",
        component: SearchProject,
        meta: { title: "Search Project | PMS" },
      },
      {
        path: "about",
        name: "About",
        component: About,
        meta: { title: "About | PMS" },
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { title: "Login | PMS" },
      },
    ],
  },

  {
    path: "/:role",
    name: "Student",
    meta: { guest: false },
    component: Dashboard,
    redirect: "/:role/overview",
    children: [
      {
        path: "overview",
        name: "Overview",
        component: Overview,
        meta: { title: "Overview | PMS" },
      },
      {
        path: "description",
        name: "Description",
        component: Description,
        meta: { title: "Project Descriptions | PMS" },
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
        meta: { title: "Profile | PMS" },
      },
      {
        path: "calendar",
        name: "Calendar",
        component: GoogleCalendar,
        meta: { title: "Google Calendar | PMS" },
      },
      {
        path: "appointment",
        name: "Appointment",
        component: Appointment,
        meta: { title: "Appointment | PMS" },
      },
      {
        path: "github",
        name: "Github",
        component: Github,
        meta: { title: "Github | PMS" },
      },
      {
        path: "trello",
        name: "Trello",
        component: Trello,
        meta: { title: "Trello | PMS" },
      },
      {
        path: "drive",
        name: "Drive",
        component: GoogleDrive,
        meta: { title: "Google Drive | PMS" },
      },
      {
        path: "assocdoc",
        name: "ProjectManual",
        component: ProjectManual,
        meta: { title: "Associated Documents | PMS" },
      },
      {
        path: "topic_proposal",
        name: "TopicProposal",
        component: TopicProposal,
        meta: { title: "Topic Proposal | PMS" },
      },
      {
        path: "ce01",
        name: "CE01",
        component: CE01,
        meta: { title: "CE01 | PMS" },
      },
      {
        path: "progression_record",
        name: "Progression Record",
        component: ProgressionRecord,
        meta: { title: "Progression Record | PMS" },
      },
    ],
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/search", "/login", "/about"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // if (authRequired && !loggedIn) {
  //   return next("/login");
  // }
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
