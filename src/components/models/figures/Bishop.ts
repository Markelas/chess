import {Figure, FigureNames} from "./Figures";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../../assets/black-bishop.png"
import whiteLogo from "../../../assets/white-bishop.png"

//Создаем классы для каждой фигуры
export class Bishop extends Figure {


    constructor(color: Colors, cell: Cell) {
        // super это вызов родительского класса Figure
        super(color, cell);
        // Проверяем, какой цвет и в зависимости от этого выбираем логотип
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP
    }

    canMove(target: Cell): boolean {
        //В дочернем классе описываем условия только для конкретной фигуры
        if(!super.canMove(target))
            return false;
        return true;
    }
}
