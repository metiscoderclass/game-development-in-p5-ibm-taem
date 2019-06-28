/* global createCanvas, mouseIsPressed, fill, mouseX, mouseY, ellipse, background, rect, keyIsDown, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, text, textSize, noLoop,20*/

var gridx = 200;
var gridy = 400;
var block;
var blockLength = 20;
let beweeg = true;
let wachttijd = 1000;
let backupwachttijd = 1000;
let unlocked = true;
let grid = []
let lijn = 0;
let xyval;
let harddrop = true;
let score = 0;



function setup(){
  createCanvas(400, 401);
  block = new tetrimino(100, -blockLength)
  //2D array
  for (var x = 0; x < gridx/20; x += 1) {
    grid[x] = Array(20)
    for (var y = 0; y < gridy/20; y += 1  ) {
    grid[x][y] = false
    }
  }
}

function draw(){
  background(215);
  fill(0)
  textSize(20)
  text("Lines: " + score, 220, 100)
  textSize(32);
  text('NOT TETRIS', 203, 30);
  //maak een grid
  drawgrid()
  block.display();
  block.move();
}

class tetrimino{
  constructor(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
  }
  display(){
    fill("black");
    rect(this.xpos, this.ypos, blockLength, blockLength)
  }
  move(){
    if (beweeg) {
      beweeg = false;
      this.ypos += blockLength;
      setTimeout(function() {beweeg = true}, wachttijd);
    }
    if (keyIsDown(65) && unlocked && this.xpos >= blockLength && grid[this.xpos/20-1][this.ypos/20] == false){
      unlocked = false;
      this.xpos -= blockLength;
      setTimeout(function() {unlocked = true}, 150)
    }
    if (keyIsDown(68) && unlocked && this.xpos <= gridx- 2 * blockLength && grid[this.xpos/20+1][this.ypos/20] == false){
      unlocked = false
      this.xpos += blockLength;
      setTimeout(function() {unlocked = true}, 150)
    }
    if (keyIsDown(32) && unlocked){
      unlocked = false
      while(harddrop == true){
        if(this.ypos >= blockLength*19 || grid[this.xpos/20][this.ypos/20+1]){
          harddrop = false
          setTimeout(function() {unlocked = true}, 200)
         }
        else{
          this.ypos += blockLength;
        }
      }
    }
    if (keyIsDown(83)){
      wachttijd = 50;
    }
    else{
      wachttijd = backupwachttijd;
    }
    if (this.ypos >= blockLength*19 || grid[this.xpos/20][this.ypos/20+1]){
      fill(0);
      grid[this.xpos/20][this.ypos/20] = true;
      checklijnen()
      if(checkdood()){
        drawgrid()
        noLoop();
        fill("red");
        text("GAME OVER", 200, 150)
      }
      else{
        block = new tetrimino(100, -blockLength)
        harddrop = true;
      }
    }
  }
}

function drawgrid(){
	for (var x = 0; x < gridx/20; x += 1) {
    for (var y = 0; y < gridy/20; y += 1) {
      if (grid[x][y]){
        fill(0)
      } else {
        fill(255)
      }
      rect(x*20, y*20, gridx/10, gridy/20)
		}
	}
}

function checkdood(){
  for (var x = 0; x < gridx/20; x++){
    console.log("grid[0][" + x + "]: " + grid[0][x]);
    if(grid[x][0]){
     return true;
    }
  }
  return false;
}

function checklijnen(){

  for (var y = 0; y < gridy/20; y++) {
    lijn = 0;

    for (var x = 0; x < gridx/20; x++) {

      if (grid[x][y]) {
        lijn += 1;
      }

      if (lijn == 10) {
        score += 1;
        for(var y1 = y; y1 > 0; y1--) {

          for (var x1 = 0; x1 < gridx/20; x1++) {
            if(y1 == 0){
              xyval = false;
            }
            else{
              xyval = grid[x1][y1-1]
            }
            grid[x1][y1] = xyval
          }
        }
      }
    }
  }
}


   a
