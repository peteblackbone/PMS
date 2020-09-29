<template>
  <div>
    <v-card width="800" height="520">
      <v-card-title>
        <span class="blue--text">
          <v-icon>mdi-file-document-multiple-outline</v-icon>
          เสนอหัวข้อใหม่</span
        >

        <v-spacer></v-spacer>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-container class="">
        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider
              v-slot="{ errors }"
              name="ชื่อภาษาไทย"
              rules="required|max:10"
            >
              <v-text-field
                v-model="th_name"
                :error-messages="errors"
                label="ชื่อภาษาไทย"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="ชื่อภาษาอังกฤษ"
              rules="required"
            >
              <v-text-field
                v-model="en_name"
                :error-messages="errors"
                label="ชื่อภาษาอังกฤษ"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="จำนวน"
              rules="required"
            >
              <v-text-field
                v-model.number="number"
                :error-messages="errors"
                label="จำนวน"
                type="number"
                min="1"
              >
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="ประเภท"
              rules="required"
            >
              <v-select
                v-model="type"
                :items="[`ซอฟท์แวร์`, `ฮาร์ดแวร์`]"
                label="ประเภท"
                :error-messages="errors"
              >
              </v-select>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="อาจารย์ที่ปรึกษา"
              rules="required|advisors:2"
            >
              <v-autocomplete
                :error-messages="errors"
                v-model="selected"
                :items="data"
                chips
                color="blue-grey lighten-2"
                label="อาจารย์ที่ปรึกษา"
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
          </form>
        </ValidationObserver>
      </v-container>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="success" @click="submit">submit</v-btn>
      </div>
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

extend("required", {
  ...required,
  message: "โปรดกรอก{_field_}",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("advisors", {
  message: "{_field_} limit exceeded (2)",
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
      th_name: "",
      en_name: "",
      type: null,
      number: 1,
      selected: [],
      autoUpdate: true,
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
        // GROUP_TH_NAME: this.th_name,
        Group_Name: this.en_name,
        Group_Detail: "aaa",
        Group_Type: this.type,
        Group_Year: 2020,
        Group_Term: 1,
        // GROUP_ADVISOR: this.selected,
        Group_Member: this.number,
        Group_Status: "In Progress",
        Group_RequestStatus: "Pending",

        // MEMBERS: [],
      });
    },
    remove(item) {
      const index = this.selected.indexOf(item.name);
      if (index >= 0) this.selected.splice(index, 1);
    },
    close() {
      this.project_name = "";
      this.selected = [];
      this.$refs.observer.reset();
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
