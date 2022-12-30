<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
      <div class="d-flex">
        <div class="curter navbar-brand" @click="redirectToHome">Vince</div>
        <div class="curter nav-link text-white" @click="redirectToHome">
          Home
        </div>
      </div>
      <b-button @click.prevent="logOutUser">Log Out</b-button>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  methods: {
    redirectToHome() {
      this.$router.push({ path: "/home" });
    },
    logOutUser(){
      this.$store.commit("setAuthentication", false);
      this.$router.replace("/login");
    }
  },
};
</script>
