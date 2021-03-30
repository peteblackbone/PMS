<template>
  <v-card height="625">
    <v-card-title>
      <v-icon large class="blue--text text--lighten-2 ma-2 mr-5"
        >mdi-file-document-multiple-outline</v-icon
      >
      <span>เสนอหัวข้อใหม่</span>

      <v-spacer></v-spacer>
      <v-btn icon @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-container>
      <ValidationObserver ref="observer">
        <form class="new-topic">
          <ValidationProvider
            v-slot="{ errors }"
            name="ชื่อภาษาไทย"
            rules="required|thaiLang"
          >
            <v-text-field
              v-model="th_name"
              :error-messages="errors"
              prepend-inner-icon="mdi-alpha-t"
              label="ชื่อภาษาไทย"
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="ชื่อภาษาอังกฤษ"
            rules="required|engLang"
          >
            <v-text-field
              v-model="en_name"
              :error-messages="errors"
              prepend-inner-icon="mdi-alpha-e"
              label="ชื่อภาษาอังกฤษ"
              outlined
              dense
            ></v-text-field>
          </ValidationProvider>
          <v-textarea v-model="detail" outlined rows="3" no-resize label="Detail"></v-textarea>
          <div class="d-flex" style="width:100%">
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
                outlined
                dense
                class="mr-5"
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
                :items="alltype"
                label="ประเภท"
                item-text="ProjectType_Name"
                item-value="ProjectType_ID"
                :error-messages="errors"
                outlined
                dense
              >
              </v-select>
            </ValidationProvider>
          </div>

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
              item-text="Teacher_Firstname"
              item-value="Teacher_ID"
              multiple
              hide-no-data
              clearable
              outlined
              dense
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                  @click:close="remove(data.item)"
                  small
                >
                  <v-avatar left class="d-flex justify-center" color="blue">
                    <!-- <v-img :src="data.item.avatar"></v-img> -->
                    JT
                  </v-avatar>
                  {{ data.item.Teacher_Firstname }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <v-list-item-avatar color="blue" class="d-flex justify-center">
                  JT
                  <!-- <img :src="data.item.avatar" /> -->
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.Teacher_Firstname"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </ValidationProvider>
        </form>
      </ValidationObserver>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="success" @click="submit">Create</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "โปรดกรอก{_field_}"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});
extend("advisors", {
  message: "{_field_} limit exceeded (2)",
  validate: (value, maxCount) => !!(value.length <= maxCount[0])
});
extend("thaiLang", {
  message: "{_field_} must be Thai language ",
  validate: value => /^[ก-๏\s\d\\.]+$/.test(value)
});
extend("engLang", {
  message: "{_field_} must be English language ",
  validate: value => /^[a-zA-Z\s\d\\.]+$/.test(value)
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    alltype: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      th_name: "",
      en_name: "",
      detail:"",
      number: 1,
      type: null,
      selected: [],
      autoUpdate: true,
      isUpdating: false,
      name: "Midnight Crew",
      title: "The summer breeze"
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
        Project_NameTH: this.th_name,
        Project_NameEN: this.en_name,
        Project_Detail: this.detail,
        Group_Type: this.type,
        Project_MaxMember: this.number,
        Project_SectionID: 1,
        Project_TeacherID: 1
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
    }
  },
  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res;
          this.count = count;
          this.teacher_list = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },
  mounted() {
    // this.fetch_teacher();
  }
};
</script>

<style>
.icons {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}
.new-topic {
  margin: 10px;
}
</style>
