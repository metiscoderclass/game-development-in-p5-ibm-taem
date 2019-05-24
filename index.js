var gridx = 200;
var gridy = 400;


function setup(){
  createCanvas(400, 800);
}

function draw(){
  background(220);
	//For (var BEGIN; END; INTERVAL){
	//DO SOMETHING }
	for (var x = 0; x < gridx; x += gridx / 10) {
    for (var y = 0; y < gridy; y += gridy / 20) {
      fill(255)
      rect(x, y, gridx/10, gridy/20)
      rect(x, y, gridx/10, gridy/20)

		}
	}
}
