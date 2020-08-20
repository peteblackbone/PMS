<template>
  <div>
    <v-card width="800" height="600">
      <v-card-title class="blue">
        New Project
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-container>
        <v-form>
          <v-text-field
            :label="`Project name`"
            :rules="[(v) => !!v || 'Name is required']"
          ></v-text-field>
          <v-autocomplete
            v-model="teachers"
            :disabled="isUpdating"
            :items="people"
            required
            :rules="[(v) => !!v || 'Item is required']"
            chips
            color="blue-grey lighten-2"
            label="Advisor"
            item-text="name"
            item-value="name"
            multiple
            hide-no-data
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                <v-avatar left>
                  <v-img :src="data.item.avatar"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-avatar>
                  <img :src="data.item.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.group"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };

    return {
      autoUpdate: true,
      teachers: [],
      isUpdating: false,
      name: "Midnight Crew",
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] },
      ],
      title: "The summer breeze",
      teacher_list: [
        { name: "AAAA", id: 1 },
        { name: "BBBB", id: 2 },
      ],
    };
  },
  methods: {
    // async fetch_teacher(){
    //   this.teacher_list = await Axios.get("").then(res=>{
    //     return res.data
    //   })
    // },
    remove(item) {
      const index = this.teachers.indexOf(item.name);
      if (index >= 0) this.teachers.splice(index, 1);
    },
    close() {
      this.$emit("close");
    },
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then((res) => res.json())
        .then((res) => {
          const { count, entries } = res;
          this.count = count;
          this.teacher_list = entries;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {
    // this.fetch_teacher();
  },
};
</script>

<style>
.icons {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
</style>
