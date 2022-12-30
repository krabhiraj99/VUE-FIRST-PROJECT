<template>
  <div>
    <NavBar />
    <div
      v-if="showSpinner"
      class="d-flex justify-content-center align-items-center my-5"
    >
      <b-spinner
        style="width: 4rem; height: 4rem"
        variant="primary"
      ></b-spinner>
    </div>

    <div v-if="!showSpinner" class="p-2">
      <h3 class="text-center text-success mb-4 mt-2">
        Posts By User {{ userId }}
      </h3>
      <b-table striped hover :items="posts" :fields="fields" small> </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
export default {
  name: "UserPostPage",
  components: {
    NavBar,
  },
  data() {
    return {
      userId: this.$route.params.id,
      posts: undefined,
      showSpinner: false,
      fields: ["id", "title", "body"],
    };
  },
  mounted() {
    this.showSpinner = true;
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`)
      .then((res) => {
        this.posts = res.data;
        this.showSpinner = false;
      });
  },
};
</script>
