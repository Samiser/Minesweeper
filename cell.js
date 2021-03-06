function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neighborCount = 0;
	
	this.image = loadImage('Assets/Minesweeper.png');
	
	this.bee = false;
	this.revealed = false;
	this.flagged = false;
}

Cell.prototype.show = function() {
	stroke(0);
	noFill();
	rect(this.x, this.y, this.w, this.w);
	if (this.revealed) {
		if (this.bee) {
			image(this.image, this.x, this.y, this.w, this.w, 600, 0, 300, 300);
		} else {
			fill(180);
			rect(this.x, this.y, this.w, this.w);
			if (this.neighborCount != 0) {
				if (this.neighborCount == 1) {
					fill(0, 0, 255);
				} else if (this.neighborCount == 2) {
					fill(0, 255, 0);
				} else if (this.neighborCount == 3) {
					fill(255, 0, 0); 
				} else if (this.neighborCount == 4) {
					fill(0, 0, 200);
				}
				textSize(w/1.5);
				textStyle(BOLD);
				textAlign(CENTER);
				noStroke();
				text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - this.w/4);
			}
		}
	} else if (this.flagged) {
		image(this.image, this.x, this.y, this.w, this.w, 300, 0, 300, 300);
	} else {
		image(this.image, this.x, this.y, this.w, this.w, 0, 0, 300, 300);
	}
}

Cell.prototype.countNeighbors = function() {
	if (this.bee) {
		this.neighborCount = -1;
		return;
	}
	var total = 0;
	
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbor = grid[i][j];
				if (neighbor.bee) {
					total++
				}
			}
		}		
	}
	this.neighborCount = total;
}

Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
	if (!this.flagged) {
		this.revealed = true;
		if (this.neighborCount == 0) {
			this.floodFill();
		}
	}
}

Cell.prototype.flag = function() {
	if (!this.flagged && this.bee) {
		score++;
	} else if (this.flagged && this.bee) {
		score--
	}
	this.flagged = !this.flagged;
}

Cell.prototype.floodFill = function() {
	for (var xoff = -1; xoff <= 1; xoff++) {
		for (var yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbor = grid[i][j];
				if (!neighbor.bee && !neighbor.revealed) {
					neighbor.reveal();
				}
			}
		}		
	}
}