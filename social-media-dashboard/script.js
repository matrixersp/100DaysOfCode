const toggle = document.getElementById('switch');

toggle.addEventListener('change', function(event) {
  let root = document.documentElement;
  if(!root.getAttribute('data-theme')) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
})
