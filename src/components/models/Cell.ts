import {Colors} from "./Colors";
import {Figure} from "./figures/Figures";
import {Board} from "./Board";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    // x, y и цвет на доске изменить нельзя

    figure: Figure | null;
    // А местоположение фигуры можно

    board: Board;
    // Доска знает о ячейках на ней

    avaliable: boolean; //Можно ли переместиться
    id: number; // Для react ключей

    //С помощью конструктора формируем
    constructor(board: Board, x:number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.avaliable = false;
        this.id = Math.random()
    }

    isEmpty() {
        return this.figure === null;
    }

    isEmptyVertical(target: Cell) : boolean {
        if(this.x !== target.x) {
            return false;
        }
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            //Если ячейка не пустая, то возвращаем false
            if(!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }
        //И если ячейки все пустые, то возвращаем true
        return true;
    }

    isEmptyHorisontal(target: Cell) : boolean {
        if(this.y !== target.y) {
            return false;
        }
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let x = min + 1; x < max; x++) {
            //Если ячейка не пустая, то возвращаем false
            if(!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }
        //И если ячейки все пустые, то возвращаем true
        return true;
    }

    isEmptyDiagonal(target: Cell) : boolean {
        // Разница между диагональными клетками по x и по y всегда равняется
        // Например
        // 1,1
        // 2,2
        // 3,3
        // Разница по x и по y равны
        // Значит по модулю эта разница одинакова, для вычислений используем abs
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absY !== absX)
            return false;

        //Если координата по y текущей проверки меньше, чем координата точки в которую мы хотим попасть, то присваиваем 1 или -1
        const dy = this.y <target.y ? 1 : -1
        const dx = this.y <target.y ? 1 : -1

        for (let i= 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy * i).isEmpty())
                return false;
        }
        return true;
    }

    //Устанавливаем фигуру, обновляя возможности хода для ячеек
    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    //Функция для движения фигур
    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure?.moveFigure(target)
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}
