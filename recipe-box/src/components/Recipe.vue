<template>
  <div class="recipe">

    <h2 class="title">{{recipe.name}}</h2> 
    {{recipe}}

  </div>
</template>

<script>
export default {
  props: ['recipe'],
}
</script>

<style scoped>

</style>