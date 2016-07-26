
window.addEventListener('load', function() {
  var link = document.querySelector('link[rel="import"]');
  var content = link.import;
  var elm = content.querySelector('p');
  var dest = document.querySelectorAll('x-foo');
  for( x of dest ) {
    x.appendChild(elm.cloneNode(true));
  }
});


/*
window.addEventListener('load', function() {
  var link = document.querySelector('link[rel="import"]').import;
  var content = link.querySelector('template').content;
  //var elm = content.querySelector('template');
  var dest = document.querySelectorAll('x-foo');
  for( x of dest ) {
    x.appendChild(content.cloneNode(true));
  }
});
*/
