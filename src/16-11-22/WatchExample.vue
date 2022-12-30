<template>
  <div>
    <p>{{ val }}</p>
    <p>Watch Page</p>
    <button v-on:click="val = val - 1">-</button>
    <button v-on:click="val = val + 1">+</button>
  </div>
</template>

<script>
export default {
  name: "WatchExample",
  data() {
    return { val: 0 };
  },
  watch: {
    val(val){
        if(val > 6 || val < -4){
            this.val = 0;
        }


    }
  }
};
</script>
