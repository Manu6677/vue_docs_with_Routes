import { createApp } from "vue";
import App from "./App.vue";
import { createStore } from "vuex";
import router from "./router";
import VuexPersistence from "vuex-persist";
import axios from "axios";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faXmark);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "userData",
  reducer: (state) => ({ userData: state.userData }),
});

const store = createStore({
  state() {
    return {
      userData: [],
      token: "",
      email: "",
      password: "",
    };
  },

  mutations: {
    addUserToList(state, payload) {
      console.log(payload.data.token);
      console.log(payload);

      console.log(payload.config.data);

      let token = payload.data.token;
      if (token) {
        console.log("inside if true");

        let parsing = JSON.parse(payload.config.data);
        console.log(parsing.email, parsing.password);

        state.userData.push({
          id: 1,
          email: parsing.email,
          password: parsing.password,
        });
      } else {
        console.log("not valid login details");
      }
    },

    delUserFromList(state, payload) {
      console.log(payload, "delete");
      console.log(payload.data, "delete");
      console.log(payload.data.id, "delete");
      let index = state.userData.findIndex(
        (user) => user.id === payload.data.id
      );
      console.log(index);
      state.userData.splice(index, 1);
    },

    loginHandler(state, payload) {},
  },
  actions: {
    async login({ commit, state }, payload) {
      console.log(payload);
      state.email = payload.email;
      state.password = payload.password;

      try {
        const response = await axios.post(
          "https://reqres.in/api/login",
          payload
        );
        commit("addUserToList", response);
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  plugins: [vuexLocal.plugin],
});

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount("#app");
// createApp(App).use(router).mount('#app')
