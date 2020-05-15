<template>
  <ul class="menu">
    <li v-for="recipe in recipes" :key="recipe.id"><a href="#artichoke-pasta" @click="getId(recipe.id)">{{recipe.name}}</a><DeleteIcon class="icon icon-danger" @click="deleteRecipe(recipe.id)"/><EditIcon class="icon" @click="editRecipe(recipe.id)"/></li>
  </ul>
</template>

<script>
import EditIcon from 'vue-material-design-icons/Pencil.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
export default {
  props: ['recipes'],
  components: {
    EditIcon,
    DeleteIcon
  },
  methods: {
    getId(id) {
      this.$emit('recipeId', id);
    },
    editRecipe(id) {
      this.$emit('update-recipe', id);
    },
    deleteRecipe(id) {
      console.log(id);
      const newRecipes = this.recipes.filter(recipe => recipe.id !== id);
      localStorage.setItem('recipes', newRecipes);
      this.$emit('delete-recipe', newRecipes);
    }
  }
}
</script>

<style scoped>
.menu {
  list-style: none;
  text-align: left;
  background-color: white;
  padding-left: 0;
  margin: 0;
  border-radius: .5em;
  box-shadow: 0 .125em .5em #999;
  min-width: 20em;
}

.menu li {
  padding: 0.5em 1em;
  display: block;
  border-radius: .5em;
  font-weight: bold;
}

.menu a {
  text-decoration: none;
  color: #316492;
}

.menu li + li {
  border-top: 1px solid #e5e5e5;
}

.icon {
  float: right;
  margin-left: .5em;
  color: #3baca3;
  display: none;
}

.icon-danger {
  color: #f92767;
}

li:hover > .icon {
  display: initial;
}

button {
  float: right;
  border: none;
  background-color: transparent;
  padding: .1em;
  margin: 0;
  cursor: pointer;
  outline: none;
  font-weight: bold;
  display: none;
  font-size: 1.2em;
  color: #2c3e50;
}

a:hover > button {
  display: initial;
}

</style>