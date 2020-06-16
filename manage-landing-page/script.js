var toggle = document.getElementById("menu-toggle");
var nav = document.getElementById("main-nav");

toggle.addEventListener("click", function (event) {
  nav.classList.toggle("is-open");
  document.body.classList.toggle("noscroll");
});

var list = document.getElementById("testimonials-list");

let interval = null;
list.addEventListener("mouseover", function (event) {
  if (300 > event.clientX) {
    clearInterval(interval);
    interval = setInterval(scrollLeft.bind(this), 15);
  }
  if (window.innerWidth - 300 < event.clientX) {
    clearInterval(interval);
    interval = setInterval(scrollRight.bind(this), 15);
  }
});

function scrollLeft() {
  this.scrollLeft += -5;
}

function scrollRight() {
  this.scrollLeft += +5;
}

list.addEventListener("mouseleave", function (event) {
  clearInterval(interval);
});

// list.addEventListener("mouseout", function (event) {
//   var e = event.toElement || event.relatedTarget;
//   if (e.parentNode == this || e == this || e.parentNode.parentNode == this)
//     return;

//   clearInterval(interval);
// });

// setInterval(function() {

//   var controls = document.getElementById('controls');

//   console.log(getComputedStyle(list).left);
//   // list.style.left = list.style.left ? parseInt(list.style.left) - 100 + 'px' : 0;
// }, 1000)


