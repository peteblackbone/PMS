<template>
  <div>
    <div v-if="!isTeacher & !isStudent">
      <v-row>
        <v-col cols="6" class="d-flex justify-center">
          <v-card color="red" width="400" min-height="480">
            <v-btn @click="isTeacher = !isTeacher"
              >เข้าสู่ระบบสำหรับอาจารย์</v-btn
            >
          </v-card>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-card color="blue" width="400"
            ><v-btn @click="isStudent = !isStudent"
              >เข้าสู่ระบบสำหรับนักศึกษา</v-btn
            ></v-card
          >
        </v-col>
      </v-row>
    </div>
    <transition name="slide-fade">
      <login-form v-if="isStudent"></login-form>
      <login-form v-if="isTeacher"></login-form>
    </transition>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      isStudent: false,
      isTeacher: false
    };
  }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
