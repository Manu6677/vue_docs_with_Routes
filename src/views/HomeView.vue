<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: {},
  name: "HomeView",
  data() {
    return {
      isActive: false,
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapMutations(["addUserToList"]),

    async addDetails() {
      if (!this.email || !this.password) {
        return alert("Fill All details");
      } else {
        // this.$store.commit("addUserToList", {
        //   name: this.name,
        //   password: this.password,
        // });

        try {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
          this.email = "";
          this.password = "";
          this.isActive = false;  
          this.$router.push({ name: "profile" });
        } catch (err) {       
          this.$router.push({ name: "error" });

        }
      }
    },
    closeModal() {
      this.isActive = false;
    },
    EnterDetailsOnLogin() {
      this.isActive = true;
    },
  },
};
</script>

<template>
  <div class="home">
    <div class="btn">
      <button class="btn-login" @click="EnterDetailsOnLogin">Login</button>
    </div>
    <div class="title">
      <h1>This is Home</h1>
    </div>

    <div class="formOfUser" :class="isActive ? 'activate' : 'deactivate'">
      <div class="crossIcon">
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          class="closeBtn"
          @click="closeModal"
        />
      </div>

      <form v-on:submit.prevent="submitForm">
        <div class="fieldName">
          <label for="email">Email: </label>
          <input
            type="email"
            id="email"
            placeholder="type here"
            v-model="email"
          />
        </div>

        <div class="fieldPassword">
          <label for="password">Password: </label>
          <input
            type="text"
            id="password"
            placeholder="password"
            v-model="password"
          />
        </div>

        <button type="submit" class="submitBtn" @click="addDetails">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.activate {
  display: block;
  top: 0;
  left: -100px;
  position: absolute;
  z-index: 10;
  height: 520px;
  width: 500px;
  border-radius: 10px;
  background-color: gray;
  margin-left: 370px;
  margin-top: 20px;
}

.deactivate {
  display: none;
}

.crossIcon {
  background: grey;
  width: 25px;
  margin-left: 370px;
  margin-top: 3px;
  border-radius: 10px;
  cursor: pointer;
}

.closeBtn {
  font-size: 30px;
  cursor: pointer;
}

.submitBtn {
  border-radius: 10px;
  cursor: pointer;
  height: 30px;
  width: 70px;
  color: #686868;
  font-weight: bold;
  background: #d0d0d0;
  margin-top: 40px;
  border: none;
}

.fieldName {
  margin-top: 50px;
}

.fieldPassword {
  margin-top: 20px;
}

.formOfUser {
  border: 2px solid black;
  align-items: center;
  background: #909090;
  border-radius: 30px;
  width: 400px;
  height: 250px;
  margin-left: 650px;
  margin-top: 300px;
}

.home {
  align-items: center;
  align-content: center;
  justify-content: center;
  font-weight: bold;
  font-weight: 70px;
  height: 100vh;
  position: relative;
  z-index: 0;
}
.btn-login {
  border-radius: 10px;
  cursor: pointer;
  height: 30px;
  width: 70px;
  color: gray;
  background: #d0d0d0;
  border: none;
  font-weight: bold;
}
.title {
  margin-top: 200px;
}

.btn {
  margin-left: 800px;
}
</style>
