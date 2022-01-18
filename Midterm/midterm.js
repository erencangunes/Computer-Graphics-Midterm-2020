var canvas;
var gl;
var vPosition;
var program;

var letter1vertices, letter2vertices;
var buffer1, buffer2;
var red,green,blue,redLoc,greenLoc,blueLoc;
var scaleX,scaleY,scaleXLoc,scaleXLoc,posX,posY,posXLoc,posXLoc;
// TODO: define any global variables you need
//default vars
scaleX = 1;
scaleY = 1;
posX = 0;
posY = 0;

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Create geometry data
  letter1vertices = [vec2(0, 0.3),
										 vec2(0, 0.2),
										 vec2(-0.5, 0.3),
										 vec2(-0.5, 0.2),
										 vec2(-0.6, 0.2),
										 vec2(-0.5, 0.05),
										 vec2(-0.6, 0.05),
										 vec2(-0.5, -0.05),
										 vec2(-0.5, 0.05),
										 vec2(-0.1, -0.05),
										 vec2(-0.1, 0.05),
										 vec2(-0.5, 0.05),
										 vec2(-0.5, -0.05),
										 vec2(-0.6, -0.05),
										 vec2(-0.5, -0.2),
										 vec2(-0.6, -0.2),
										 vec2(-0.5, -0.3),
										 vec2(0, -0.2),
										 vec2(0, -0.3)];


    letter2vertices = [vec2(0.6, 0.3),
			 								 vec2(0.6, 0.2),
			                 vec2(0.1, 0.3),
											 vec2(0.2, 0.2),
											 vec2(0.1, -0.3),
											 vec2(0.2,-0.2),
											 vec2(0.6, -0.3),
											 vec2(0.5, -0.2),
											 vec2(0.6, -0.05),
											 vec2(0.5, 0.05),
											 vec2(0.4, -0.05),
											 vec2(0.4, 0.05)];

  redLoc = gl.getUniformLocation(program,"red");
	greenLoc = gl.getUniformLocation(program,"green");
	blueLoc = gl.getUniformLocation(program,"blue");
	scaleXLoc = gl.getUniformLocation(program,"scaleX");
	scaleYLoc = gl.getUniformLocation(program,"scaleY");
	posXLoc = gl.getUniformLocation(program,"posX");
	posYLoc = gl.getUniformLocation(program,"posY");

    // TODO: create vertex coordinates for your initial letters instead of these vertices

    // Load the data into the GPU
	buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );

    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );


	document.getElementById("posX").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posX = event.target.value;

    };
    document.getElementById("posY").oninput = function(event) {
        //TODO: fill here to adjust translation according to slider value
        posY = event.target.value;
    };
    document.getElementById("scaleX").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleX = event.target.value;
    };
    document.getElementById("scaleY").oninput = function(event) {
        //TODO: fill here to adjust scale according to slider value
        scaleY = event.target.value;
    };
    document.getElementById("redSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        red = event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        green = event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        //TODO: fill here to adjust color according to slider value
        blue = event.target.value;
    };



    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    // TODO: Send necessary uniform variables to shader and
    ///////////////////////////
    gl.uniform1f(redLoc,red);
    gl.uniform1f(greenLoc,green);
    gl.uniform1f(blueLoc,blue);
    gl.uniform1f(scaleXLoc,scaleX);
    gl.uniform1f(scaleYLoc,scaleY);
    gl.uniform1f(posXLoc,posX);
    gl.uniform1f(posYLoc,posY);
    ////////////////////////////
    // perform draw calls for drawing letters

    // bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw triangle
	  gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter1vertices.length);
    gl.uniform1f(redLoc,1-red);
    gl.uniform1f(greenLoc,1-green);
    gl.uniform1f(blueLoc,1-blue);
	// bind vertex buffer and associate position data with shader variables
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    // draw rectangle
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, letter2vertices.length);

    window.requestAnimFrame(render);
}
