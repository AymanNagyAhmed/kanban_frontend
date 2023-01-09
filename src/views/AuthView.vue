<script lang="ts">
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";
export default {
  data(): {
    activeTab: "register" | "login";
    tabMessage:
      | "Don't have an Account? Sign-up"
      | "Already have an Account? Login";
  } {
    return {
      activeTab: "login",
      tabMessage: "Don't have an Account? Sign-up",
    };
  },
  methods: {
    toggleTab() {
      this.activeTab = this.activeTab === "login" ? "register" : "login";
    },
  },
  watch: {
    activeTab() {
      if (this.activeTab === "login") {
        this.tabMessage = "Don't have an Account? Sign-up";
      } else {
        this.tabMessage = "Already have an Account? Login";
      }
    },
  },
  components: {
    LoginForm,
    RegisterForm,
  },
};
</script>
<template>
  <main>
    <button @click="toggleTab">{{ tabMessage }}</button>
    <LoginForm v-if="activeTab === 'login'"></LoginForm>
    <RegisterForm v-if="activeTab === 'register'"></RegisterForm>
  </main>
</template>

<style></style>
