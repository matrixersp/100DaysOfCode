<template>
  <div id="app">
    <h1>Recipe Box</h1>
    <RecipesMenu v-bind:recipes="recipes" @recipeId="id = $event"/>
    <Recipe v-bind:recipe="getRecipe(id)" />
    <RecipeModal modalTitle="Add a Recipe"/>
  </div>
</template>

<script>
import RecipesMenu from './components/RecipesMenu.vue'
import Recipe from './components/Recipe.vue'
import recipes from './components/recipes.js'
import RecipeModal from './components/RecipeModal.vue'

export default {
  name: 'App',
  data() {
    return {
      recipes,
      id: '',
      recipe: {},
    };
  },
  components: {
    RecipesMenu,
    Recipe,
    RecipeModal
  },
  methods: {
    getRecipe(id) {
      return this.recipes.find(recipe => recipe.id === id);
    }
  }
}
</script>

<style>
*,
::before,
::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background-color: blanchedalmond;
}
 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
