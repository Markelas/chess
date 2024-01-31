import {Figure, FigureNames} from "./Figures";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../../assets/black-rook.png";
import whiteLogo from "../../../assets/white-rook.png";

//Создаем классы для каждой фигуры
export class Rook extends Figure {

    constructor(color: Colors, cell: Cell) {
        // super это вызов родительского класса Figure
        super(color, cell);
        // Проверяем, какой цвет и в зависимости от этого выбираем логотип
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK
    }

    canMove(target: Cell): boolean {
        //В дочернем классе описываем условия только для конкретной фигуры
        if(!super.canMove(target))
            return false;
        if(this.cell.isEmptyVertical(target))
            return true
        if(this.cell.isEmptyHorisontal(target))
            return true
        return false;
    }
}
