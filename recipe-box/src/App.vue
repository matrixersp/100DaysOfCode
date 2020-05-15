<template>
  <div id="app">
    <div class="header">
      <h1>Recipe Box</h1>
      <AddIcon class="icon icon-primary" @click="addRecipe"/>
    </div>
    <div class="content">
      <RecipesMenu v-bind:recipes="recipes" v-model="recipes" @recipeId="id = $event" @delete-recipe="recipes = $event" @update-recipe="updateRecipe" />
      <Recipe v-bind:recipe="getRecipe(id)" />
    </div>
    <RecipeModal :modalTitle="modalTitle" :recipe="recipe" @add-recipe="recipes = $event" />
  </div>
</template>

<script>
import RecipesMenu from './components/RecipesMenu.vue'
import Recipe from './components/Recipe.vue'
import recipes from './components/recipes.js'
import RecipeModal from './components/RecipeModal.vue'
import AddIcon from 'vue-material-design-icons/Plus.vue';

export default {
  name: 'App',
  data() {
    return {
      recipes: JSON.parse(localStorage.getItem('recipes')),
      recipe: {},
      id: '',
      modalTitle: ''
    };
  },
  components: {
    RecipesMenu,
    Recipe,
    RecipeModal,
    AddIcon
  },
  beforeCreate() {
    //localStorage.removeItem('recipes');
    console.log(localStorage.getItem('recipes'));
    if(!localStorage.getItem('recipes'))
      localStorage.setItem('recipes', JSON.stringify(recipes));
  },
  methods: {
    getRecipe(id) {
      return this.recipes.find(recipe => recipe.id === id);
    },
    updateRecipe(id) {
     this.recipe = this.recipes.find(recipe => recipe.id === id);
     this.recipe.ingredients = this.recipe.ingredients.join(' \\ ');
     this.recipe.directions = this.recipe.directions.join(' \\ ');
     this.modalTitle = 'Edit Recipe';
    },
    addRecipe() {
      this.modalTitle = 'Add a Recipe';
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
*,
::before,
::after {
  box-sizing: border-box;
}

body {
  background-color: #3baca3;
}
 
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.header {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.icon {
  cursor: pointer;
  margin-left: 1em;
}

.icon-primary {
  background-color: white;
  padding: .35em 1em .125em;
  border-radius: 0.5em;
  box-shadow: 0 .125em .5em #999;
  color: #316492;
}

.content {
  display: flex;
  flex-direction: column;
}

@media (min-width: 46em) {
  .content {
    flex-direction: row;
    align-items: flex-start;
  }

  .menu {
    min-width: 20em;
  }
}

h1 {
  font-weight: 400;
  margin-bottom: 0.5em;
  color: white;
}
</style>
