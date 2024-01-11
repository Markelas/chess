import React, {useEffect, useState} from 'react';
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./components/models/Board";

const App = () => {

    const [board, setBoard] = useState(new Board())

    //Чтобы при загрузке страницы появлялось поле используем useEffect
    useEffect(() => {
        restart()
    }, [])

    function restart() {
        // Для очистки поля будем использовать функцию restart
        // Создаем новую доску
        const newBoard = new Board();
        // Обращаемся к классу initCells из Board.ts, где формировали ячейки с помощью циклов
        newBoard.initCells()
        // Изменяем текущий state у board
        setBoard(newBoard)
    }

    return (
        <div className='app'>
          <BoardComponent
            board={board}
            setBoard={setBoard}
          />
        </div>
    );
};

export default App;
