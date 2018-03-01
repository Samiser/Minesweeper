var grid;
var cols = 30;
var rows = 16;
var w = 30;

var score = 0;
var totalBees = 60;

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}


function setup() {
	cols = 30;
	rows = 16;
	createCanvas(w*cols+1, w*rows+1)
	canvas.style = "position:absolute; width: 90%; margin-left: 5%; margin-top: 20%;";
	grid = make2DArray(cols, rows);
	strokeWeight(2);
	
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}
	
	var options = [];
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			options.push([i, j]);
		}
	}
	
	for (var n = 0; n < totalBees; n++) {
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		options.splice(index, 1);
		grid[i][j].bee = true;
	}
	
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].countNeighbors();
		}
	}
}

function gameOver() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].revealed = true;
		}
	}
}

function mousePressed() {
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if (mouseButton == LEFT) {
					grid[i][j].reveal();
					if (grid[i][j].bee) {
						gameOver();
					}
				} else if (mouseButton == RIGHT) {
					grid[i][j].flag();
					if (score == totalBees) {
						gameWon();
					}
				}
			}
		}
	}
}

function draw() {
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
}