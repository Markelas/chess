import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Queen} from "./figures/Queen";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Bishop} from "./figures/Bishop";
import {Rook} from "./figures/Rook";
import {Knight} from "./figures/Knight";

export class Board {
    //Ячейки представляют собой двумерный массив, строки и столбцы
    cells: Cell[][] = []
    //Ячейки знают про доску


    public initCells() {
        //Формируем строки горизонтально из столбцов, которые получились во внутреннем цикле
        for (let i=0; i < 8; i++) {
            const row: Cell[] = []
            //Проходимся по столбцам, создаем 8 столбцов, белый, черный, белый, черный
            //После того, как столбец готов, переходим во внешний цикл
            for (let j =0; j < 8; j++) {
                //Если четные, то черный цвет
                if((i+j) % 2 !==0 ) {
                    //this это доска
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) //Черные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) //Белые ячейки
                }
            }
            //Наполняем массив столбцами
            this.cells.push(row);
        }
    }

    public getCopyBoard() : Board {
        // Копируем доску
        const newBoard = new Board();
        // Передавая в нее ячейки
        newBoard.cells = this.cells;
        return newBoard;
    }

    public higtlightCells(selectedCell: Cell | null) {
        //В цикле будем проходить по всем ячейкам и проверять, можно ли наступить на эту ячейку
        for (let i=0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j=0; j < row.length; j++) {
                // target - потециальная ячейка, на которую можно сходить
                const target = row[j];
                // Вызываем фигуру, на выбранной ячейке и на ней вызываем метод canMove
                // Метод возвращает true, если может сходить, либо false
                target.avaliable = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public getCell(x:number, y:number) {
        //Возвращаем y и x
        return this.cells[y][x]
    }

    private addPawns() {
        //Так как пешек у нас 8 штук, отрисовываем их на доске в цикле
        for (let i=0; i < 8; i++){
            // Черные пешки находятся сверху по y
            new Pawn(Colors.BLACK, this.getCell(i, 1))
            // Белые пешки находятся в предпоследней строке по y
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addKings() {
        //Устанавливаем королей сверху черные и белые снизу
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }
    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
    }
    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))
    }
    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }
    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7))
    }
    public addFigures() {
        this.addPawns()
        this.addKings()
        this.addBishops()
        this.addRooks()
        this.addQueens()
        this.addKnights()
    }
}
