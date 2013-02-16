var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var data = [{x:width/2, y:height/2}];

var widthW = width/10;
svg.selectAll(".rects")
    .data(data)
  .enter().append("rect")
    .attr("class", "rect")
    .attr("x", -widthW/2)
    .attr("y", -widthW/2)
    .attr("width", widthW)
    .attr("height", widthW)
    .attr("transform", function(d) { 
    	return "translate("+ d.x + "," + d.y + ")"})
    .style("fill", "steelblue");

d3.timer(function() {
  var deg = (Date.now() - start) * speed ; 
  var transVal = function(d) { return "translate("+ d.x + "," + d.y + ")" + "rotate(" + deg + ")"; }
  svg.selectAll(".rect").attr("transform", transVal);
  //svg.attr("transform", transVal); // fixed ring*/
}); 

