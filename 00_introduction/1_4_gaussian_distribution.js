var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640, height = 240,
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select("#gaussian_dist")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
  .append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function rnd_bmt() {
  var x = 0, y = 0, rds, c;

  // Get two random numbers from -1 to 1.
  // If the radius is zero or greater than 1, throw them out and pick two new ones
  // Rejection sampling throws away about 20% of the pairs.
  do {
  x = Math.random()*2-1;
  y = Math.random()*2-1;
  rds = x*x + y*y;
  }
  while (rds == 0 || rds > 1)

  // This magic is the Box-Muller Transform
  c = Math.sqrt(-2*Math.log(rds)/rds);

  // It always creates a pair of numbers. I'll return them in an array. 
  // This function is quite efficient so don't be afraid to throw one away if you don't need both.
  return x*c;//, y*c];
};

function Walker() {
  this.path = [];

  this.circles = svg.selectAll(".circles")
    .data(this.path)
  .enter().append("circle")
    

  this.step = function() {
    var num = rnd_bmt();
    var sd = 80;
    var mean = width/2;

    var x = Math.floor(sd * num + mean) - 0.5;

    this.path.push(x);
  }

  this.display = function() {
    this.circles
      .data(this.path)
    .enter().append("circle")
    .attr("cx", function(d){return d;})
    .attr("cy", height/2)
    .attr("r", 10)
    .style("fill", "black")
    .style("fill-opacity", 0.01);
  }
  
};

var walker = new Walker();

d3.timer(function() {
  walker.step();
  walker.display();
  //svg.attr("transform", transVal); // fixed ring*/
}); 

