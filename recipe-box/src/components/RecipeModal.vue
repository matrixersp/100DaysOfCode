<template>
  <div class="recipe-modal" v-if="modalTitle">
    <CloseIcon class="icon" @click="closeModal"/>
    <h3 class="title">{{modalTitle}}</h3>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="name">Name:</label>
        <input name="name" v-model="recipe.name" />
      </div>
      <div class="input-group">
        <label for="ingredients">Ingredients:</label>
        <textarea name="ingredients" v-model="recipe.ingredients" cols="40" rows="8"></textarea>
      </div>
      <div class="input-group">
        <label for="directions">Directions:</label>
        <textarea name="directions" v-model="recipe.directions" cols="40" rows="8"></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
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
      const ingredients = this.ingredients.split(regex);
      const directions = this.directions.split(regex);
      const recipes = JSON.parse(localStorage.getItem('recipes'));
      const recipe = {id: recipes.length + 1, name: this.name, ingredients, directions};
      recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      this.$emit('add-recipe', recipes);
    },
    closeModal() {
      this.modalTitle = '';
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