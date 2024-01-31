import React, {FC, useEffect, useState} from 'react';
import {Board} from "./models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "./models/Cell";
import {Player} from "./models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    // Создаём состояние, выбрана ли ячейка и по умолчанию будет либо определенная ячейка, либо null
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            //Когда ход сделан, вызываем функцию для переключения игрока
            swapPlayer()
            setSelectedCell(null);
        } else {
            //Делаем проверку, на то, какой пользователь делает ход, чтобы можно было нажимать на свои фигуры
            if(cell.figure?.color === currentPlayer?.color) {
                //Если ячейка содержит фигру, то в таком случае подсвечиваем ячейку, изменяя состояние selectedCell в useState
                setSelectedCell(cell);
            }
        }
    }

    useEffect(()=>{
        //На любое изменение ячейки будем вызывать функцию
        higtlightCells()
    }, [selectedCell])

    function higtlightCells() {
        //Подсвечиваем ячейки, которые доступны
        board.higtlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        // Так как при изменении состоянии ячеек, доска не будет изменяться
        // Мы будем создавать новую доску - копию с изменениями
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    // В selected определяем, если ячейка, на которой фигура совпадает с выбранной по x и y, то можем ее выбрать и передать пропс
    return (
        <div>
            <h3>Текущий игрок {currentPlayer?.color}</h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;
