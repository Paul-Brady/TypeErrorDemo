(function(){

  var VIZ ={};
  var camera, renderer, controls, scene = new THREE.Scene();
  var width = 400, height = 300;

  camera = new THREE.PerspectiveCamera(40, width/height , 1, 3000);
  camera.position.z = 2000;
  camera.setLens(30);
  
  VIZ.drawElements = function (data) {

    VIZ.count = data.length;

    var margin = {top: 0, right: 0, bottom: 45, left: 25},
        width  = 225 - margin.left - margin.right,
        height = 150 - margin.top  - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

	var yAxis = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .ticks(10);

    var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
        .y0(function (d) { return y(d.y0); })
        .y1(function (d) { return y(d.y0 + d.y); });

	var xAxisArray=[];
	
	for(item in data[0].results){
		xAxisArray.push(data[0].results[item].content);
		}
	
	
    var color = d3.scale.category10()
		.domain(xAxisArray);

    var elements = d3.selectAll('.element')
        .data(data).enter()
        .append('div')
        .attr('class', 'element')

    elements.append('div')
      .attr('class', 'chartTitle')
      .html(function (d,i) { return "<span style='color:#ccc;'>"+(i+1)+":</span> "+d.user; })

    elements.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("class","chartg")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
	var yMax=0;
	for(var item in data){
		for(var result in data[item].results){
			if(data[item].results[result].value>yMax){
				yMax=data[item].results[result].value;
			}
		}
	}
	
	x.domain(xAxisArray);
	y.domain([0, yMax]); //needs to be based on max value
	
    elements.select(".chartg")
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	  .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-45)"; 
                });

    elements.select(".chartg")
		.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
				
	var count=0;
			  
	elements.select(".chartg").selectAll(".bar")
		.data(function (d) { return d.results; })
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("fill",function(d){ return color(d.content); })
		  .attr("x", function(d) { return x(d.content); })
		  .attr("width", x.rangeBand())
		  .attr("y", function(d) { return y(d.value); })
		  .attr("height", function(d) { return height - y(d.value); })
		  .attr("id",function(d){++count; var YYY= (Math.floor((count-1)/11)+1)+"_"+d.content; return YYY; });

    elements.each(setData);
	elements.each(objectify);
			
  }

  var WIZ ={};
  var WIZcamera, WIZrenderer, WIZcontrols, WIZscene = new THREE.Scene();
  var width = 400, height = 300;

  WIZcamera = new THREE.PerspectiveCamera(40, width/height , 1, 3000);
  WIZcamera.position.z = 2000;
  WIZcamera.setLens(30);
  
  WIZ.drawElements = function (data) {

    WIZ.count = data.length;

    var margin = {top: 0, right: 0, bottom: 45, left: 25},
        width  = 225 - margin.left - margin.right,
        height = 150 - margin.top  - margin.bottom;

    var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

	var yAxis = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .ticks(10);

    var area = d3.svg.area()
        .interpolate("cardinal")
        .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
        .y0(function (d) { return y(d.y0); })
        .y1(function (d) { return y(d.y0 + d.y); });

	var xAxisArray=[];
	
	for(item in data[0].results){
		xAxisArray.push(data[0].results[item].content);
		}
	
	
    var color = d3.scale.category10()
		.domain(xAxisArray);

    var WIZelements = d3.selectAll('.WIZelement')
        .data(data).enter()
        .append('div')
        .attr('class', 'WIZelement')

    WIZelements.append('div')
      .attr('class', 'chartTitle')
      .html(function (d,i) { return "<span style='color:#ccc;'>"+(i+1)+":</span> "+d.user; })

    WIZelements.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("class","chartg")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
	var yMax=0;
	for(var item in data){
		for(var result in data[item].results){
			if(data[item].results[result].value>yMax){
				yMax=data[item].results[result].value;
			}
		}
	}
	
	x.domain(xAxisArray);
	y.domain([0, yMax]); //needs to be based on max value
	
    WIZelements.select(".chartg")
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	  .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-45)"; 
                });

    WIZelements.select(".chartg")
		.append("g")
			  .attr("class", "y axis")
			  .call(yAxis)
				
	var count=0;
			  
	WIZelements.select(".chartg").selectAll(".bar")
		.data(function (d) { return d.results; })
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("fill",function(d){ return color(d.content); })
		  .attr("x", function(d) { return x(d.content); })
		  .attr("width", x.rangeBand())
		  .attr("y", function(d) { return y(d.value); })
		  .attr("height", function(d) { return height - y(d.value); })
		  .attr("id",function(d){++count; var YYY= "WIZ"+(Math.floor((count-1)/11)+1)+"_"+d.content; return YYY; });

    WIZelements.each(WIZsetData);
	WIZelements.each(WIZobjectify);

}

