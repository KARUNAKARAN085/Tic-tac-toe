import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (winner) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 50000);
    }
  }, [winner]);

  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(checkWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setShowConfetti(false);
  };

  return (
    <div className="text-center mt-5 position-relative" style={{ minHeight: "100vh", overflow: "hidden" }}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} 
      <h2 className="mb-4 fw-bold">Tic Tac Toe</h2>
      <div className="board d-flex flex-wrap justify-content-center">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell btn btn-outline-secondary border-2 m-1 fs-3"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <h2 className="mt-4 mb-4">
        {winner ? `🎉 Winner: ${winner}! 🎉` : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>
      <button className="btn btn-danger mt-3" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
