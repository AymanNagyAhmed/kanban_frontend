<script lang="ts">
import AuthClient from "../../services/auth/auth.client";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
    };
  },

  watch: {
    email() {
      this.errorMsg = "";
    },
    password() {
      this.errorMsg = "";
    },
  },
  methods: {
    async onSubmit(event: Event) {
      event.preventDefault();
      try {
        await AuthClient.login({ email: this.email, password: this.password });
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
      <div>Email:</div>
      <input type="email" v-model="email" required
    /></label>
    <label>
      <div>Password:</div>
      <input type="password" v-model="password" required
    /></label>
    <p>{{ errorMsg }}</p>
    <input type="submit" value="Login" />
  </form>
</template>
