var toggle = document.getElementById('menu-toggle');
var nav = document.getElementById('main-nav');

toggle.addEventListener('click', function(event) {
  nav.classList.toggle('is-open');
  document.body.classList.toggle('noscroll');
});