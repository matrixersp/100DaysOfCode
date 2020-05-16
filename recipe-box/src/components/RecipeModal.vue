<template>
  <div class="recipe-modal" v-if="modalTitle">
    <CloseIcon class="icon" @click="closeModal"/>
    <h3 class="title">{{modalTitle}}</h3>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="name">Name:</label>
        <input name="name" v-model="recipe.name" required/>
      </div>
      <div class="input-group">
        <label for="ingredients">Ingredients:</label>
        <textarea name="ingredients" v-model="recipe.ingredients" cols="40" rows="8" required></textarea>
      </div>
      <div class="input-group">
        <label for="directions">Directions:</label>
        <textarea name="directions" v-model="recipe.directions" cols="40" rows="8" required></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { EventBus } from '../main';
import CloseIcon from 'vue-material-design-icons/Close.vue';

export default {
  props: {
    modalTitle: String,
    recipes: Array,
    recipe: Object
  },
  components: { CloseIcon },
  methods: {
    submitForm() {
      const regex = /\s*\\\s*/;
      const ingredients = this.recipe.ingredients.split(regex);
      const directions = this.recipe.directions.split(regex);

      if(this.modalTitle === 'Edit Recipe') this.editRecipe(ingredients, directions);
      else if(this.modalTitle === 'Add a Recipe') this.addRecipe(ingredients, directions);

      this.closeModal();
    },
    addRecipe(ingredients, directions) {
      const recipe = {id: this.recipes.length + 1, name: this.recipe.name, ingredients, directions};
      this.recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
      EventBus.$emit('add-recipe', this.recipes);
    },
    editRecipe(ingredients, directions) {
      const index = this.recipes.findIndex(recipe => recipe.id === this.recipe.id)
      this.recipes[index].name = this.recipe.name;
      this.recipes[index].ingredients = ingredients;
      this.recipes[index].directions = directions;
      console.log(this.recipes)
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
    },
    closeModal() {
      this.recipe.name = '';
      this.recipe.ingredients = '';
      this.recipe.directions = '';
      EventBus.$emit('close-modal');
    }
  }
}
</script>

<style scoped>
.recipe-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1em 1em 1.5em;
  box-shadow: 0 .125em .5em #999;
  min-width: 20em;
}

h3.title {
  margin-bottom: 1em;
}

.icon {
  float: right;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
}

.input-group > label {
  margin-bottom: 0.5em;
  font-weight: bold;
}

.input-group > input, .input-group > textarea {
  border: 1px solid #e1e1e1;
  padding: .5em;
  font-size: 1.2rem;
  width: 100%;
}

.input-group > textarea {
  resize: none;
}

button {
  cursor: pointer;
  background-color: dodgerblue;
  border: none;
  padding: .6em 1.5em;
  color: white;
  border-radius: .25em;
  font-size: 1em;
  font-weight: bold;
}
</style>