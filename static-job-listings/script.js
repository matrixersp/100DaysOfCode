const tags = document.querySelectorAll(".tag");
const jobs = document.querySelectorAll(".job");
const jobTags = document.querySelectorAll(".job__tags");
const jobsWrapper = document.getElementById("jobs-wrapper");
const filtersWrapper = document.getElementById("filters-wrapper");

const filters = document.createElement("div");
filters.classList.add("filters");
filtersWrapper.innerHTML += '<a class="filters__clear" href="#">Clear</a>';

const filtersSet = new Set();

tags.forEach((tag) => {
  tag.addEventListener("click", function (event) {
    filtersSet.add(this.innerText);

    jobTags.forEach((tags) => {
      let isFound = false;

      for (let i = 0; i < tags.childNodes.length; i++) {
        if (tags.childNodes[i].innerText === this.innerText) {
          isFound = true;
          break;
        }
      }

      if (!isFound) tags.parentNode.classList.add("is-hidden");
    });

    addFilters();
    addClearBtnsListerners();
  });
});

function addFilters() {
  filters.innerHTML = "";
  filtersSet.forEach((filter) => {
    filters.innerHTML += `<div class="filter">
         <span>${filter}</span>
         <img data-filter="${filter}" src="./images/icon-remove.svg" alt="Remove icon" />
       </div>`;
  });

  filtersWrapper.appendChild(filters);
  filtersWrapper.classList.remove("is-visible");
}

const clear = document.querySelector(".filters__clear");
clear.addEventListener("click", clearFilters);

function clearFilters(event) {
  filters.innerHTML = "";
  jobs.forEach((job) => {
    job.classList.remove("is-hidden");
  });

  filtersWrapper.classList.add("is-visible");
  filtersSet.clear();
}

function addClearBtnsListerners() {
  const filtersRemove = document.querySelectorAll('[data-filter]');

  filtersRemove.forEach((clear) => {
    clear.addEventListener("click", function (event) {
      const filterText = clear.getAttribute("data-filter");
      filtersSet.delete(filterText);

      jobTags.forEach((tags) => {
        let count = 0;

        for(elem of filtersSet) {
          for (let i = 0; i < tags.childNodes.length; i++) {
            if (tags.childNodes[i].innerText === elem) {
              count++;
              break;
            }
          }
        }

        if (count === filtersSet.size) tags.parentNode.classList.remove("is-hidden");
      });

      clear.parentNode.remove();
      if(filtersSet.size === 0) filtersWrapper.classList.add("is-visible");
    });
  });
}