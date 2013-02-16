var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640,
    height = 240,
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select("#trad_rand_walk")
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
          .style("stroke", "black")
          .style("fill-opacity", 0);
  
  this.step = function() {
    var stepX = Math.floor(Math.random()*3.0 - 1.0);
    var stepY = Math.floor(Math.random()*3.0 - 1.0);
   

    var tempX = this.path[this.path.length-1].x + stepX;
    var tempY = this.path[this.path.length-1].y + stepY;

    this.path.push({x:tempX, y:tempY});

    /*
    var choice = Math.floor(Math.random()*4.0);
    if (choice==0) {
      this.x++;
    } else if (choice == 1) {
      this.x--;
    } else if (choice == 2) {
      this.y++;
    } else {
      this.y--;
    }*/
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

