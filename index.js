const Player = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };

  const setBoard = (index, mark) => {
    board[index] = mark;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setBoard, resetBoard, getBoard };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let turn = playerX;
  let isOver = false;

  const playRound = (e) => {
    const index = e.target.dataset.index;

    if (isOver || gameBoard.getBoard()[index] != "") {
      return;
    } else {
      gameBoard.setBoard(index, turn.getMarker());
      displayController.renderBoard();
      if (checkWin()) {
        displayController.setWinnerText(turn.getMarker());
        gameOver();
      } else {
        if (checkDraw()) {
          displayController.setWinnerText('draw');
        }
        nextTurn();
        displayController.setTurnText(turn.getMarker());
      }
    }
  };

  const checkWin = () => {
    let returnValue = false;
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameBoard.getBoard()[a] != "" &&
        gameBoard.getBoard()[a] === gameBoard.getBoard()[b] &&
        gameBoard.getBoard()[a] === gameBoard.getBoard()[c]
      ) {
        returnValue = true;
        break;
      }
    }
    return returnValue;
  };

  const checkDraw = () => {
    if (!gameBoard.getBoard().includes('')) return true;
    else return false;
  }

  const nextTurn = () => {
    turn = turn === playerX ? playerO : playerX;
  };

  const gameOver = () => {
    isOver = true;
  };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { playRound };
})();

const displayController = (() => {
  const restartBtn = document.querySelector("#restart-btn");
  const winnerText = document.querySelector("#winner-text");
  const turnText = document.querySelector("#turn-text");
  const squares = [
    ...document.querySelector("#gameboard").getElementsByTagName("div"),
  ];

  squares.forEach((square) => {
    square.addEventListener("click", (e) => {
      gameController.playRound(e);
    });
  });

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  const setWinnerText = (player) => {
    if (player == 'draw') {
      winnerText.textContent = 'Draw';
    } else {
      winnerText.textContent = `Player ${player} has won!`;
    }

  };

  const setTurnText = (player) => {
    turnText.textContent = `Player ${player}'s turn`;
  };

  const renderBoard = () => {
    for (let i = 0; i < gameBoard.getBoard().length; i++) {
      squares[i].textContent = gameBoard.getBoard()[i];
    }
  };

  return { renderBoard, setWinnerText, setTurnText };
})();
