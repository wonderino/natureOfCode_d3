var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640,
    height = 240,
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select("#rand_num_dist")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
  .append("g")
  

var randomCounts = [];
for (var i = 0; i < 20; i++) {
  randomCounts.push(0);
}
var w = width/randomCounts.length;

var rects = svg.selectAll(".rect")
    .data(randomCounts)
  .enter().append("rect")
    .attr("class", "rect")
    .attr("x", function(d,i) {return w * i -.5;})
    .attr("y", function(d) {return height - d;})
    .attr("width", w)
    .attr("height", function(d) {return d})
    .attr("fill", "steelblue");

d3.timer(function() {
  var index = Math.floor(Math.random() * randomCounts.length);
  randomCounts[index] += 1;
  

  rects.data(randomCounts)
    .attr("y", function(d) {return height - d})
    .attr("height", function(d) {return d});
}); 

