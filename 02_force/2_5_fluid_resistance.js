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

function Mover(m, x, y) {
  
  this.location = new Vector(x,y);
  this.velocity = new Vector(0,0);
  this.acceleration = new Vector(0,0);
  this.mass = m;
  this.r = m * 4;

  this.circle = svg.append("circle")
    .attr("cx", this.location.x)
    .attr("cy", this.location.y)
    .attr("r", this.r)
    .style("fill", "gray")
    .style("stroke", "black")
    .style("stroke-width", 2)
    .style('fill-opacity', 0.25)

  this.applyForce = function (force) {
    var f = force.divide(this.mass);
    this.acceleration = this.acceleration.add(f);
  }

  this.checkEdges = function() {
    if(this.location.x > width - this.r ) {
      this.location.x = width-this.r;
      this.velocity.x *= -0.8;
    } else if (this.location.x < 0 + this.r ) {
      this.location.x = 0 + this.r ;
      this.velocity.x *= -0.8;
    }

    if(this.location.y > height - this.r) {
        this.location.y = height - this.r;
        this.velocity.y = this.velocity.y * -0.8;
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
  
  this.isInside = function(l) {
    if (this.location.x > l.x && this.location.x < l.x + l.w && this.location.y>l.y && this.location.y<l.y+l.h) {
      return true;
    } else {
      return false;
    }
  }

  this.drag = function(l) {
    
    var dragMagnitude = l.c * this.velocity.dot(this.velocity);
    var drag = this.velocity.multiply(-1);
    drag = drag.unit();
    drag = drag.multiply(dragMagnitude);
    this.applyForce(drag);
  }
};

function Liquid(x,y,w,h,c) {
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 0;
  this.h = h || 0;
  this.c = c || 0;

  this.rect = svg.append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", w)
    .attr("height", h)
    .style("fill", 175)
    .style("stroke-width", 0)

  this.display = function() {

  }
}

var liquid = new Liquid(0, height/2, width, height/2, 0.1);
var mNum = 20;
var movers = [];
for (var i = 0; i < 20; i++) {
  movers.push(new Mover(Math.random()*5+0.5, i*width/mNum, 0));
}


d3.timer(function() {
  
  movers.forEach(function(m) {
    if (m.isInside(liquid)){
      m.drag(liquid);
    }
    
    var gravity = new Vector(0,0.1*m.mass);

    m.applyForce(gravity);
    m.step();
    m.display();
    m.checkEdges();
  });
 
  //svg.attr("transform", transVal); // fixed ring*/
}); 

