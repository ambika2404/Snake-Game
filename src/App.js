import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [snake, setSnake] = useState([
    { row: 7, col: 7 },
    { row: 8, col: 7 },
  ]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("left");

  function renderBoard() {
    let board = [];
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        let className = "cell";

        // snake Food
        let isFood = food.x === row && food.y === col;
        if (isFood) {
          className = "food";
        }

        // snake
        let isSnake = snake.some((sna) => sna.row === row && sna.col === col);
        if (isSnake) {
          className = "snake";
        }

        // snake Head
        let isSnakeHead = snake[0].row === row && snake[0].col === col;
        if (isSnakeHead) {
          className = "snakeHead";
        }
        board.push(<div className={className} key={`${row}_${col}`}></div>);
      }
    }
    // console.log(board);
    return board;
  }

  function updateGame() {
    let newSnake = [...snake];
    switch (direction) {
      case "left":
        newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col - 1 });
        break;
      case "right":
        newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col + 1 });
        break;
      case "up":
        newSnake.unshift({ row: newSnake[0].row - 1, col: newSnake[0].col });
        break;
      case "down":
        newSnake.unshift({ row: newSnake[0].row + 1, col: newSnake[0].col });
        break;
    }
    newSnake.pop();
    setSnake(newSnake);
  }

  // useEffect(() => {
  //   let interval = setInterval(updateGame, 2000);
  //   return () => clearInterval(interval, updateGame);
  // });

  function getRandomPosition() {
    const row = Math.floor(Math.random() * 15);
    const col = Math.floor(Math.random() * 15);
    return { row, col };
  }
  console.log(getRandomPosition());
  return (
    <div className="App">
      <div className="score">
        Score: <span>30</span>
      </div>
      <div className="board">{renderBoard()}</div>
    </div>
  );
}

export default App;
