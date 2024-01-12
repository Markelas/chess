import {Colors} from "../Colors";
import logo from '../../../assets/black-king.png'
import {Cell} from "../Cell";


//Перечисляем все фигуры
export enum FigureNames {
    FIGURE= "Фигура",
    KING= "Король",
    KNIGHT= "Конь",
    PAWN= "Пешка",
    QUEEN= "Королева",
    ROOK= "Ладья",
    BISHOP= "Слон",
}

// Какие будут в классе использоваться данные
// Сделали зависимость, что фигура знает о ячейке и ячейка знает о фигуре
export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE
        this.id = Math.random()
    }

    canMove(target: Cell) : boolean {
        return true;
    }

    moveFigure(target: Cell) {

    }
}
