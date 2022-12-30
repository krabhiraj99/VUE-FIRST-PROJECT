<template>
  <div>
    <NavBar />
    <UserForm :currUserId="selectedUserId" />
    <UserData @getUserId="currUserId" />
    <router-view></router-view>

  </div>
</template>

<script>
    import NavBar from "./NavBar.vue";
    import UserData from "./UserData.vue";
    import UserForm from "./UserForm.vue";
    export default {
    name: "HomePage",
    
    data(){
        return{
            selectedUserId: undefined,
        }
    },
    components: {
        NavBar,
        UserData,
        UserForm
    },
    methods: {
        currUserId(id){
            this.selectedUserId = id;
        }
    }
    };
    
</script>
