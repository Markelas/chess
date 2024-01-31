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
        //Объявили условия, которые справедливы для всех фигур, что мы подсвечиваем только вражеские фигуры, чтобы съесть
        if(target.figure?.color === this.color )
            return false
        //Короля нельзя съесть, поэтому он не подсвечивается
        if(target.figure?.name === FigureNames.KING)
            return false
        return true;
    }

    moveFigure(target: Cell) {

    }
}
