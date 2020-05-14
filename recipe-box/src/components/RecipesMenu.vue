<template>
  <ul class="menu">
    <li v-for="recipe in recipes" :key="recipe.id"><a href="#artichoke-pasta" @click="getId(recipe.id)">{{recipe.name}}</a></li>
  </ul>
</template>

<script>
export default {
  props: ['recipes'],
  methods: {
    getId(id) {
      this.$emit('recipeId', id);
    }
  }
}
</script>

<style scoped>
.menu {
  list-style: none;
  text-align: left;
  background-color: white;
}

.menu > li {
  padding: 0.5em 1em;
}

.menu > li + li {
  border-top: 1px solid #e5e5e5;
}

</style>