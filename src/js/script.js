const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
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

const resizeCanvas = () => {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	const gameBoardSize = Math.min(windowWidth, windowHeight, 500);
	gameBoard.width = gameBoardSize;
	gameBoard.height = gameBoardSize;

	let tileSize = gameBoardSize / 8;

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

			const drawPiece = (pieceName) => {
				const img = new Image();
				img.src = `./dist/img/${pieceName}.png`;

				img.onload = () => {
					ctx.drawImage(img, i, k, tileSize, tileSize);
				};
			};

			const piece = board[j][l];

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

			if (piece in pieceNames) drawPiece(pieceNames[piece]);

			ctx.fillRect(i, k, tileSize, tileSize);
		}
	}
};

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
