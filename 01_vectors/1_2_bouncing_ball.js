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

function Walker() {
  
  this.location = new Vector(width/2, height/2, 0);
  this.velocity = new Vector(2.5, 5.,0);
  this.r = 16;

  this.circle = svg.append("circle")
    .attr("cx", this.location.x)
    .attr("cy", this.location.y)
    .attr("r", this.r)
    .style("fill", "gray")
    .style("stroke", "black")
    .style("stroke-width", 2)

  this.step = function() {
    this.location = this.location.add(this.velocity);

    if((this.location.x > width - this.r ) || (this.location.x < 0 + this.r )) {
        this.velocity.x = this.velocity.x * -1;
    }

    if((this.location.y > height - this.r) || (this.location.y < 0 + this.r )) {
        this.velocity.y = this.velocity.y * -1;
    }    
  }

  this.display = function() {
    this.circle.attr("cx", this.location.x)
      .attr("cy", this.location.y);
  }
  
};

var walker = new Walker();

d3.timer(function() {
  walker.step();
  walker.display();
  //svg.attr("transform", transVal); // fixed ring*/
}); 

