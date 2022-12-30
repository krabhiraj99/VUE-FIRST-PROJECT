<template>
  <div class="hello" v-bind:class="{active: isActive}">
    {{msg}}
    <MyComp name="MyComp" />
    <input v-model="name" type="text" placeholder="enter your name" />
  <p>{{name}}</p>

  </div>
</template>

<script>

import MyComp from "./MyComp.vue";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    MyComp,
  },
  data(){
    return{
      name: "",
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

