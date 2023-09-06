import "./App.css";
import { useState } from "react";
function App() {
  const [snake, setSnake] = useState([
    { row: 7, col: 7 },
    { row: 8, col: 7 },
  ]);
  const [food, setFood] = useState({ x: 5, y: 5 });

  function renderBoard() {
    let board = [];
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        let className = "cell";
        let isFood = food.x === row && food.y === col;
        if (isFood) {
          className = "food";
        }

        let isSnake = snake.some((sna) => sna.row === row && sna.col === col);
        if (isSnake) {
          className = "snake";
        }
        board.push(<div className={className} key={`${row}_${col}`}></div>);
      }
    }
    // console.log(board);
    return board;
  }

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
