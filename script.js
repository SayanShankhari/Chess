var player, winner;
var clickedCell = null;
var cells;
var board = [], moves = [];

function init() {
	setupElements();
	setupBoard();
	setupListeners();
}

function setupElements() {
	cells = document.getElementsByClassName ("cell");
}

function setupListeners() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener ("click", function (event) {
			cellOnClick (this);
		}, false);
	}
}

function setupBoard() {
	var i, j;
	let colors = ["#CCCCCC", "#888888"];
	var cell, piece;

	for (i = 0; i < 8; i++) {
		board.push ([]);

		for (j = 0; j < 8; j++) {
			cell = document.getElementById ("cell_" + i + "" + j);
			cell.style.background = colors [(i + j) % 2];

			piece = getPieceInCell (cell);
			board [i].push (piece);
		}
	}
}

function cellOnClick (cell) {
	getPossibleMoves (cell);

	for (i = 0; i < moves.length; i++) {
		div = document.getElementById ("cell_" + moves [i].y + "" + moves [i].x);
		div.style.border = "1px solid #00ff00";
	}

	if (clickedCell == null) {
		clickedCell = cell;
		cell.style.border = "1px solid #0000ff";
	} else {
		move (clickedCell, cell);
		clickedCell = null;
		resetCellsBorder();
	}
}

function move (cell0, cell1) {
	getPossibleMoves (cell0);
	var p0 = getCellPosition (cell0);
	var p1 = getCellPosition (cell1);

	var possible = false;

	for (var i = 0; i < moves.length; i++) {
		if (moves [i].x == p1.x && moves [i].y == p1.y) {
			possible = true;
			break;
		}
	}

	if (possible) {
		board [p1.y][p1.x] = board [p0.y][p0.x];
		board [p0.y][p0.x] = null;

		if (cell1.childNodes.length == 1) {
			cell1.removeChild (cell1.childNodes[0]);
		}
		
		cell1.appendChild (cell0.childNodes[0]);
		
		if (cell0.childNodes.length == 1) {
			cell0.removeChild (cell0.childNodes[0]);
		}
	}
}

function getPossibleMoves (cell) {
	moves = [];
	var piece = getPieceInCell (cell);
	var position = getCellPosition (cell);
	var i;
	var result;

	if (piece == null) {
		return;
	} else if (piece.name == "pawn") {
		let enemy_direction = (piece.color == "black") ? +1 : -1;
		result = checkAndAddMove (piece, {"x" : position.x, "y" : position.y + enemy_direction});

		if (position.y == 1 || position.y == 6) {
			result = checkAndAddMove (piece, {"x" : position.x, "y" : position.y + 2 * enemy_direction});
		}
	} else if (piece.name == "rook") {
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x, "y" : position.y - i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x, "y" : position.y + i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x - i, "y" : position.y}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x + i, "y" : position.y}))) {
				break;
			}
		}
	} else if (piece.name == "knight") {
		result = checkAndAddMove (piece, {"x" : position.x - 1, "y" : position.y - 2});
		result = checkAndAddMove (piece, {"x" : position.x - 2, "y" : position.y - 1});
		result = checkAndAddMove (piece, {"x" : position.x - 1, "y" : position.y + 2});
		result = checkAndAddMove (piece, {"x" : position.x - 2, "y" : position.y + 1});
		result = checkAndAddMove (piece, {"x" : position.x + 1, "y" : position.y - 2});
		result = checkAndAddMove (piece, {"x" : position.x + 2, "y" : position.y - 1});
		result = checkAndAddMove (piece, {"x" : position.x + 1, "y" : position.y + 2});
		result = checkAndAddMove (piece, {"x" : position.x + 2, "y" : position.y + 1});
	} else if (piece.name == "bishop") {
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x - i, "y" : position.y - i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x - i, "y" : position.y + i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x + i, "y" : position.y - i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x + i, "y" : position.y + i}))) {
				break;
			}
		}
	} else if (piece.name == "queen") {
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x - i, "y" : position.y - i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x - i, "y" : position.y}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x - i, "y" : position.y + i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x, "y" : position.y - i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x, "y" : position.y + i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x + i, "y" : position.y - i}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x + i, "y" : position.y}))) {
				break;
			}
		}
		for (i = 1; i < 8; i++) { // left
			if (!(checkAndAddMove (piece, {"x" : position.x + i, "y" : position.y + i}))) {
				break;
			}
		}
	} else if (piece.name == "king") {
		result = checkAndAddMove (piece, {"x" : position.x - 1, "y" : position.y - 1});
		result = checkAndAddMove (piece, {"x" : position.x - 1, "y" : position.y});
		result = checkAndAddMove (piece, {"x" : position.x - 1, "y" : position.y + 1});
		result = checkAndAddMove (piece, {"x" : position.x, "y" : position.y - 1});
		result = checkAndAddMove (piece, {"x" : position.x, "y" : position.y + 1});
		result = checkAndAddMove (piece, {"x" : position.x + 1, "y" : position.y - 1});
		result = checkAndAddMove (piece, {"x" : position.x + 1, "y" : position.y});
		result = checkAndAddMove (piece, {"x" : position.x + 1, "y" : position.y + 1});
	}
}

function getPieceInCell (cell) {
	if (cell.childNodes.length == 0) {
		return null;
	}

	var piece = "";
	var c;
	var path = cell.childNodes[0].src;

	for (i = path.length - 1; i >= 0; i--) {
		c = path.charAt (i);

		if (c == '/' || c == '\\') {
			break;
		} else {
			piece = c + piece;
		}
	}

	piece = piece.substring (0, piece.length - 4);

	piece = {
		"color" : piece.substr (0, 5),
		"name" : piece.substr (6, piece.length)		
	};

	return piece;
}

function resetCellsBorder() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].style.border = "";
	}
}

function getCellPosition (cell) {
	return {
		"x" : parseInt (cell.id.substr (6, 1)),	// x means column
		"y" : parseInt (cell.id.substr (5, 1))	// y means row
	};
}

function checkAndAddMove (piece, position) {
	var result = false;

	if (position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7) {
		return result;
	}

	if (
		(
			board [position.y][position.x] != null
			&& board [position.y][position.x].color != piece.color
		)
		|| (board [position.y][position.x] == null)
	) {
		moves.push ({"x" : position.x, "y" : position.y});
		result = true;
	}

	return result;
}