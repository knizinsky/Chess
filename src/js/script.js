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
};

const movePiece = (selectedPiece, CR, CC) => {
	let movedPiece;

	const whichPiece = (pieceID) => {
		if (selectedPiece == pieceID) {
			board.forEach((clickedRow, i) => {
				clickedRow.forEach((clickedCol, j) => {
					if (clickedCol == pieceID && CR == j && CC == i) {
						const makeMove = (event) => {
							let x = event.offsetX;
							let y = event.offsetY;

							const clickedRowTarget = Math.floor(y / tileSize);
							const clickedColTarget = Math.floor(x / tileSize);

							const drawPieceOnTarget = () => {
								// if (board[clickedColTarget][clickedRowTarget] == "" || whitePiece == true || whitePiece == false) {
									board[clickedColTarget][clickedRowTarget] = clickedCol;

									movedPiece = board[clickedColTarget][clickedRowTarget];
	
									drawPiece(
										pieceNames[movedPiece],
										clickedColTarget * tileSize,
										clickedRowTarget * tileSize
									);

									board[CC][CR] = "";
	
									drawBoardAndPieces(gameBoardSize);
									
									whitesMove = !whitesMove;
								// }
							}

							const checkRules = () => {
								
								console.log(clickedCol, clickedRowTarget, CC, CR, i, j);

								// Pawns
								if(pieceID == "P"){
									if(CR == 6 && (clickedRowTarget == CR-1 || clickedRowTarget ==CR-2) && CC == clickedColTarget){
										drawPieceOnTarget();
									}else if(clickedRowTarget == CR-1 && CC == clickedColTarget){
										drawPieceOnTarget();
									}else if((CC == (clickedColTarget+1) || CC == (clickedColTarget-1)) && (board[clickedColTarget][clickedRowTarget] != "") && clickedRowTarget < CR){
										drawPieceOnTarget();
									}else{
										gameBoard.removeEventListener("click", makeMove);
									}
								}else if(pieceID == "p"){
									if(CR == 1 && (clickedRowTarget == CR+1 || clickedRowTarget ==CR+2) && CC == clickedColTarget){
										drawPieceOnTarget();
									}else if(clickedRowTarget == CR+1 && CC == clickedColTarget){
										drawPieceOnTarget();
									}else if((CC == (clickedColTarget+1) || CC == (clickedColTarget-1)) && board[clickedColTarget][clickedRowTarget] != ""){
										drawPieceOnTarget();
									}
								}
							}

							gameBoard.removeEventListener("click", makeMove);
							checkRules()
						};
						gameBoard.addEventListener("click", makeMove);
					}
				});
			});
		}
	};

	let whitePiece;

	if (whitesMove) {
		for (let pieceID in whitePiecesID) {
			if (pieceID == selectedPiece) {
				whitePiece = true;
				whichPiece(pieceID);
			}
		}
	} else {
		for (let pieceID in blackPiecesID) {
			if (pieceID == selectedPiece) {
				whitePiece = false;
				whichPiece(pieceID);
			}
		}
	}
};

window.addEventListener("resize", resizeCanvas);

window.addEventListener("load", () => {
	gameBoard.addEventListener("click", selectPiece);
	resizeCanvas();
});
