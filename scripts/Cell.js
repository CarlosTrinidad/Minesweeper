function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.xcent = (i * w) + w/2;
  this.ycent = (j * w) + w/2;
  this.w = w;
  this.bomb = false;
  this.open = false;
  this.flaged = false;
  this.deadBomb = false;
  this.neighbors = 0;
}

Cell.prototype.show = function () {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.open) {
    fill(90, 105, 152, 40);
    rect(this.x, this.y, this.w, this.w);
    noFill();
    if (this.bomb) {
      if (this.deadBomb) {
        fill(207, 13, 13);
        rect(this.x, this.y, this.w, this.w);
      }
      stroke(232, 205, 109);
      bezier(this.xcent, this.ycent, this.xcent, this.ycent - this.w/0.9, this.xcent + this.w/2, this.ycent + this.w/3, this.xcent + this.w/2.7, this.ycent - this.w/2.8);
      fill(212, 40, 40);
      ellipse(this.xcent + this.w/2.7, this.ycent - this.w/2.8, this.w/20);
      stroke(0);
      fill(79, 79, 79);
      rect(this.xcent - this.w/12 , this.ycent - this.w/3, this.w/6, this.w/6);
      ellipse(this.xcent, this.ycent, this.w/2);
    }else {
      if (this.neighbors > 0) {
        textSize(this.w/2);
        textAlign(CENTER);
        var colorNumber = [];
        colorNumber[1] = [48, 49, 153];
        colorNumber[2] = [48, 203, 23];
        colorNumber[3] = [194, 16, 11];
        colorNumber[4] = [36, 78, 128];
        colorNumber[5] = [136, 27, 73];
        colorNumber[6] = [39, 143, 121];
        colorNumber[7] = [94, 17, 148];
        colorNumber[8] = [114, 116, 113];
        fill(colorNumber[this.neighbors]);
        text(this.neighbors ,this.xcent,this.ycent);
      }
    }
  }else {
    if (this.flaged) {
      line(this.x + this.w * 0.4 , this.y + this.w * 0.9, this.x + this.w * 0.4 , this.y + this.w * 0.1);
      fill(231, 0, 0);
      triangle(this.x + this.w * 0.4 , this.y + this.w * 0.5, this.x + this.w * 0.4 , this.y + this.w * 0.1, this.x + this.w * 0.8 , this.y + this.w * 0.3);
    }else {
      noFill();
      rect(this.x, this.y, this.w, this.w);
    }
  }

};
Cell.prototype.flagCell = function () {
  this.flaged = !this.flaged;
};
Cell.prototype.getNeighbors = function () {

  var total = 0;

  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
        newX = this.i + i;
        newY = this.j + j;
        if (newX > -1 && newX < rows && newY > -1 && newY < cols) {
          if (table[newX][newY].bomb) {
            total++;
          }
        }
    }
  }
this.neighbors = total;
};

Cell.prototype.reveal = function () {
  this.open = true;
  if (this.neighbors == 0 && !this.bomb) {
    this.openNeighbors();
  }
};

Cell.prototype.openNeighbors = function () {
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
        newX = this.i + i;
        newY = this.j + j;
        if (newX > -1 && newX < rows && newY > -1 && newY < cols) {
          if (!table[newX][newY].open && !table[newX][newY].bomb ) {
            table[newX][newY].reveal();
          }
        }
    }
  }
};
