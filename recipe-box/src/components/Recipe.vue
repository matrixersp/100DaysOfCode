<template>
  <div class="recipe" v-if="recipe">

    <h2 class="title">{{recipe.name}}</h2> 
    <div class="recipe-body">
      <h4>Ingredients:</h4> 
      <ul>
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ingredient}}</li>
      </ul>
      <h4>Directions:</h4> 
      <ol>
        <li v-for="(direction, index) in recipe.directions" :key="index">{{direction}}</li>
      </ol>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    recipe: { type: Object }
  },
}
</script>

<style scoped>

.recipe {
  background-color: white;
  margin-top: 1em;
}

.recipe-body {
  text-align: left;
}

</style>