const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const brownColor = "#653c10";
const whiteColor = "#dfc795";
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const gameBoardSize = Math.min(windowWidth, windowHeight, 600);
const board = [
	["r", "p", "", "", "", "", "P", "R"],
	["n", "p", "", "", "", "", "P", "N"],
	["b", "p", "", "", "", "", "P", "B"],
	["q", "p", "", "", "", "", "P", "Q"],
	["k", "p", "", "", "", "", "P", "K"],
	["b", "p", "", "", "", "", "P", "B"],
	["n", "p", "", "", "", "", "P", "N"],
	["r", "p", "", "", "", "", "P", "R"],
];

const pieceNames = {
	p: "Bpawn",
	r: "Brook",
	n: "Bknight",
	b: "Bbishop",
	q: "Bqueen",
	k: "Bking",

	P: "Wpawn",
	R: "Wrook",
	N: "Wknight",
	B: "Wbishop",
	Q: "Wqueen",
	K: "Wking",
};

let tileSize = gameBoardSize / 8;
let selectedPiece = null;
let whitesMove = true;

const drawPiece = (pieceName, x, y) => {
	const img = new Image();
	img.src = `./dist/img/${pieceName}.png`;

	img.onload = () => {
		ctx.drawImage(img, x, y, tileSize, tileSize);
	};
};

const drawBoardAndPieces = (gameBoardSize) => {
	for (let i = 0, j = 0; i < gameBoardSize; i += tileSize, j++) {
		for (let k = 0, l = 0; k < gameBoardSize; k += tileSize, l++) {
			if (j % 2 === 0) {
				if (l % 2 === 0) {
					ctx.fillStyle = whiteColor;
				} else {
					ctx.fillStyle = brownColor;
				}
			} else {
				if (l % 2 === 0) {
					ctx.fillStyle = brownColor;
				} else {
					ctx.fillStyle = whiteColor;
				}
			}

			const piece = board[j][l];

			if (piece != "") {
				drawPiece(pieceNames[piece], i, k);
			}

			ctx.fillRect(i, k, tileSize, tileSize);
		}
	}
};

const resizeCanvas = () => {
	gameBoard.width = gameBoardSize;
	gameBoard.height = gameBoardSize;
	drawBoardAndPieces(gameBoardSize);
};

const selectPiece = (event) => {
	let x = event.offsetX;
	let y = event.offsetY;

	const clickedRow = Math.floor(y / tileSize);
	const clickedCol = Math.floor(x / tileSize);

	const CR = Math.floor(y / tileSize);
	const CC = Math.floor(x / tileSize);

	selectedPiece = board[clickedCol][clickedRow];

	movePiece(selectedPiece, CR, CC);
	// console.log(CC, CR, "yolo");
};

const movePiece = (selectedPiece, CR, CC) => {
	let movedPiece;
	const whitePiecesID = {
		P: "Wpawn",
		R: "Wrook",
		N: "Wknight",
		B: "Wbishop",
		Q: "Wqueen",
		K: "Wking",
	};

	const blackPiecesID = {
		p: "Bpawn",
		r: "Brook",
		n: "Bknight",
		b: "Bbishop",
		q: "Bqueen",
		k: "Bking",
	};

	


	const whichPiece = (pieceID) => {
		if (selectedPiece == pieceID) {
			board.forEach((clickedRow, i) => {
				clickedRow.forEach((clickedCol, j) => {
					if (clickedCol == pieceID && CR == j && CC == i) {
						board[CC][CR] = "";
						console.log(board[CC][CR]);

						const makeMove = (event) => {
							drawBoardAndPieces(gameBoardSize);
							let x = event.offsetX;
							let y = event.offsetY;

							const clickedRow2 = Math.floor(y / tileSize);
							const clickedCol2 = Math.floor(x / tileSize);

							
							
							board[CC][CR] = "";

							console.log(board);

							if (board[clickedCol2][clickedRow2] == "") {
								board[clickedCol2][clickedRow2] = clickedCol;

								movedPiece = board[clickedCol2][clickedRow2];

								drawPiece(
									pieceNames[movedPiece],
									clickedCol2 * tileSize,
									clickedRow2 * tileSize
								);
							}

							

							gameBoard.removeEventListener("click", makeMove);
						};

						gameBoard.addEventListener("click", makeMove);
					}
				});
			});
		}
	};


	if (whitesMove) {
		// whiteMoves(pieceName)
		for (let pieceID in whitePiecesID) {
			if(pieceID == selectedPiece){
				whichPiece(pieceID)
				// console.log(pieceID);
			}
		  }

		// whitesMove = false;
	} else {
		for (let pieceID in blackPiecesID) {
			if(pieceID == selectedPiece){
				// whichPiece(pieceID)
				console.log("yolo2");
			}
		  }
		// whitesMove = true;
	}
};

const whosMove = () => {
	if (whitesMove) {
		// whiteMoves(pieceName)
		// whitesMove = false;
	} else {
		// blackMoves(pieceName)
		// whitesMove = true;
	}
};

const whiteMoves = () => {};

const blackMoves = () => {};

window.addEventListener("resize", resizeCanvas);

window.addEventListener("load", () => {
	gameBoard.addEventListener("click", selectPiece);
	resizeCanvas();
});
