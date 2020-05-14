<template>
  <form class="recipe-modal" v-if="modalTitle" @submit="submitForm">
    <h3 class="title">{{modalTitle}}</h3>
    <div class="input-group">
      <label for="ingredients">Ingredients:</label>
      <textarea name="ingredients" v-model="ingredients" cols="40" rows="8"></textarea>
    </div>
    <div class="input-group">
      <label for="directions">Directions:</label>
      <textarea name="directions" v-model="directions" cols="40" rows="8"></textarea>
    </div>
    <button type="submit">Save</button>
  </form>
</template>

<script>
export default {
  props: ['modalTitle'],
  data: function() {
    return {
      ingredients: '',
      directions: ''
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      console.log(this.ingredients.match(/\\/))
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
  padding: 1em;
}

h3.title {
  margin-bottom: 1em;
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
</style>