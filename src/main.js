import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toastr from 'vue-toastr'
import { BootstrapVue ,BootstrapVueIcons  } from 'bootstrap-vue'
export const eventBus = new Vue();
Vue.use( BootstrapVue);
Vue.use( BootstrapVueIcons);
export const EventBus = new Vue();
/* == DEFAULT GLOBAL OPTIONS == */
Vue.use(Toastr, {
  defaultPosition: "toast-top-right",
  defaultTimeout: 5000,
  defaultCloseOnHover: true,
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
