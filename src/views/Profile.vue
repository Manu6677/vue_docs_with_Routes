<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  name: "Profile",
  data() {
    return {};
  },
  methods: {

    ...mapMutations(["delUserFromList"]),

    logoutUserAndRedirectToHome(){
        this.$store.commit("delUserFromList", {data: this.userData[0]})
        this.$router.push({name: "home"})
    }
  },

  computed: {
    ...mapState(["userData"]),
  },
};
</script>

<template>
  <div class="logout-Btn">
    <button @click="logoutUserAndRedirectToHome">LogOut</button>
  </div>
  <div class="profile">
    <h1>This is Profile Page of User</h1>
    <ul v-for="user in userData" :key="user.id" class="listOfUser">
      <div class="userName">
        <p>Name:</p>
        <li>{{ user.firstName }}</li>
      </div>

      <div class="userPassword">
        <p>Password:</p>
        <li>{{ user.password }}</li>
      </div>
    </ul>
  </div>
</template>

<style scoped>
.logout-Btn {
  margin-left: 1000px;
}

.userName {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}

.userPassword {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}

.profile {
  margin-top: 90px;
  align-content: center;
  justify-items: center;
  justify-content: center;
}
.listOfUser {
  width: 200px;
  margin-left: 600px;
}

button {
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  width: 70px;
  color: gray;
  background: #d0d0d0;
  border: none;
  font-weight: bold;
}
</style>
