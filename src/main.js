import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import VueAxios from "vue-axios";
import axios from "axios";
import './plugins/codemirror';
// import VeeValidate from 'vee-validate'
// import 'bulma'
// import './views/student/devtools/trello/core/ui'

import Nprogress from "../node_modules/nprogress/nprogress.css"

Vue.config.productionTip = false

// Vue.use(VeeValidate);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  VueAxios,
  axios,
  render: h => h(App)
}).$mount('#app')
