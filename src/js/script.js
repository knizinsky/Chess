const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
let tileSize;
const brownColor = "#653c10";
const whiteColor = "#dfc795";
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

const resizeCanvas = () => {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	const gameBoardSize = Math.min(windowWidth, windowHeight, 600);
	gameBoard.width = gameBoardSize;
	gameBoard.height = gameBoardSize;

	tileSize = gameBoardSize / 8;

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

			function drawPiece(pieceName) {
				const img = new Image();
				img.src = `./dist/img/${pieceName}.png`;

				img.onload = () => {
					ctx.drawImage(img, i, k, tileSize, tileSize);
				};
			}

			const piece = board[j][l];

			if (piece in pieceNames) drawPiece(pieceNames[piece]);

			// const movePiece = () => {
			// 	console.log(pieceNames[piece]);
			// };

			// movePiece();

			ctx.fillRect(i, k, tileSize, tileSize);
		}
	}
};

const getCursorPosition = (event) => {
	let x = event.offsetX;
	let y = event.offsetY;

	const clickedRow = Math.floor(y / tileSize);
	const clickedCol = Math.floor(x / tileSize);

	const CR = Math.floor(y / tileSize);
	const CC = Math.floor(x / tileSize);

    let piece;

	if (board[clickedCol][clickedRow] == "p") {
		board.forEach((clickedRow, i) => {
			clickedRow.forEach((clickedCol, j) => {
				if (clickedCol == "p" && CR == j && CC == i) {
					console.log(CR, CC);

					gameBoard.addEventListener("click", (event) => {
						let x = event.offsetX;
						let y = event.offsetY;

						const clickedRow2 = Math.floor(y / tileSize);
						const clickedCol2 = Math.floor(x / tileSize);

						if (board[clickedCol2][clickedRow2] == "") {
                            board[clickedCol2][clickedRow2] = "p";

                            piece = board[clickedCol2][clickedRow2];
                            
                            const drawNewPiece = () => {
                                const img = new Image();
                                img.src = `./dist/img/${pieceNames[piece]}.png`;
    
                                img.onload = () => {
                                    ctx.drawImage(img, clickedCol2 * tileSize, clickedRow2 * tileSize, tileSize, tileSize);
                                };
                            };
    
                            drawNewPiece();
                        }
						
                        // TU NARYSUJ PIONKA

						console.log(clickedRow2, clickedCol2);
						console.log(board[clickedCol2][clickedRow2]);
					});
				}
			});
		});
	}
};

gameBoard.addEventListener("click", getCursorPosition);

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
