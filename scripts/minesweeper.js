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
  var canvas = createCanvas(601, 601);
  canvas.mousePressed(clickCell);
  canvas.parent('canvasDiv');
  rstBtn = select('#newGame');
  rowInput = select('#rowsNum');
  colInput = select('#colsNum');
  bombsInput = select('#bombsNum');
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

  resizeCanvas(canvasH + 10, canvasW+50, true);

  showWin = false;
  showLose = false;


  // console.log(canvasW);
  // console.log(canvasH);
  // rows = floor(width/totalSize);
  // cols = floor(height/totalSize);

  table = makeArray2D(rows, cols);
  gifWin = loadGif('img/win/'+floor(random(1,31))+'.gif');
  gifLose = loadGif('img/lose/'+floor(random(1,31))+'.gif');
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      table[j][i] = new Cell(i, j, totalSize);
    }
  }
  setBombs(bombs);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      table[j][i].getNeighbors();
    }
  }
}
function setBombs(totalBombs) {
  if (rows * cols < totalBombs) {
    totalBombs = rows * cols;
  }
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
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      table[j][i].reveal();
    }
  }
}
function checkWin() {
  var ret = true;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (!table[j][i].open && !table[j][i].bomb) {
        ret = false;
      }
    }
  }
  return ret;
}
function clickCell() {
    if (mouseButton == LEFT){
      if (mouseX < canvasH && mouseY < canvasW) {
        if (!table[floor(mouseY / totalSize)][floor(mouseX / totalSize)].flaged) {
          table[floor(mouseY / totalSize)][floor(mouseX / totalSize)].reveal();
          if (table[floor(mouseY / totalSize)][floor(mouseX / totalSize)].bomb) {
            table[floor(mouseY / totalSize)][floor(mouseX / totalSize)].deadBomb = true;
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
      if (mouseX < canvasH && mouseY < canvasW) {
        console.log(mouseX);
        console.log(mouseY);
        table[floor(mouseY / totalSize)][floor(mouseX / totalSize)].flagCell();
      }
    }
}


function draw() {
background(255);
// console.log(table.length);
// console.log(table[0].length);

if (showWin) {
  resizeCanvas(canvasH + gifWin.width, canvasW+gifWin.height, true);
  image(gifWin, 0, canvasW + 2);
}
if (showLose) {
  resizeCanvas(canvasH + gifLose.width, canvasW+gifLose.height, true);
  image(gifLose, 0, canvasW + 2);
}
for (var i = 0; i < cols; i++) {
  for (var j = 0; j < rows; j++) {
      table[j][i].show();
    }
  }

}
