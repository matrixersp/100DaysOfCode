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

list.addEventListener("mouseout", function (event) {
  var e = event.toElement || event.relatedTarget;
  if (e.parentNode == this || e == this || e.parentNode.parentNode == this)
    return;

  clearInterval(interval);
});
