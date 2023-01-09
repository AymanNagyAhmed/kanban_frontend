import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import VueJSModal from "vue-js-modal";

import "./assets/main.css";

Vue.use(VueJSModal, { componentName: "Modal" });
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
