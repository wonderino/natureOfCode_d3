var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640, height = 360,
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select(".d3_canvas")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
  .append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
function Attractor() {
  this.mass =20;
  this.location = new Vector(width/2, height/2);
  this.circle = svg.append("circle")
    .attr("cx", this.location.x)
    .attr("cy", this.location.y)
    .attr("r", this.mass)
    .style("fill", "gray")
    .style("stroke", "black")
    .style("stroke-width", 4)

  this.attract = function(m) {
    var force = this.location.subtract(m.location);
    var distance = force.length();
    distance = Math.max(Math.min(5.0, distance), 25.0);

    force = force.unit();

    var strength = 1.5* this.mass * m.mass / (distance * distance);
    return force.multiply(strength);
  }

  this.display = function(){

  }
}

function Mover() {
  
  this.location = new Vector(width/2,100);
  this.velocity = new Vector(2,0);
  this.acceleration = new Vector(0,0);
  this.mass = 1;

  this.circle = svg.append("circle")
    .attr("cx", this.location.x)
    .attr("cy", this.location.y)
    .attr("r", this.mass*8)
    .style("fill", "gray")
    .style("stroke", "black")
    .style("stroke-width", 2)

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
  
};

var a = new Attractor();
var m = new Mover();


d3.timer(function() {
  var force = a.attract(m);
  m.applyForce(force);
  m.step();
  m.display();
  m.checkEdges();

  //svg.attr("transform", transVal); // fixed ring*/
}); 