function setData(d, i) {

    var random = new THREE.Object3D();
    random.position.x = Math.random() * 4000 - 2000;
    random.position.y = Math.random() * 4000 - 2000;
    random.position.z = Math.random() * 4000 - 2000;
    d['random'] = random;

	// These variables contain the columns and rows in the grid.
	var CC=3, // number of columns
	RR=3, // number of rows
	Next=CC*RR, // when to move to next layer
	xSpace = 400, // x distance between top left corner of each panel
	ySpace = 300, // y distance between each panel
	ySpaceCenter = ySpace*18/25, // value to centre the view
	zSpace = 600; // z distance between each layer
		
    var grid = new THREE.Object3D();
    grid.position.x = (( i % CC ) * xSpace) - (xSpace*CC/2.8);
    grid.position.y = ( - ( Math.floor( i / CC ) % RR ) * ySpace ) + (ySpaceCenter);
    grid.position.z = (- Math.floor( i / Next)) * zSpace + zSpace;
    d['grid'] = grid;

    d3.select(this).datum(d);
 }

function objectify(d) {
    var object = new THREE.CSS3DObject(this);
    object.position = d.random.position;
    scene.add(object);
}

VIZ.render = function () {
    renderer.render(scene, camera);
}

function WIZsetData(d, i) {
   
    var random2 = new THREE.Object3D();
    random2.position.x = Math.random() * 4000 - 2000;
    random2.position.y = Math.random() * 4000 - 2000;
    random2.position.z = Math.random() * 4000 - 2000;
    d['random'] = random2;

    // These variables contain the columns and rows in the grid.
	var CC=3, // number of columns
	RR=3, // number of rows
	Next=CC*RR, // when to move to next layer
	xSpace = 400, // x distance between top left corner of each panel
	ySpace = 300, // y distance between each panel
	ySpaceCenter = ySpace*18/25, // value to centre the view
	zSpace = 600; // z distance between each layer
		
    var WIZgrid = new THREE.Object3D();
    WIZgrid.position.x = (( i % CC ) * xSpace) - (xSpace*CC/2.8);
    WIZgrid.position.y = ( - ( Math.floor( i / CC ) % RR ) * ySpace ) + (ySpaceCenter);
    WIZgrid.position.z = (- Math.floor( i / Next)) * zSpace + zSpace;
    d['WIZgrid'] = WIZgrid;

    d3.select(this).datum(d);
 }

function WIZobjectify(d) {
    var object = new THREE.CSS3DObject(this);
    object.position = d.random.position;
    WIZscene.add(object);
}

  WIZ.render = function () {
    WIZrenderer.render(WIZscene, WIZcamera);
  }

transform = function (){
    console.log('transforming');
	var duration = 1000;

    TWEEN.removeAll();

    WIZscene.children.forEach(function (object){
      var newPos = object.element.__data__['WIZgrid'].position;
      var coords = new TWEEN.Tween(object.position)
            .to({x: newPos.x, y: newPos.y, z: newPos.z}, duration)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();

      var newRot = object.element.__data__['WIZgrid'].rotation;
      var rotate = new TWEEN.Tween(object.rotation)
            .to({x: newRot.x, y: newRot.y, z: newRot.z}, duration)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
    });
	
	scene.children.forEach(function (object){
      var newPos = object.element.__data__['grid'].position;
      var coords = new TWEEN.Tween(object.position)
            .to({x: newPos.x, y: newPos.y, z: newPos.z}, duration)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();

      var newRot = object.element.__data__['grid'].rotation;
      var rotate = new TWEEN.Tween(object.rotation)
            .to({x: newRot.x, y: newRot.y, z: newRot.z}, duration)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
    });
    
   var WIZupdate = new TWEEN.Tween(this)
       .to({}, duration)
       .onUpdate(WIZ.render)
       .start();
	
   var update = new TWEEN.Tween(this)
		.to({}, duration)
		.onUpdate(VIZ.render)
		.start();
  }
  
  WIZ.animate = function () {
    requestAnimationFrame(WIZ.animate);
    TWEEN.update();
    WIZcontrols.update();
  }

  WIZrenderer = new THREE.CSS3DRenderer();
  WIZrenderer.setSize(width, height);
  WIZrenderer.domElement.style.position = 'absolute';
  document.getElementById('container2').appendChild(WIZrenderer.domElement);

  WIZcontrols = new THREE.TrackballControls(WIZcamera, WIZrenderer.domElement);
  WIZcontrols.rotateSpeed = 0.5;
  WIZcontrols.minDistance = 100;
  WIZcontrols.maxDistance = 4000;
  WIZcontrols.addEventListener('change', WIZ.render);

  WIZ.onWindowResize = function () {
    WIZcamera.aspect = width / height;
    WIZcamera.updateProjectionMatrix();
    WIZrenderer.setSize(window.innerWidth, window.innerHeight);
    WIZ.render();
  }
  window.WIZ = WIZ;

  VIZ.animate = function () {
    requestAnimationFrame(VIZ.animate);
    TWEEN.update();
    controls.update();
  }

  renderer = new THREE.CSS3DRenderer();
  renderer.setSize(width, height);
  renderer.domElement.style.position = 'absolute';
  document.getElementById('container1').appendChild(renderer.domElement);

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.5;
  controls.minDistance = 100;
  controls.maxDistance = 4000;
  controls.addEventListener('change', VIZ.render);

  VIZ.onWindowResize = function () {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    VIZ.render();
  }
  
  window.VIZ = VIZ;
  
}())
