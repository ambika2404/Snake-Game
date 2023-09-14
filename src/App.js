import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const initialSnakePosition = [
    { row: 7, col: 7 },
    { row: 8, col: 7 },
  ];

  const [snake, setSnake] = useState(initialSnakePosition);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("Left");
  const [score, setScore] = useState(0);

  // BOARD

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

  // SNAKE DIRECTION

  function updateGame() {
    let newSnake = [...snake];
    switch (direction) {
      case "Left":
        newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col - 1 });
        break;
      case "Right":
        newSnake.unshift({ row: newSnake[0].row, col: newSnake[0].col + 1 });
        break;
      case "Up":
        newSnake.unshift({ row: newSnake[0].row - 1, col: newSnake[0].col });
        break;
      case "Down":
        newSnake.unshift({ row: newSnake[0].row + 1, col: newSnake[0].col });
        break;
    }
    if (gameOver(newSnake[0])) return;

    let isAteFood = snake[0].row === food.x && snake[0].col === food.y;
    if (isAteFood) {
      setScore((prev) => prev + 1);
      getRandomPosition();
    } else {
      newSnake.pop();
    }
    console.log(newSnake);
    setSnake(newSnake);
  }

  function updateDirection(e) {
    let code = e.code;
    switch (code) {
      case "ArrowUp":
        if (direction !== "Down") setDirection("Up");
        break;
      case "ArrowDown":
        console.log(direction);
        if (direction !== "Up") setDirection("Down");
        break;
      case "ArrowRight":
        if (direction !== "Left") setDirection("Right");
        break;
      case "ArrowLeft":
        if (direction !== "Right") setDirection("Left");
        break;
    }
  }

  useEffect(() => {
    let interval = setInterval(updateGame, 300);
    return () => clearInterval(interval, updateGame);
  });

  useEffect(() => {
    document.addEventListener("keydown", updateDirection);
    return () => document.removeEventListener("keydown", updateDirection);
  });

  function getRandomPosition() {
    const row = Math.floor(Math.random() * 15);
    const col = Math.floor(Math.random() * 15);
    setFood({ x: row, y: col });
  }

  function resetGame() {
    setSnake(initialSnakePosition);
    setFood({ x: 5, y: 5 });
    setDirection("Left");
    setScore(0);
  }

  function gameOver(headCord) {
    if (
      headCord.col < 0 ||
      headCord.col > 14 ||
      headCord.row < 0 ||
      headCord.row > 14 ||
      snake.some(
        (cord) => cord.row === headCord.row && cord.col === headCord.col
      )
    ) {
      alert(`GAME OVER!!, Your score is ${score}`);
      resetGame();
      return true;
    }
    return false;
  }

  return (
    <div className="App">
      <div className="score">
        Score: <span>{score}</span>
      </div>
      <div className="board">{renderBoard()}</div>
    </div>
  );
}

export default App;
