var margin = {top: 40, right: 40, bottom: 40, left: 40},
width = 640, height = 360,
start = Date.now(),
speed = 0.25;
var targetVec = new Vector();

var svg = d3.select(".d3_canvas")
.append("svg")
.attr("width", width)
.attr("height", height)
.attr("class", "canvases")
.on("mousemove", target)
.append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function target() {
  var mp = d3.mouse(this);
  var mp_vec = new Vector(mp[0], mp[1]);
  targetVec = mp_vec;
}

function Walker() {

  this.location = new Vector(Math.random()*width, Math.random()*height);
  this.velocity = new Vector(Math.random()*2.5, Math.random()*5.);
  this.r = 16;
  this.mult = Math.random();
  this.circle = svg.append("circle")
  .attr("cx", this.location.x)
  .attr("cy", this.location.y)
  .attr("r", this.r)
  .style("fill", "gray")
  .style("stroke", "black")
  .style("stroke-width", 2)

  this.step = function() {
    var dir = targetVec.subtract(this.location);
    
    dir = dir.unit();
    var acc = dir.multiply(this.mult);
    this.velocity = this.velocity.add(acc);
    var maxVel = 10.;
    if (this.velocity.length() > maxVel) {
      this.velocity = this.velocity.unit();
      this.velocity = this.velocity.multiply(maxVel);
    }

    this.location = this.location.add(this.velocity);

  }

  this.display = function() {
    this.circle.attr("cx", this.location.x)
    .attr("cy", this.location.y);
  }

};

var walkers = []
for (var i = 0; i< 20; i++) {
  walkers.push(new Walker());
}

d3.timer(function() {
  for (var i = 0; i < walkers.length ;i++) {
    walkers[i].step();
    walkers[i].display();
  }
}); 

