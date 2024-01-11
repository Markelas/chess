import {Cell} from "./Cell";
import {Colors} from "./Colors";

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
}
