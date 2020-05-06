<template>
  <div class="container bg-gray-200 text-center text-gray-800 p-10">
    <main>
      <h1 class="text-4xl font-light text-center">Image Search</h1>
      <search-form></search-form>
      <div class="flex mt-6">
        <search-result class="flex-1"></search-result>
        <latest-searches class="flex-initial"></latest-searches>
      </div>
    </main>
  </div>
</template>

<script>

import SearchForm from './components/SearchForm.vue';
import LatestSearches from './components/LatestSearches.vue';
import SearchResult from './components/SearchResult.vue';

export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  components: {SearchForm, SearchResult, LatestSearches},
  created() {
    const baseUrl = 'http://localhost:5000/api'

    const url = `${baseUrl}/latest/imagesearch`;
    fetch(url).then(res => res.json())
      .then(res => addLatestSearches(res))
      .catch(err => console.log(err));

    function addLatestSearches(res) {
      const searches = document.getElementById('searches');
      let terms = '';

      for(const el of res) {
        terms += `<li>- ${el.term}</li>`
      }
      searches.innerHTML = terms;
    }
  }
}
</script>


<style>
.container {
  margin: 0 auto;
}
</style>
