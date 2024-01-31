import {Figure, FigureNames} from "./Figures";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../../assets/black-knight.png";
import whiteLogo from "../../../assets/white-knight.png";

//Создаем классы для каждой фигуры
export class Knight extends Figure {

    constructor(color: Colors, cell: Cell) {
        // super это вызов родительского класса Figure
        super(color, cell);
        // Проверяем, какой цвет и в зависимости от этого выбираем логотип
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT
    }

    canMove(target: Cell): boolean {

        // Для коня могут быть ячйки например
        //    3.2     5.2
        //  2.3         6.3
        //        4.4(конь)
        //  2.5         6.5
        //    3.6      5.6
        if(!super.canMove(target))
            return false;
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
    }
}
