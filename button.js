class GUI {
  constructor( content ) {
    var nl = new nylon();
    //content.querySelector('#dec').addEventListener('click', () => {
    var foo = content.querySelector('#dec');
    foo.addEventListener('click', () => {
      nl.emit( 'dec', null );
    }, false);
    content.querySelector('#inc').addEventListener('click', function() {
      nl.emit( 'inc', null );
    });
  }
}

window.addEventListener('load', function() {
  /*
  var link = document.querySelector("#gui").import;
  var content = link.querySelector('template').content;
  var dest = document.querySelectorAll('x-input');
  for( x of dest ) {
    x.appendChild(content.cloneNode(true));
  }
*/
  var link = document.querySelector("#gui").import;
  //var shadow = document.querySelector('x-input').createShadowRoot();
  var template = link.querySelector('template');
  var clone = document.importNode( template.content, true );
  var shadow = document.querySelectorAll('x-input');
  for( x of shadow ) {
    var y = x.createShadowRoot();
    //console.log( x );
    y.appendChild( clone.cloneNode(true) );
    new GUI( y );
  }
  //shadow.appendChild(clone);
  //console.log(shadow);
});
