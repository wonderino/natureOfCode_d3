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


var data = [{x:width/2, y:height/2}];

function Walker() {
  this.x = width/2;
  this.y = height/2;

  this.step = function() {
    var stepX = Math.floor(Math.random()*3.0 - 1.0);
    var stepY = Math.floor(Math.random()*3.0 - 1.0);
    this.x+= stepX;
    this.y+= stepY;

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
    svg.append("rect")
      .attr("x", this.x).attr("y", this.y)
      .attr("width", 1).attr("height", 1)
      .style("fill", "black").style("stroke-width", 0);
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

