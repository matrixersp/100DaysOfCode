<template>
  <form action="" method="get" id="form" class="p-4 text-lg" @submit.prevent="submit">
    <span class="mt-3 mr-5">
      <label class="mr-3" for="term">Search:</label>
      <input class="rounded-full shadow-md px-4 py-2" type="search" name="term" id="term">
    </span>
    <span class="mt-3 mr-5">
      <label class="mr-3" for="limit">Offset:</label>
      <input class="rounded-full font-bold shadow-md px-4 py-2 w-24" type="number" name="limit" id="limit">
    </span>
    <button class="bg-red-500 text-white font-bold mt-4 mr-0 py-2 px-8 rounded-full shadow-lg" type="submit" >Search</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: 'This is a message'
    }
  },
  methods: {
    submit(e) {
      const baseUrl = 'http://localhost:5000/api'

      const {term, limit, page} = Object.fromEntries(new FormData(this.$el));
      const url = `${baseUrl}/imagesearch/${term}?page=${page}&limit=${limit}`
      fetch(url).then(res => res.json())
        .then(res => addImages(res))
        .catch(err => console.log(err));

      function addImages(res) {
        const images = document.getElementById('images');
        let imgs = '';

        for(const el of res) {
          imgs +=
            `<li class="mt-6 mr-6 bg-white rounded-md w-64 shadow-lg">
              <a href="${el.context}">
                <figure class="object-center">
                  <img class="h-30 object-center" src="${el.url}" />
                  <label class="inline-block my-4">${el.snippet}</label>
                </figure>
              </a>
            </li>`
        }
        images.innerHTML = imgs;
      }
    }
  }
}
</script>