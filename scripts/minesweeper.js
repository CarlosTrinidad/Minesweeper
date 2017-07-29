function makeArray2D(rows, cols) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}
var table;
var rows;
var cols;
var totalSize = 60;
var bombs = 10;

function setup() {
  createCanvas(601, 601);
  rows = floor(width/totalSize);
  cols = floor(height/totalSize);
  table = makeArray2D(rows, cols);

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      table[i][j] = new Cell(i, j, totalSize);
    }
  }
  setBombs(bombs);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      table[i][j].getNeighbors();
    }
  }
  // console.log(table);
}
function setBombs(totalBombs) {
  while (totalBombs > 0) {
    var x = floor(random(rows));
    var y = floor(random(cols));

    if (!table[x][y].bomb) {
      table[x][y].bomb = true;
      totalBombs--;
    }

  }
}
function gameOver() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      table[i][j].reveal();
    }
  }
}

function mousePressed() {
  if (mouseIsPressed) {
    if (mouseButton == LEFT){
      if (mouseX <= width && mouseY <= height) {
        if (!table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].flaged) {
          table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].reveal();
          if (table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].bomb) {
            gameOver();
          }
        }
      }
    }
    if (mouseButton == RIGHT){
      if (mouseX <= width && mouseY <= height) {
        console.log(mouseX);
        console.log(mouseY);
        table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].flagCell();
      }
    }
  }



}

function draw() {
background(255);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      table[i][j].show();
    }
  }
}
