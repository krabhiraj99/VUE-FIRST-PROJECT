import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authenticated: window.localStorage.getItem("authenticated")==="true" || false,
  },
  mutations: {
    setAuthentication(state, status) {
      window.localStorage.setItem("authenticated", status);
      state.authenticated = status;
    },
  },
});



export default store;
