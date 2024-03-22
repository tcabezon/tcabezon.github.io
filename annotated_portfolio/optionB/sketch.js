var w = window.innerWidth;
var h = window.innerHeight;  

let modelToLoad='content/rotated.stl'


function preload(){
  object = loadModel(modelToLoad, true);
  // teapot = loadModel('assets/teapot.obj', true);
  print(modelToLoad,' loaded')
}

function setup(){
  canvas=createCanvas(w, h,WEBGL);
  angleMode(DEGREES)
}


function draw() {

  background(230);
  // fill(200,250,0)
  // strokeWeight(0.5);
  // console.log(0.5*w)
  // rect(0.1*w, 00, 150, 150)
  scale(2); // Scaled to make model fit into canvas
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 1);
  strokeWeight(0.5);
  // rotateX(180);
  rotateX(rotated_X);
  rotateY(-rotated_Y)
  document.getElementById('rotate_info').innerHTML='rotated_X '+Math.floor(rotated_X)+'<br>rotated_Y '+Math.floor(rotated_Y)

  // green color
  fill(200,250,100,250)
  // white color
  fill(255,255,255,250)
  model(object);

  // let rotation with mouse
  orbitControl();
  
  

  }

window.onresize = function() {
  // assigns new values for width and height variables

  w = window.innerWidth;
  h = window.innerHeight;  
  canvas.size(w,h);
  object = loadModel(modelToLoad, true);

}

