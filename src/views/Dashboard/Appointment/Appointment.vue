<template>
  <div>
    <v-toolbar height="56px" flat>
      <v-toolbar-title>Appointment</v-toolbar-title>
      <v-divider class="mx-4" vertical inset></v-divider>
      <v-spacer></v-spacer>
      <v-btn icon small>
        <v-icon @click="showModal">{{ "mdi-cog-outline" }}</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
