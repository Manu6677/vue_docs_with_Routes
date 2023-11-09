import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Profile from "../views/Profile.vue";
import Error from "../views/Error.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/error",
    name: "error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let data = JSON.parse(localStorage.getItem("userData"));
  console.log(data.userData);

  console.log(to.path);
  if (data.userData.length == 0 && to.path === "/profile") {
    next("/");
  } else if (
    data.userData.length != 0 &&
    data.userData[0].email === "eve.holt@reqres.in" &&
    to.path === "/"
  ) {
    next("/profile");
  } else if (
    data.userData.length != 0 &&
    data.userData[0].email != "eve.holt@reqres.in" &&
    to.path === "/profile"
  ) {
    
    next("/");
  } else {
    next();
  }
});

export default router;
