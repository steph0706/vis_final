import d3 from 'd3';

var poop = "poop";

function createChart() {
    console.log("crating");
    var width = this.props.width,
    height = this.props.height,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 12;

    var color = d3.scale.ordinal()
          .range(["#338c96", "#338c96"]);

    d3.text("languagesize.csv", function(error, text) {
      if (error) throw error;
      var colNames = "text,size,group\n" + text;
      var data = d3.csv.parse(colNames);

      data.forEach(function(d) {
        d.size = +d.size * 3;
      });


    //unique cluster/group id's
    var cs = [];
    data.forEach(function(d){
            if(!cs.contains(d.group)) {
                cs.push(d.group);
            }
    });

    var n = data.length, // total number of nodes
        m = cs.length; // number of distinct clusters

    //create clusters and nodes
    var clusters = new Array(m);
    var nodes = [];
    for (var i = 0; i<n; i++){
        nodes.push(create_nodes(data,i));
    }

    var force = d3.layout.force()
        .nodes(nodes)
        .size([width, height])
        .gravity(.02)
        .charge(0)
        .on("tick", tick)
        .start();

    let svg = d3.select(".scroll__graphic2").append("svg")
        .attr("class", "bubble")
        .attr("width", width)
        .attr("height", height);


    var node = svg.selectAll("circle")
        .data(nodes)
        .enter().append("g").call(force.drag)
        .attr("class", "node");



    node.append("circle")
        .attr("r", function(d){return d.radius})
        .attr("fill", "#6fc5db")
        .on("mouseenter", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("mousedown", handleMouseClick);
        
        

    node.append("text")
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .style("font-size", "12px")
          .style("fill", "#ffffff")
          .style("visibility", "hidden")
          .text(function(d) { return d.text.substring(0, d.radius / 3); });


    function create_nodes(data,node_counter) {
      var i = cs.indexOf(data[node_counter].group),
          r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
          d = {
            cluster: i,
            radius: data[node_counter].size*1.5,
            text: data[node_counter].text,
            x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
            y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
          };
      if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
      return d;
    };



    function tick(e) {
        node.each(cluster(10 * e.alpha * e.alpha))
            .each(collide(.5))
        .attr("transform", function (d) {
            var k = "translate(" + d.x + "," + d.y + ")";
            return k;
        })

    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
        return function (d) {
            var cluster = clusters[d.cluster];
            if (cluster === d) return;
            var x = d.x - cluster.x,
                y = d.y - cluster.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + cluster.radius;
            if (l != r) {
                l = (l - r) / l * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                cluster.x += x;
                cluster.y += y;
            }
        };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
        var quadtree = d3.geom.quadtree(nodes);
        return function (d) {
            var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function (quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }

    function handleMouseOver(d, i) {  // Add interactivity

        // Use D3 to select element, change color and size
        d3.select(this).attr({
          fill: "#b6e5ea",
        });
        console.log(d);

        // Specify where to put label of text
        svg.append("text").attr({
           id: "t" + i,  // Create an id for text so we can select it later for removing on mouseout
            x: function() { return (d.x) - 30; },
            y: function() { return (d.y) - 15; }
        })
        .text(function() {
          return [d.text];  // Value of the text
        })
        .style("font-size", "13px")
        .style("fill", "#5c5f66");

    }

    function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this).attr({
          fill: "#6fc5db",
        });

        //Select text by id and then remove
        d3.select("#t" + i).remove();  // Remove text location
    }

    function handleMouseClick(d, i) {

        //Select text by id and then remove
        d3.select("#t" + i).remove();  // Remove text location
      

    };

    });


    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === v) return true;
        }
        return false;
    };

}


