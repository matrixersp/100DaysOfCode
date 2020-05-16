<template>
  <div id="app">
    <div class="header">
      <h1>Recipe Box</h1>
      <AddIcon class="icon icon-primary" @click="addRecipe"/>
    </div>
    <div class="content">
      <RecipesMenu v-bind:recipes="recipes" v-model="recipes" />
      <Recipe :recipe="recipe" />
    </div>
    <RecipeModal :modalTitle="modalTitle" :recipe="editedRecipe" :recipes="recipes" />
  </div>
</template>

<script>
import RecipesMenu from './components/RecipesMenu.vue'
import Recipe from './components/Recipe.vue'
import recipes from './components/recipes.js'
import RecipeModal from './components/RecipeModal.vue'
import AddIcon from 'vue-material-design-icons/Plus.vue';
import { EventBus } from './main'

export default {
  name: 'App',
  data() {
    return {
      recipes,
      recipe: {},
      editedRecipe: {},
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
  created() {
    // localStorage.removeItem('recipes');
    if(localStorage.getItem('recipes')) {
      this.recipes = JSON.parse(localStorage.getItem('recipes'));
    }

    EventBus.$on('select-recipe', (id) => {
      this.recipe = this.recipes.find(recipe => recipe.id === id);
    });

    EventBus.$on('edit-recipe', (recipe) => {
      this.editedRecipe.id = recipe.id;
      this.editedRecipe.name = recipe.name;
      this.editedRecipe.ingredients = recipe.ingredients.join(' \\ ');
      this.editedRecipe.directions = recipe.directions.join(' \\ ');
      this.modalTitle = 'Edit Recipe';
    });

    EventBus.$on('delete-recipe', (recipes) => {
      this.recipes = recipes;
    });

    EventBus.$on('add-recipe', (recipes) => {
      this.recipes = recipes;
    });

    EventBus.$on('close-modal', () => {
      this.modalTitle = '';
    })
  },
  methods: {
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
