<script lang="ts">
import AuthClient from "../../services/auth/auth.client";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      c_password: "",
      errorMsg: "",
    };
  },

  watch: {
    name() {
      this.errorMsg = "";
    },
    email() {
      this.errorMsg = "";
    },
    password() {
      this.errorMsg = "";
    },
    c_password() {
      this.errorMsg = "";
    },
  },
  methods: {
    async onSubmit(event: Event) {
      event.preventDefault();
      try {
        await AuthClient.register({
          email: this.email,
          password: this.password,
          name: this.name,
          c_password: this.c_password,
        });
        this.$router.push({ name: "home" });
      } catch (e) {
        this.errorMsg = e.response.data.message;
      }
    },
  },
};
</script>

<template>
  <form @submit="onSubmit">
    <label>
      <div>Name:</div>
      <input type="text" v-model="name" required
    /></label>
    <label>
      <div>Email:</div>
      <input type="email" v-model="email" required
    /></label>
    <label>
      <div>Password:</div>
      <input type="password" v-model="password" required
    /></label>
    <label>
      <div>Confirm Password:</div>
      <input type="password" v-model="c_password" required
    /></label>
    <p>{{ errorMsg }}</p>
    <input type="submit" value="Register" />
  </form>
</template>
