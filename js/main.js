class Create {
    static newSign(player, cell, board) {
        const newSpan = document.createElement("span");
        newSpan.className = player;
        cell.appendChild(newSpan);
        const id = cell.id;
        board[id] = player;
    }
}

class Player {
    constructor() {
        this.player = "X"
    }
    change() {
        if (this.player === "X") {
            this.player = "O"
        } else if (this.player === "O") this.player = "X"
    }
}

// 0 1 2
// 3 4 5
// 6 7 8


class Result {
    constructor(player) {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.player = player;
        this.completed = 0
        this.finishedGame = false
        this.combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.winCombo = "";

    }
    checkWin() {
        for (let i = 0; i <= 7; i++) {
            let a = this.board[this.combos[i][0]];
            let b = this.board[this.combos[i][1]];
            let c = this.board[this.combos[i][2]];
            if (a === "" || b === "" || c === "") continue;
            if (a === b && b === c) {
                this.winCombo = this.combos[i]
                if (a === "X" && b === "X" && c === "X") {
                    this.finishedGame = true;
                    return "X"

                } else if (a === "O" && b === "O" && c === "O") {
                    this.finishedGame = true;
                    return "O"
                }
            }
        }
        if (this.completed === 9) {
            this.finishedGame = true;
        }
    }

    ending(winCombo, cells) {
        winCombo = this.winCombo;
        if (winCombo) {
            setTimeout(function () {
                const wins1 = cells[winCombo[0]];
                const wins2 = cells[winCombo[1]];
                const wins3 = cells[winCombo[2]];
                cells.forEach(cell => {
                    if (cell.hasChildNodes() === true && cell.firstChild !== wins1.firstChild && cell.firstChild !== wins2.firstChild && cell.firstChild !== wins3.firstChild) {
                        cell.firstChild.style.opacity = 0.3;
                    }
                    if (cell.hasChildNodes() && cell === wins1 || cell.hasChildNodes() && cell === wins2 || cell.hasChildNodes() && cell === wins3) {
                        console.log(cell);
                        cell.style.backgroundColor = "#444"

                    }
                })
            }, 500)
        }
    }
}

class Stats {
    constructor() {
        this.scores = {
            x: 0,
            o: 0
        }
        this.winner = ""
    }
    updatePlayer(player, span) {
        span = document.querySelector(".game__actual-player");
        span.textContent = player;
        if (player === "X") {
            span.style.color = "rgb(77, 219, 153)";
        } else if (player === "O") {
            span.style.color = "rgb(38, 126, 241)";
        }
    }

    updateScores(h2, xSpan, oSpan, completed) {
        if (this.winner === "X") {
            this.scores.x++;
            xSpan.textContent = this.scores.x
            h2.innerHTML = `Wygrana gracza <span style="color: rgb(77, 219, 153)">X</span>!`;
        } else if (this.winner === "O") {
            this.scores.o++;
            oSpan.textContent = this.scores.o;
            h2.innerHTML = `Wygrana gracza <span style="color: rgb(38, 126, 241)">O</span>!`;
        } else if (completed === 9) {
            h2.innerHTML = `Remis!`;
        }
    }
}

class Game {
    constructor() {
        this.h2 = document.querySelector("h2");
        this.h2resetContent = this.h2.innerHTML;
        this.playerSpan = document.querySelector(".game__actual-player");
        this.cells = [...document.querySelectorAll(".table__cell")];
        this.scoreX = document.querySelector(".scores__score-X");
        this.scoreO = document.querySelector(".scores__score-O");
        this.btnReset = document.querySelector(".button--reset")
        this.player = new Player()
        this.result = new Result(this.player.player);
        this.stats = new Stats();
        this.startGame();
        this.reset();

    }
    startGame() {
        this.cells.forEach(cell => {
            cell.addEventListener("click", () => {
                if (!this.result.finishedGame) {
                    if (!cell.hasChildNodes()) {
                        this.result.completed++;
                        Create.newSign(this.player.player, cell, this.result.board);
                        this.player.change();
                        this.stats.updatePlayer(this.player.player, this.playerSpan);
                        this.stats.winner = this.result.checkWin();
                        this.stats.updateScores(this.h2, this.scoreX, this.scoreO, this.result.completed);
                        this.result.ending(this.result.winCombo, this.cells);
                    } else alert("To pole jest już zajęte!");
                } else return
            })
        })

    }
    reset() {
        this.btnReset.addEventListener("click", () => {
            this.result.finishedGame = false;
            this.result.board = ["", "", "", "", "", "", "", "", ""];
            this.player.player = "X";
            this.stats.winner = ""
            this.result.completed = 0;
            this.result.winCombo = "";
            this.cells.forEach((cell) => {
                cell.innerHTML = "";
                cell.style.backgroundColor = "";
            })
            this.h2.innerHTML = this.h2resetContent;
        })
    }
}


const game = new Game;