import React, {FC, useState} from 'react';
import {Board} from "./models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "./models/Cell";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

    // Создаём состояние, выбрана ли ячейка и по умолчанию будет либо определенная ячейка, либо null
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        //Если ячейка содержит фигру, то в таком случае подсвечиваем ячейку, изменяя состояние selectedCell в useState
        if (cell.figure) {
            setSelectedCell(cell);
        }
    }

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
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell=>
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
    );
};

export default BoardComponent;
