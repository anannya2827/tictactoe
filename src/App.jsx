import { useState } from 'react';
import './index.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Arcade-style text status
  let status;
  if (winner) {
    status = `PLAYER ${winner} WINS!`;
  } else if (isDraw) {
    status = "GAME OVER: DRAW";
  } else {
    status = `TURN: PLAYER ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <h1>TIC-TAC-TOE</h1>
      <div className="status">{status}</div>
      
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className={`square ${value ? value : ''}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={resetGame}>
        PLAY AGAIN
      </button>
    </div>
  );
}

export default App;