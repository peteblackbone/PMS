<template>
  <div class="gray ligthen-5">
    <v-container class="gray ligthen-5">
      <v-row>
        <v-col cols="9">asdas</v-col>
        <v-col cols="3">
          <v-card>
            <v-list two-line>
              <template v-for="(item, index) in Activities">
                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-item v-else :key="item.title" @click>
                  <v-list-item-avatar>
                    <v-icon size="64">mdi-account-circle</v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-progress-linear value="15"></v-progress-linear>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Activities: [
        { header: 'Activities' },
        {
          title: "Sent CE01",
          subtitle: "asdasdasdasdasdasdasdsad",
          date: "19 May"
        },
        { divider: true, inset: true },
        {
          title: "2b",
          subtitle:
            "cvxcvbxcbvxcvewfoiwjefsdkfposdkmfposdfpsndfpsdjfpsdojfpsdojfsdf",
          tag: "20 June"
        },
        { divider: true, inset: true },
        { title: "3c", subtitle: "vxcgwrtsdf", tag: "12 August" },
        { divider: true, inset: true },
        { title: "3c", subtitle: "vxcgwrtsdf", tag: "12 August" },
        { divider: true, inset: true },
      ]
    };
  }
};
</script>

<style>
</style>