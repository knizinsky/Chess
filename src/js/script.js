const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");

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
					ctx.fillStyle = "#dfc795";
				} else {
					ctx.fillStyle = "#653c10";
				}
			} else {
				if (l % 2 === 0) {
					ctx.fillStyle = "#653c10";
				} else {
					ctx.fillStyle = "#dfc795";
				}
			}

			ctx.fillRect(i, k, tileSize, tileSize);
		}
	}

	ctx.strokeStyle = "black";
	ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
};

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
