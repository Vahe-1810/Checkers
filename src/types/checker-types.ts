import blackPiece from "assets/black-piece.png";
import whitePiece from "assets/white-piece.png";

type COLOR = "W" | "B";

// class Game {
//     winner: null | COLOR = null;

//     start(): void {}

//     restart(): void {}

//     isDraw(): boolean {
//         return false;
//     }

//     checkWinner(): void {}
// }

// Abstract class for all types of class (each class is figure)
abstract class Figure {
    constructor(public x: number, public y: number, public color: COLOR, public canMove: boolean, public src: string) {}

    showMoves(): void {}

    makeMove(): void {}
}

// Class for all damas on the board
class Dama extends Figure {
    constructor(x: number, y: number, color: COLOR, canMove: boolean, src: string) {
        super(x, y, color, canMove, src);
    }

    showMove(): void {}

    makeMove(): void {}
}

// Class for all pieces on board
class Piece extends Figure {
    constructor(x: number, y: number, color: COLOR, canMove: boolean, src: string) {
        super(x, y, color, canMove, src);
    }

    showMove(): void {}

    makeMove(): void {}
}

// Class for board cell
class Cell {
    x: number;
    y: number;
    color: COLOR;
    isCellDama: boolean;
    figure: Figure | null;

    constructor(x: number, y: number, color: COLOR, isCellDama: boolean, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isCellDama = isCellDama;
        this.figure = figure;
    }
}

class Board {
    board: Cell[][] = [];
    turn: COLOR = "W";

    constructor(board?: Cell[][]) {
        if (board) this.board = board;
        else this.initBoard();
    }

    initBoard() {
        const newBoard: typeof this.board = [];

        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];

            for (let x = 0; x < 8; x++) {
                const color = (x + y) % 2 ? "B" : "W";
                const figure =
                    (y < 3 && color === "B" && new Piece(x, y, "B", false, blackPiece)) ||
                    (y > 4 && color === "B" && new Piece(x, y, "W", false, whitePiece)) ||
                    null;
                const isCellDama = y === 0 || y === 7;

                row.push(new Cell(x, y, color, isCellDama, figure));
            }
            newBoard.push(row);
        }

        this.board = newBoard;
    }

    setTurn = () => (this.turn = this.turn === "W" ? "B" : "W");
}

export const b = new Board();
