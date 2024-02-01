import { useState, useContext, useRef, useEffect } from "react";
import { BoardHookActions, Color, ColorType, IBoard, ICell, IPiece } from "types/interfaces";
import blackPiece from "assets/black-piece.png";
import whitePiece from "assets/white-piece.png";
import { TurnContext } from "components/Game/Game";
import { b } from "types/checker-types";
b.initBoard();
console.log(b);

export const useBoard = (board?: IBoard): BoardHookActions => {
    const [currentBoard, setCurrentBoard] = useState<IBoard>([]);
    const pieceRef = useRef<null | IPiece>(null);
    const setTurn = useContext(TurnContext)!.setTurn;
    const [shouldCheck, setShouldCheck] = useState(false);
    const [fromEat, setFromEat] = useState(false);

    if (!board && !currentBoard.length) {
        const initialMatrix = [];
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const color = (x + y) % 2 ? Color.BLACK : Color.WHITE;
                const canBeWhitePiece = x > 4 && color === Color.BLACK && whitePiece;
                const canBeBlackPiece = x < 3 && color === Color.BLACK && blackPiece;
                let piece;
                if (canBeWhitePiece) {
                    piece = { src: canBeWhitePiece, color: Color.WHITE, x, y };
                }
                if (canBeBlackPiece) {
                    piece = { src: canBeBlackPiece, color: Color.BLACK, x, y };
                }

                initialMatrix.push({ x, y, color, piece, canMove: false });
            }
        }
        setCurrentBoard(initialMatrix);
    }

    function getMoves({ color, src, x, y }: Required<IPiece>) {
        pieceRef.current = { color, x, y, src };

        const eatingPieces = canEat(color);

        if (eatingPieces.some(e => e.length)) {
            setFromEat(true);
            // const { x: pX, y: pY } = pieceRef.current as IPiece;
            // if (eatingPieces.some(combs => combs.some(el => el?.target && el.target.x === pX && el.target.y === pY))) {
            //   console.log("right");
            //   return;
            // }
            setShouldCheck(false);

            setCurrentBoard(m =>
                m.map(cell => {
                    const filteredPossEat = eatingPieces.filter(
                        ([variants]) =>
                            variants?.current?.x === pieceRef.current?.x &&
                            variants?.current?.y === pieceRef.current?.y &&
                            variants?.target?.x === cell.x &&
                            variants?.target.y === cell.y
                    );
                    if (
                        filteredPossEat.some(
                            ([variants]) =>
                                variants?.current?.x === pieceRef.current?.x &&
                                variants?.current?.y === pieceRef.current?.y &&
                                variants?.target?.x === cell.x &&
                                variants?.target.y === cell.y
                        )
                    )
                        return { ...cell, canMove: true };
                    return { ...cell, canMove: false };
                })
            );
            return;
        }
        const dx = color === Color.BLACK ? 1 : -1;
        const toLeft = [x + dx, y - 1];
        const toRight = [x + dx, y + 1];

        setCurrentBoard(m =>
            m.map(cell => {
                if (
                    (cell.x === toLeft[0] && cell.y === toLeft[1] && !cell.piece) ||
                    (cell.x === toRight[0] && cell.y === toRight[1] && !cell.piece)
                )
                    return { ...cell, canMove: true };
                return { ...cell, canMove: false };
            })
        );
    }

    function canEat(color: ColorType) {
        const cellsWithSimilarPiece = currentBoard.filter(cell => cell.piece?.color === color);

        const possibleEatCombinations = cellsWithSimilarPiece.map(checkCanEat);

        function checkCanEat(item: ICell) {
            const neighbors = [
                {
                    neighbor: currentBoard.find(cell => cell.x - 1 === item?.x && cell.y + 1 === item.y),
                    possible: currentBoard.find(cell => cell.x - 2 === item?.x && cell.y + 2 === item.y),
                },
                {
                    neighbor: currentBoard.find(cell => cell.x + 1 === item?.x && cell.y + 1 === item.y),
                    possible: currentBoard.find(cell => cell.x + 2 === item?.x && cell.y + 2 === item.y),
                },
                {
                    neighbor: currentBoard.find(cell => cell.x + 1 === item?.x && cell.y - 1 === item.y),
                    possible: currentBoard.find(cell => cell.x + 2 === item?.x && cell.y - 2 === item.y),
                },
                {
                    neighbor: currentBoard.find(cell => cell.x - 1 === item?.x && cell.y - 1 === item.y),
                    possible: currentBoard.find(cell => cell.x - 2 === item?.x && cell.y - 2 === item.y),
                },
            ];

            const allTargets = [];

            for (const { neighbor, possible } of neighbors) {
                const hasEnemy =
                    !!neighbor && neighbor.piece?.color && neighbor.piece?.color !== pieceRef.current?.color;

                if (hasEnemy && possible && !possible.piece) {
                    allTargets.push({
                        target: possible,
                        current: item.piece,
                    });
                }
            }

            return allTargets;
        }
        return possibleEatCombinations;
    }

    useEffect(() => {
        if (
            pieceRef.current &&
            shouldCheck &&
            fromEat &&
            canEat(pieceRef.current.color).some(
                e => e.length && e[0].current?.x === pieceRef.current?.x && e[0].current?.y === pieceRef.current?.y
            )
        ) {
            console.log(pieceRef.current.color);
            console.log(fromEat);
            getMoves(pieceRef.current);
        } else if (pieceRef.current && shouldCheck) {
            setTurn(pieceRef?.current?.color === Color.BLACK ? Color.WHITE : Color.BLACK);
            setFromEat(false);
            setShouldCheck(false);
        }
    }, [currentBoard]);

    function makeMove({ x, y, canMove }: ICell) {
        if (!pieceRef.current) return;
        const { x: pX, y: pY } = pieceRef.current as IPiece;
        let hasMove = false;

        if (!canMove) return;

        setShouldCheck(true);

        setCurrentBoard(m =>
            m.map(el => {
                if (el.x === (pX + x) / 2 && el.y === (pY + y) / 2) {
                    return { ...el, piece: undefined, canMove: false };
                } else if (el.x === x && el.y === y && canMove) {
                    hasMove = true;
                    pieceRef.current = { ...pieceRef.current, x, y } as typeof pieceRef.current;
                    return { ...el, piece: { ...pieceRef.current!, x: el.x, y: el.y }, canMove: false };
                } else if (pX === el.x && el.y === pY && hasMove) {
                    return { ...el, piece: undefined, canMove: false };
                } else return { ...el, canMove: false };
            })
        );
    }

    return { currentBoard, getMoves, makeMove };
};
