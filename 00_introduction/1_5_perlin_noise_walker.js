var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640, height = 240,
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select("#perlin_walker")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
  .append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function Walker() {
  this.x = width/2;
  this.y = height/2;

  this.tx = 0;
  this.ty = 10000;


  this.circle = svg.append("circle")
    .attr("cx", this.x)
    .attr("cy", this.y)
    .attr("r", "20")
    .style("fill", "gray")
    .style("stroke", "black")
    .style("stroke-width", 2)

  this.noise = new SimplexNoise();

  this.xrange = d3.scale.linear().domain([-1.0, 1.0]).range([0,width]);
  this.yrange = d3.scale.linear().domain([-1.0, 1.0]).range([0,height]);

  this.step = function() {
    this.x = this.xrange(this.noise.noise(this.tx,this.ty));
    this.y = this.yrange(this.noise.noise(this.ty,this.tx));

    this.tx += 0.001;
    this.ty -= 0.001;
  }

  this.display = function() {
    this.circle.attr("cx", this.x)
      .attr("cy", this.y);
  }
  
};

var walker = new Walker();

d3.timer(function() {
  walker.step();
  walker.display();
  //svg.attr("transform", transVal); // fixed ring*/
}); 

