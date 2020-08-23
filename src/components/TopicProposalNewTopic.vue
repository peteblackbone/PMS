<template>
  <div>
    <v-card width="800" height="600">
      <v-card-title class="blue">
        Propose New Project
        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-container>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <form>
            <ValidationProvider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="project_name"
                :error-messages="errors"
                label="Project Name"
                required
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Advisors"
              rules="required|advisors:2"
            >
              <v-autocomplete
                :error-messages="errors"
                v-model="selected"
                :disabled="isUpdating"
                :items="data"
                chips
                color="blue-grey lighten-2"
                label="Advisors"
                item-text="name"
                item-value="name"
                multiple
                hide-no-data
                clearable
              >
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    
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
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
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
            </ValidationProvider>
            <v-btn class="mr-4" @click="submit">submit</v-btn>
          </form>
        </ValidationObserver>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { required, email, max, length } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
var selected = [];
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("advisors", {
  message:"{_field_} limit exceeded (2)",
  validate(advisors, maxCount) {
    if (advisors.length <= maxCount[0]) {
      return true;
    }
    return false;
  },
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    data: Array,
  },
  data() {
    return {
      project_name: "",
      autoUpdate: true,
      selected: selected,
      isUpdating: false,
      name: "Midnight Crew",

      title: "The summer breeze",
    };
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        this.submitForm();
        this.close();
      }
    },
    submitForm() {
      this.$emit("newProject", {
        name: this.project_name,
        advisors: this.selected,
      });
    },
    remove(item) {
      const index = this.selected.indexOf(item.name);
      if (index >= 0) this.selected.splice(index, 1);
    },
    close() {
      this.project_name = "";
      this.selected = null;
      this.$refs.observer.reset();
      this.$emit("close");
    },
  },
  watch: {
    selected: function() {
      selected = this.selected;
      console.log(selected)
    },
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
