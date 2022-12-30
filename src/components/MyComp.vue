<template>
    <h1>This Component name is {{name}}</h1>
</template>


<script>

export default {
    name: "MyComp",
    props: {
        name: String,
    }
}

</script>