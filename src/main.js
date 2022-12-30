import Vue from 'vue';
import App from './App.vue'
import router from './plugins/router/router';
// Bootstrap Configuration
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
import store from "./store/store";

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


export {store};

