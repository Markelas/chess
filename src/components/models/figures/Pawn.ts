import {Figure, FigureNames} from "./Figures";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../../assets/black-pawn.png";
import whiteLogo from "../../../assets/white-pawn.png";

//Создаем классы для каждой фигуры
export class Pawn extends Figure {

    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        // super это вызов родительского класса Figure
        super(color, cell);
        // Проверяем, какой цвет и в зависимости от этого выбираем логотип
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN
    }

    canMove(target: Cell): boolean {
        //В дочернем классе описываем условия только для конкретной фигуры
        if(!super.canMove(target))
            return false;
        //Если это не 1 шаг, то только на 1 ячейку
        //Можем сходить на -1 ячейку (вверх), если белые и на +1 ячейку вниз, если черные
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        //Если это первый шаг, то мы можем сходить на 2 ячейки вперед
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

        //Условия для хода по вертикали, проверяем, если это 1 ход, то даём 2 ячейки, если второй,
        // то одну, также, что ход только вперед
        if ((target.y === this.cell.y + direction || this.isFirstStep
                && (target.y === this.cell.y + firstStepDirection))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true;
        }

        //Проверяем, что двигаемся по направлению на одну ячейку вперед по диагонали
        // также проверка, есть ли враг, с isEnemy, чтобы срубить
        if(target.y === this.cell.y + direction
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)) {
            return true;
        }

        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}
