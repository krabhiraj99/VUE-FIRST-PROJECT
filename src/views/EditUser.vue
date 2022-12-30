<template>
  <div>
    <router-view></router-view>

    <div
      v-if="showSpinner"
      class="d-flex justify-content-center align-items-center my-5"
    >
      <b-spinner
        style="width: 5rem; height: 5rem"
        variant="primary"
        label="Spinning"
      ></b-spinner>
    </div>

    <div v-if="!showSpinner" class=" p-4 ">
      <div class="d-flex justify-content-center">
        <h4 class="text-center">
          {{ editUserForm ? `Update User Data` : "Add New User" }}
        </h4>
        <p v-if="editUserForm" class="text-center mx-2 mt-1">
          (User Id: {{ userId }})
        </p>
      </div>
      <b-form-row>
        <!-- UserName -->
        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="UserName"
            label-for="username"
          >
            <b-form-input
              id="username"
              placeholder="UserName"
              v-model="userName"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <!-- Email Id of the User -->
        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="Name"
            label-for="name"
          >
            <b-form-input
              id="name"
              placeholder="Name"
              v-model="name"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              placeholder="Email"
              v-model="emailId"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <!-- Phone Number of the User -->
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="Website"
            label-for="website"
          >
            <b-form-input
              id="website"
              placeholder="Website"
              v-model="website"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <!-- <b-form inline> -->

        <div class="w-100"></div>
        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="Company's Name"
            label-for="companyname"
          >
            <b-form-input
              id="companyname"
              placeholder="Companyname"
              v-model="companyName"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="Company's Catchphrase"
            label-for="catchphrase"
          >
            <b-form-input
              placeholder="Catchphrase"
              id="catchphrase"
              v-model="companyCatchphrase"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <div class="w-100"></div>

        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="Address(Street)"
            label-for="street"
          >
            <b-form-input
              id="street"
              placeholder="Street"
              v-model="street"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="Suite"
            label-for="suite"
          >
            <b-form-input
              id="suite"
              placeholder="Suite"
              v-model="suite"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="City"
            label-for="city"
          >
            <b-form-input
              id="city"
              placeholder="City"
              v-model="city"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            class="m-2 mr-sm-3"
            id="fieldset-1"
            label="ZipCode"
            label-for="zipcode"
          >
            <b-form-input
              id="zipcode"
              placeholder="Zipcode"
              v-model="zipCode"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <div class="w-100"></div>

        <!-- </b-form> -->
        <b-button
          v-if="editUserForm"
          class="m-2"
          @click.prevent="updateData"
          variant="primary"
        >
          Update</b-button
        >
        <b-button
          v-if="!editUserForm"
          class="m-2"
          @click.prevent="addNewUser"
          variant="primary"
          >Add User
        </b-button>
        <b-button class="m-2" @click.prevent="clearData" variant="danger"
          >Clear
        </b-button>
      </b-form-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditUser",

  data() {
    return {
      userId: this.$route.params.id,
      userName: undefined,
      emailId: undefined,
      phone: undefined,
      name: undefined,
      website: undefined,
      companyName: undefined,
      companyCatchphrase: undefined,
      street: undefined,
      suite: undefined,
      city: undefined,
      zipCode: undefined,
      editUserForm: false,
      disable: false,
      showSpinner: false,
    };
  },

  mounted() {
    if (this.$route.params.id) {
      this.editUserForm = true;
      this.disable = true;
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${this.userId}`)
        .then((res) => {
          const currUserData = res.data;
          this.userName = currUserData.username;
          this.emailId = currUserData.email;
          this.phone = currUserData.phone;
          this.name = currUserData.name;
          this.website = currUserData.website;
          this.companyName = currUserData.company.name;
          this.companyCatchphrase = currUserData.company.catchPhrase;
          this.street = currUserData.address.street;
          this.suite = currUserData.address.suite;
          this.city = currUserData.address.city;
          this.zipCode = currUserData.address.zipcode;
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  },
  methods: {
    clearData() {
      this.userName = "";
      this.emailId = "";
      this.phone = "";
      this.name = "";
      this.website = "";
      this.company = "";
      this.address = "";
    },
    updateData() {
      this.showSpinner = true;
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${this.userId}`, {
          username: this.userName,
          email: this.emailId,
          phone: this.phone,
          name: this.name,
          website: this.website,
          company: this.company,
          address: this.address,
        })
        .then((res) => {
          console.log("Response after updating data", res);
          this.showSpinner = false;
          this.$router.push("/home");
        })
        .catch((err) => {
          this.showSpinner = false;
          console.log(err);
          this.$router.push("/home");

        });
    },
    addNewUser() {
      this.showSpinner = true;

      axios
        .post("https://jsonplaceholder.typicode.com/users", {
          username: this.userName,
          email: this.emailId,
          phone: this.phone,
        })
        .then((res) => {
          this.showSpinner = false;
          console.log("response after adding new User", res);
          this.$router.push({path: "/home"});
        })
        .catch((err) => {
          this.showSpinner = false;

          console.log("err in adding new user", err);
          this.$router.push("/home");
        });
    },
  },
};
</script>
