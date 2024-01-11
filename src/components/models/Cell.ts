import {Colors} from "./Colors";
import {Figures} from "./figures/Figures";
import {Board} from "./Board";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    // x, y и цвет на доске изменить нельзя

    figure: Figures | null;
    // А местоположение фигуры можно

    board: Board;
    // Доска знает о ячейках на ней

    avaliable: boolean; //Можно ли переместиться
    id: number; // Для react ключей

    //С помощью конструктора формируем
    constructor(board: Board, x:number, y: number, color: Colors, figure: Figures | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.avaliable = false;
        this.id = Math.random()
    }
}
