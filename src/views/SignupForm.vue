<template>
  <div class="row">
    <h4 class="col-12 text-center py-2 text-success">
      Please Login to Continue
    </h4>
    <form class="border p-4 m-4 col-lg-6 col-md-8 col-sm-10 m-auto">
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          v-model="formData.email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter Username"
        />
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>

      <button
        v-on:click.prevent="handleLogin"
        type="submit"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },

      show: false,
    };
  },
  mounted(){
    console.log("inside signup",this.$store.state.authenticated, typeof(this.$store.state.authenticated));
  },
  methods: {
    handleLogin() {
      if (
        this.formData.email === "admin" &&
        this.formData.password === "password"
      ) {
        this.$store.commit("setAuthentication", true);
        this.$router.replace("/home");
      } else {
        console.log("You are not an authorised user");
      }
    },
  },
};
</script>
