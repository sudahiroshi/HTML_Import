class Graph {
  constructor( elm ) {
    this.elm = elm;
    this.ctx = elm.getContext('2d');
    this.freq = 1;

    var nl = new nylon();
    nl.on( 'dec', ( key, params ) => {
      this.freq -= 0.1;
      console.log("dec - freq = " + this.freq );
      this.drawGraph();
    });
    nl.on( 'inc', ( key, params ) => {
      this.freq += 0.1;
      console.log("inc - freq = " + this.freq );
      //console.log( drawGraph );
      this.drawGraph();
    });
  }

  drawGraph() {
    this.ctx.beginPath();
    this.ctx.clearRect( 0, 0, this.elm.width, this.elm.height );
    this.ctx.fill();

    this.ctx.beginPath();
    var center = this.elm.height/2;
    this.ctx.moveTo( 0, center );
    for( var i=0; i<=this.elm.width; i++ ) {
      var y = Math.sin( Math.PI/180. * i / this.elm.width * 360. * this.freq) * 100;
      this.ctx.lineTo( i, y + center );
    }
    this.ctx.stroke();
  }
}

window.addEventListener('load', function() {
  var link = document.querySelector("#graph").import;
  var template = link.querySelector('template');
  var clone = document.importNode( template.content, true );
  var shadow = document.querySelectorAll('x-graph');
  for( x of shadow ) {
    x.createShadowRoot().appendChild( clone.cloneNode(true) );
    var element = x.shadowRoot.querySelector('#sim-graph');
    console.log( element );
    var g = new Graph( element );
    g.drawGraph();
  }

  // var link = document.querySelector("#graph").import;
  // var template = link.querySelector('template');
  // var content = template.content;
  // var dest = document.querySelectorAll('x-graph');
  // for( x of dest ) {
  //   x.appendChild(content.cloneNode(true));
  // }

});
