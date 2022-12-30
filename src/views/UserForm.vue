<template>
  <!-- Form To create a post for users  -->

  <div class="p-4">
    <b-form inline>
      <!-- User ID  -->
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          class="m-2"
          :value="currUserId"
          :disabled="true"
          id="inline-form-input-username"
          placeholder="USER ID"
        ></b-form-input>
      </b-input-group>

      <!-- Title of the post -->
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          class="m-2"
          id="inline-form-input-username"
          placeholder="Post Title "
          v-model="postTitle"
        ></b-form-input>
      </b-input-group>

      <!-- Body of the post -->
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          class="m-2"
          id="inline-form-input-username"
          placeholder="Post Body"
          v-model="postBody"
        ></b-form-input>
      </b-input-group>

      <b-button class="m-2" @click.prevent="postData" variant="primary"
        >Post</b-button
      >
      <b-button class="m-2" @click.prevent="clearFields" variant="danger"
        >Clear</b-button
      >
    </b-form>
    <div v-if="showSpinner" class="d-flex justify-content-center align-items-center my-1">
      <b-spinner
        style="width: 3rem; height: 3rem"
        variant="primary"
        label="Spinning"
      ></b-spinner>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserForm",
  props: {
    // getting user id of row on which user has clicked
    currUserId: Number,
  },

  data() {
    return {
      postTitle: "",
      postBody: "",
      showSpinner: false,
    };
  },

  methods: {
    // Clears all the data from input fields(title and body)
    clearFields() {
      this.postBody = "";
      this.postTitle = "";
    },
    postData() {
      this.showSpinner = true;
      // For sending the user post data to the api.
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          userId: this.currUserId,
          title: this.postTitle,
          body: this.postBody,
        })
        .then((res) => {
          this.showSpinner = false;

          console.log(res);
        })
        .catch((error) => {
          this.showSpinner = false;

          console.log(error);
        });
      //clears input fields after posting
      this.clearFields();
    },
  },
};
</script>
