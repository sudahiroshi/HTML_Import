
window.addEventListener('load', function() {
  var link = document.querySelector("#xfoo2").import;
  var content = link.querySelector('template').content;
  var dest = document.querySelectorAll('x-foo2');
  for( x of dest ) {
    x.appendChild(content.cloneNode(true));
  }
});
