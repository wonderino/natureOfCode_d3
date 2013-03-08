var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640, height = 360,
    start = Date.now(),
    G = 0.4,
    speed = 0.25;
    
var svg = d3.select(".d3_canvas")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
  .append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function Mover(m, x, y) {
  
  this.location = new Vector(x,y);
  this.velocity = new Vector(0,0);
  this.acceleration = new Vector(0,0);
  this.mass = m;

  this.circle = svg.append("circle")
    .attr("cx", this.location.x)
    .attr("cy", this.location.y)
    .attr("r", this.mass*8)
    .style("fill", "gray")
    .style("stroke", "black")
    .style("stroke-width", 2)
    .style("fill-opacity", 0.4);

  this.applyForce = function (force) {
    var f = force.divide(this.mass);
    this.acceleration = this.acceleration.add(f);
  }

  this.checkEdges = function() {
    if(this.location.x > width - this.r ) {
      this.location.x = width-this.r;
      this.velocity.x *= -1;
    } else if (this.location.x < 0 + this.r ) {
      this.location.x = 0 + this.r ;
      this.velocity.x *= -1;
    }

    if(this.location.y > height - this.r) {
        this.location.y = height - this.r;
        this.velocity.y = this.velocity.y * -1;
    }  
  }

  this.step = function() {
    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);
    this.acceleration = this.acceleration.multiply(0.0);  
  }

  this.display = function() {
    this.circle.attr("cx", this.location.x)
      .attr("cy", this.location.y);
  }
  
  this.attract = function(m) {
    var force = this.location.subtract(m.location);
    var distance = force.length();
    distance = Math.max(Math.min(5.0, distance), 25.0);

    force = force.unit();
    var strength = G * this.mass * m.mass / (distance * distance);
    return force.multiply(strength);
  }
};

var movers = []
for (var i =0; i< 20; i++) {
  movers.push(new Mover(Math.random()*2+0.1, Math.random()*width, Math.random()*height))
}


d3.timer(function() {
  for (var i=0; i< movers.length;i++) {
    for(var j=0; j< movers.length; j++) {
      if (i!=j) {
        var force = movers[j].attract(movers[i]);
        movers[i].applyForce(force);
      }
    }
    movers[i].step();
    movers[i].display();
  }
}); 

