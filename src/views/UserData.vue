<template>
  <div class="overflow-auto px-4">
    <div class="d-flex align-items-center justify-content-between">
      <b-button @click.prevent="addNewUser" variant="success"
        >Add New User</b-button
      >

      <!-- search bar for searching fields in our user table -->
      <b-form-input
        class="w-25 my-4"
        v-model="filterText"
        type="search"
        placeholder="Search"
      ></b-form-input>

      <!-- Add user Button To Add Users to our database -->
    </div>

    <!-- For showing user table  -->
    <b-table
      striped
      hover
      id="my-table"
      :fields="fields"
      :items="allUserDatas"
      :filter="filterText"
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="getData"
      small
    >
      <!-- Edit Button For Editing the current user -->
      <template #cell(actions)="row">
        <div class="curter p-2 ml-4" @click="EditCurrUser(row)">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </div>
      </template>

      <!-- created button for toggling the posts for specific users -->
      <template #cell(posts)="row">
        <div class="curter p-2" @click="getPostData(row)">
          <b-icon
            :icon="!row.item._showDetails ? 'arrow-down' : 'arrow-up'"
            aria-hidden="true"
          ></b-icon>
        </div>

        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      </template>

      <template #row-details="row">
        <b-card>
          <div
            v-if="showPostTableSpinner"
            class="d-flex justify-content-center align-items-center my-1"
          >
            <b-spinner
              style="width: 2rem; height: 2rem"
              variant="primary"
              label="Spinning"
            ></b-spinner>
          </div>
          <b-table
            v-if="!showPostTableSpinner"
            striped
            hover
            :sticky-header="true"
            :no-border-collapse="false"
            :fields="postFields"
            :items="currUserPostsData"
            :current-page="currentPage"
            @click="noUseFun(row)"
          ></b-table>
        </b-card>
      </template>
    </b-table>
    <div class="d-flex">
      <b-pagination
        size="sm"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></b-pagination>
      <div class="ml-3">
        <v-select
          v-model="perPage"
          :reduce="(option) => option.id"
          :options="[
            { label: '1', id: 1 },
            { label: '2', id: 2 },
            { label: '4', id: 4 },
            { label: '8', id: 8 },
            { label: '10', id: 10 },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);

export default {
  name: "UserData",
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      postCurrPage: 1,
      allUserDatas: undefined,
      currUserPostsData: undefined,
      currPostsData: undefined,
      currUserId: undefined,
      filterText: "",
      fields: ["posts", "id", "username", "email", "phone", "actions"],
      postFields: ["id", "title", "body"],
      // show: false,
      prevData: undefined,
      showPostTableSpinner: false,
    };
  },
  computed: {
    rows() {
      console.log("in row", this.allUserDatas?.length);
      return this.allUserDatas?.length;
    },
    postRows() {
      console.log("Shishussss", this.currPostsData.length);
      return this.currPostsData?.length;
    },
  },
  methods: {
    getData(item) {
      this.currUserId = item.id;

      this.$emit("getUserId", item.id);
    },

    getPostData(row) {
      this.$router.push({ path: `/user/${row.item.id}/posts` });
      this.showPostTableSpinner = true;
      console.log("rowdata", row);
      if (this.prevData && this.prevData.item.id != row.item.id) {
        this.hidePrevDetails(this.prevData.item.id);
      }

      console.log(this.allUserDatas);
      row.toggleDetails();
      // console.log("currrowitem",row.toggleDetails(),row.item);

      this.prevData = row;
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${row.item.id}`)
        .then((res) => {
          this.currUserPostsData = res.data;
          this.showPostTableSpinner = false;
        });
    },
    hidePrevDetails(id) {
      const prevItem = this.allUserDatas.filter((currUser) => {
        return currUser.id === id;
      });
      prevItem[0]._showDetails = false;
    },
    EditCurrUser(row) {
      this.$router.push({ path: `/user/${row.item.id}` });
    },
    addNewUser() {
      this.$router.push({ path: "/user" });
    },
  },
  mounted() {
    // To fetch User data
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      this.allUserDatas = res.data;
    });
  },

  noUseFun(row) {
    console.log(row);
  },
};
</script>

<style>
.curter {
  cursor: pointer;
}
</style>
