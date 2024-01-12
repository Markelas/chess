import {Figure, FigureNames} from "./Figures";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../../assets/black-king.png";
import whiteLogo from "../../../assets/white-king.png";

//Создаем классы для каждой фигуры
export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        // super это вызов родительского класса Figure
        super(color, cell);
        // Проверяем, какой цвет и в зависимости от этого выбираем логотип
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING
    }
}
