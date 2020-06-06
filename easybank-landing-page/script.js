const menuToggle =  document.getElementById('menu-toggle');
const nav =  document.getElementById('nav');

menuToggle.addEventListener('click', function(event) {
  nav.classList.toggle('is-open');

  if(nav.classList.contains('is-open')) {
    menuToggle.children[0].setAttribute('src', './images/icon-close.svg');
  } else {
    menuToggle.children[0].setAttribute('src', './images/icon-hamburger.svg');
  }
});