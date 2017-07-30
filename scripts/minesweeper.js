function makeArray2D(rows, cols) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}
var table;
var rows = 9;
var cols = 9;
var totalSize = 30;
var bombs = 10;
var gifWin;
var gifLos;
var showWin = false;
var showLose = false;
var canvasW = 0;
var canvasH = 0;
var rstBtn;
var rowInput;
var colInput;
var bombsInput;

function setup() {
  rows = 9;
  cols = 9;
  createCanvas(601, 601);
  createP('');
  rstBtn = createButton("New Game");
  createP('');
  rowInput = createInput("9");
  colInput = createInput("9");
  bombsInput = createInput("10");
  rstBtn.mousePressed(setGame);
  setGame();
  // console.log(table);
}
function setGame() {
  rows = Number(rowInput.value());
  cols = Number(colInput.value());
  bombs = Number(bombsInput.value());

  canvasW = rows * totalSize;
  canvasH = cols * totalSize;

  resizeCanvas(windowWidth , canvasH+1, true);

  showWin = false;
  showLose = false;


  // console.log(canvasW);
  // console.log(canvasH);
  // rows = floor(width/totalSize);
  // cols = floor(height/totalSize);

  table = makeArray2D(rows, cols);
  gifWin = loadGif('img/win/'+floor(random(1,31))+'.gif');
  gifLose = loadGif('img/lose/'+floor(random(1,31))+'.gif');
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
function checkWin() {
  var ret = true;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (!table[i][j].open && !table[i][j].bomb) {
        ret = false;
      }
    }
  }
  return ret;
}

function mousePressed() {
  if (mouseIsPressed) {
    if (mouseButton == LEFT){
      if (mouseX < canvasW && mouseY < canvasH) {
        if (!table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].flaged) {
          table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].reveal();
          if (table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].bomb) {
            table[floor(mouseX / totalSize)][floor(mouseY / totalSize)].deadBomb = true;
            showLose = true;
            gameOver();
          }else {
            if (checkWin()) {
              showWin = true;
              gameOver();
            }
          }
        }
      }
    }
    if (mouseButton == RIGHT){
      if (mouseX < canvasW && mouseY < canvasH) {
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
  if (showWin) {
    image(gifWin, canvasW + 10, 0);
  }
  if (showLose) {
    image(gifLose, canvasW + 10, 0);
  }
}
