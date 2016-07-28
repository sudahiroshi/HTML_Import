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
      this.drawGraph();
    });
  }

  drawGraph() {
    this.ctx.beginPath();
    this.ctx.clearRect( 0, 0, this.elm.width, this.elm.height );
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo( 0, this.elm.height/2 );
    for( var i=0; i<=this.elm.width; i++ ) {
      var y = Math.sin( Math.PI/180. * i / this.elm.width * 360. * this.freq);
      this.ctx.lineTo( i, y );
    }
    this.ctx.stroke();

  }
}

window.addEventListener('load', function() {
  var link = document.querySelector("#graph").import;
  var content = link.querySelector('template').content;
  var dest = document.querySelectorAll('x-graph');
  for( x of dest ) {
    x.appendChild(content.cloneNode(true));
  }

  var element = content.querySelector('#sim-graph');
  var g = new Graph( element );
  g.drawGraph();

});
