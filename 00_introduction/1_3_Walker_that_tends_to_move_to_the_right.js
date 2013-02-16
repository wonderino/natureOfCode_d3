var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640,
    height = 240,
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select("#walk_to_right")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
  .append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



function Walker() {
  this.path = [{x:width/2, y:height/2}];

  this.line = d3.svg.line()
      .x(function(d) {return d.x})
      .y(function(d) {return d.y})
      .interpolate("linear");

  this.svgLine = svg.append("path")
          .attr("d", this.line(this.path))
          .style("border-width", 1.0)
          .style("stroke", "#eb005a")
          .style("fill-opacity", 0);
  
  this.step = function() {
    var r = Math.random();
    var curPos = this.path[this.path.length-1];
    var newPos = {x:curPos.x, y:curPos.y};

    if (r < 0.4) newPos.x ++;
    else if (r < 0.6) newPos.x--;
    else if (r < 0.8) newPos.y++;
    else newPos.y--;

    this.path.push(newPos);
  }
  this.display = function() {
    this.svgLine.attr("d", this.line(this.path));
  }
}



var walker = new Walker();
walker.display();

d3.timer(function() {
  var deg = (Date.now() - start) * speed ; 
  walker.step();
  walker.display();
  //svg.attr("transform", transVal); // fixed ring*/
}); 

