<template>
    <p>reversed value : {{method}}</p>
</template>

<script>
    export default {
        name : "ComputedValue",
        props:  {
            method: {
                type: Function,
            }
        }
    }
</script>