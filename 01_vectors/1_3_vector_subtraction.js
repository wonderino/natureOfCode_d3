var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 640, height = 360,
    start = Date.now(),
    speed = 0.25;
    
var svg = d3.select(".d3_canvas")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "canvases")
    .on("mousemove", draw)
  .append("g")
  
var center = new Vector(width/2, height/2, 0);

var line = svg.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .style("stroke", "red")
    .style("stroke-width", 1)
    .attr("transform", "translate("+ center.x + "," + center.y + ")")

var multLine = svg.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .style("stroke", "blue")
    .style("stroke-width", 4)
    .attr("transform", "translate("+ center.x + "," + center.y + ")")

function draw() {
  var ms = d3.mouse(this);
  var ms_vec = new Vector(ms[0], ms[1])
  var vec = ms_vec.subtract(center);
  var multVec = vec.multiply(-0.5);
  var normalVec = vec.unit().multiply(50);
  console.log(normalVec);

  line.transition().attr("x2", vec.x)
      .attr("y2", vec.y);
  multLine.transition().attr("x2", normalVec.x)
      .attr("y2", normalVec.y);

}

