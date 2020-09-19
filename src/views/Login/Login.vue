<template>
  <div class="container">
    <v-card class="login">
      <v-avatar size="96" class="avatar">
        <v-icon size="80" color="white">mdi-account-outline</v-icon>
      </v-avatar>
      <v-card-title>Login</v-card-title>
      <div class="mx-8">
        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider
              v-slot="{ errors }"
              name="Username"
              rules="required"
            >
              <v-text-field
                v-model="username"
                label="ID"
                :error-messages="errors"
                prepend-inner-icon="mdi-account"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                v-model="password"
                label="Password"
                :error-messages="errors"
                prepend-inner-icon="mdi-lock"
              ></v-text-field>
            </ValidationProvider>
            <v-btn class="mt-2" @click="submit">Login</v-btn>
            <div>
              <v-checkbox label="remember me"></v-checkbox
              ><span style="padding:50%">Forgot Password?</span>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
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
  message: "{_field_} is require",
});
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        // Axios.defaults.headers['Content-Type'] = "application/x-www-form-urlencoded"
        // Axios.post(
        //   "http://localhost:3000/auth/login",
        //   JSON.stringify(
        //     {
        //       username: this.username,
        //       password: this.password,
        //     }),
        //     { headers: { "Content-Type": "application/json" } }
          
        // ).then((res) => {
        //   console.log(res.data);
        // });
        const {username,password} = this
        this.$store.dispatch("auth/login",{username:this.username,password:this.password})
      }
    },
  },
};
</script>

<style>
.container {
  height: 70vh;
  position: relative;
}
.login {
  background-color: rgba(255, 255, 255, 0.6) !important;
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.avatar {
  border-top-left-radius: 50% !important;
  border-top-right-radius: 50% !important;
  background-color: #1976d2bb;
  top: -48px;
}
</style>
