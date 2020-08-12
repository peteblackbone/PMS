<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.route">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="item.route">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Project Management System</span>
      </v-toolbar-title>

      <v-spacer />
      <v-container class="col-md-2">
        <v-select
          v-model="e1"
          :items="langs"
          menu-props="auto"
          hide-details
          label="selected"
          single-line
        ></v-select>
      </v-container>
      <div class="text-center">
        <v-menu v-model="notif" :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-badge :content="messages" :value="messages" color="red" overlap>
                <v-icon>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="400" tile>
            <v-list three-line>
              <v-subheader>Notifications</v-subheader>
              <v-list-item-group v-model="itemaa" color="primary">
                <v-list-item v-for="(item, i) in itemaas" :key="i" :inactive="inactive">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-if="twoLine || threeLine" v-html="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </div>

      <div class="text-center">
        <v-menu v-model="menu" close-on-content-click :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-avatar>
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-btn>
          </template>

          <v-card width="300">
            <v-list v-for="(item,i) in account_data" :key="i">
              <v-list-item>
                <v-list-item-avatar class="mx-auto my-3" size="96">
                  <v-icon size="96">mdi-account-circle</v-icon>
                </v-list-item-avatar>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title align="center" v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle align="center" v-text="item.email"></v-list-item-subtitle>
                  <v-btn class="my-5 mx-auto" rounded small outlined color="grey" max-width="200" :to="`/teacher/profile`">
                    Manage Account
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
              <v-list-item></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="primary" text @click="menu = false">Log out</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-chart-bar", text: "Overview", route: "/teacher/overview" },
      {
        icon: "mdi-newspaper-variant-multiple",
        text: "Project Description",
        route: "/teacher/description"
      },
      { icon: "mdi-bell", text: "Appointment", route: "/teacher/appointment" },
      { icon: "", text: "Advised Group", route: "/teacher/group"},
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Dev Tools",
        model: false,
        children: [
          { icon: "mdi-github", text: "GitHub" },
          { icon: "mdi-trello", text: "Trello" },
          { icon: "mdi-folder-google-drive", text: "Google Drive" },
          {
            icon: "mdi-calendar-month",
            text: "Google Calendar",
            route: "/teacher/calendar"
          }
        ]
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Assignment",
        model: false,
        children: [
          { icon: "mdi-github", text: "CE01" },
          { icon: "mdi-trello", text: "CE02" },
          { icon: "mdi-folder-google-drive", text: "CE03" },
          { icon: "mdi-calendar-month", text: "CE04" }
        ]
      },
    ],
    e1: "ไทย",
    langs: ["ไทย", "English"],
    fav: true,
    menu: false,
    message: false,
    hints: true,
    notif: false,
    messages: 5,
    noti: [
      { title: "edit", text: "aasdz lzcvpkjvadoinvoan madlnalnslm makmdlasmd" }
    ],
    itemaa: 5,
    itemaas: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ],
    twoLine: true,
    avatar: true,
    account_data: [
      { name: "Ponlachet Kammung", email: "ponlachet_ka59@rmutl.ac.th" }
    ]
  })
};
</script>
