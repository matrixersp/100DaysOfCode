<template>
  <div class="recipe" v-if="recipe">

    <h2 class="name">{{recipe.name}}</h2> 
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
  margin: 1em 0;
  padding: 0 1em 1em;
  border-radius: .5em;
  box-shadow: 0 .125em .5em #999;
  width: 100%;
  min-width: 20em;
}

h2 {
  font-weight: 400;
}

.recipe-body {
  text-align: left;
}

@media (min-width: 46em) {
  .recipe {
    margin: 0 0 1em 1em;
  }
}

</style>