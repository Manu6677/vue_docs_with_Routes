import { createApp } from "vue";
import App from "./App.vue";
import { createStore } from "vuex";
import router from "./router";
import VuexPersistence from "vuex-persist";

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
    };
  },

  mutations: {
    addUserToList(state, payload) {
      if (state.userData.length < 2) {
        console.log(payload);
        console.log(payload.name);
        console.log(payload.password);
        let nextId = state.userData.length;
        state.userData.push({
          id: nextId + 1,
          firstName: payload.name,
          password: payload.password,
        });
      }
    },

    delUserFromList(state, payload) {
      console.log(payload, "delete")
      console.log(payload.data, "delete");
      console.log(payload.data.id, "delete");
      let index = state.userData.findIndex((user) => user.id === payload.data.id);
      console.log(index)
      state.userData.splice(index, 1)
    },
  },
  plugins: [vuexLocal.plugin],
});

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount("#app");
// createApp(App).use(router).mount('#app')
