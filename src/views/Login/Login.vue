<template>
  <v-app class="blue lighten-3">
    <v-container class="my-auto">
      <v-card class="mx-auto pa-8" max-width="800">
        <v-row>
          <v-col md="6"></v-col>
          <v-col md="6">
            <form>
              <v-header class="headline">Login</v-header>
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="10"
                label="Username"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="Password"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-checkbox
                v-model="checkbox"
                :error-messages="checkboxErrors"
                label="Remember me?"
                required
                @change="$v.checkbox.$touch()"
                @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn class="mr-4" @click="submit">Log in</v-btn>
            </form>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>