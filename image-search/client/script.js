const baseUrl = 'http://localhost:5000/api'
const form = document.getElementById('form');

// Fetch latest searches
const url = `${baseUrl}/latest/imagesearch`;
fetch(url).then(res => res.json())
  .then(res => addLatestSearches(res))
  .catch(err => console.log(err));


function addLatestSearches(res) {
  const searches = document.getElementById('searches');
  let terms = '';

  for(el of res) {
    terms += `<li>-${el.term}</li>`
  }

  searches.innerHTML = terms;
}

// Search an image
form.addEventListener('submit', function(e) {
  e.preventDefault()
  const {term, limit, page} = Object.fromEntries(new FormData(this));
  const url = `${baseUrl}/imagesearch/${term}?page=${page}&limit=${limit}`
  fetch(url).then(res => res.json())
    .then(res => addImages(res))
    .catch(err => console.log(err));
})

function addImages(res) {
  const images = document.getElementById('images');
  let imgs = '';

  for(el of res) {
    imgs +=
      `<li>
        <a href="${el.context}">
          <figure>
            <img src="${el.url}" />
            <label>${el.snippet}</label>
          </figure>
        </a>
      </li>`
  }
  images.innerHTML = imgs;
}