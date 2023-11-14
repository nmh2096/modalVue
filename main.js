import Vue from 'vue'
import App from './App.vue'
import router from '@/router/routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { setInteractionMode } from "vee-validate";
import Toast from "vue-toastification";
import store from '@/store'

setInteractionMode("passive"); // default nhập đến đâu hiện đến đấy

Vue.config.productionTip = false

const options = {}

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "vue-toastification/dist/index.css";
import "@/assets/scss/global.scss"

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Toast, options);

router.beforeEach((to, __, next) => {
  const localToken = localStorage.getItem('token');
  if (localToken) {
    store.dispatch("verifyAuth", localToken);

    if(to.name.includes("login") || to.name.includes("register")) {
      next({name: 'note-list'})
    } else {
      next();
    }
  } else {
    if(to.meta.auth) {
      next({name: "login"});
    } else {
      next();
    }
  }
  next() // khi có next thì sẽ cho vào route
  // middleware
});

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export default app
