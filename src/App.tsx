import React, {useEffect, useState} from 'react';
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./components/models/Board";
import {Colors} from "./components/models/Colors";
import {Player} from "./components/models/Player";

const App = () => {

    const [board, setBoard] = useState(new Board())

    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    //Чтобы при загрузке страницы появлялось поле используем useEffect
    useEffect(() => {
        restart();
        // Первым ходит белые фигуры
        setCurrentPlayer(whitePlayer);
    }, [])

    function restart() {
        // Для очистки поля будем использовать функцию restart
        // Создаем новую доску
        const newBoard = new Board();
        // Обращаемся к классу initCells из Board.ts, где формировали ячейки с помощью циклов
        newBoard.initCells()
        newBoard.addFigures()

        // Изменяем текущий state у board
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className='app'>
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer = {currentPlayer}
            swapPlayer = {swapPlayer}
          />
        </div>
    );
};

export default App;
