function Gameboard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell());
        }
    }
    }

    resetBoard()

    const getBoard = () => board;
    
    const placeMark = (row, column, player) => {
        if(board[row][column].getValue() !== 0){
          return false;
        }
        else {
        board[row][column].addMark(player);
        }
    } 

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      };

    return { getBoard, placeMark, resetBoard, printBoard };
}

function Cell() {
    let value = 0;
  
    const addMark = (player) => {
      value = player;
    };
  
    const getValue = () => value;
  
    return { addMark, getValue };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
    ) {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        mark: 1,
        points: 0
      },
      {
        name: playerTwoName,
        mark: 2,
        points: 0
      }
    ];
  
    const getPlayers = () => players;
    const changeName = (i, newName) => {
      players[i].name = newName
    }

    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };
  
    const playRound = (column, row) => {

      if(board.placeMark(row, column, getActivePlayer().mark)==false){
        alert(`You can't place a mark here, try another space`)
        return
      }

      else{
        board.placeMark(row, column, getActivePlayer().mark);

        if(board.getBoard()[0][0].getValue()== getActivePlayer().mark && board.getBoard()[0][1].getValue()== getActivePlayer().mark && board.getBoard()[0][2].getValue()== getActivePlayer().mark||
        board.getBoard()[1][0].getValue()== getActivePlayer().mark && board.getBoard()[1][1].getValue()== getActivePlayer().mark && board.getBoard()[1][2].getValue()== getActivePlayer().mark||
        board.getBoard()[2][0].getValue()== getActivePlayer().mark && board.getBoard()[2][1].getValue()== getActivePlayer().mark && board.getBoard()[2][2].getValue()== getActivePlayer().mark||
        board.getBoard()[0][0].getValue()== getActivePlayer().mark && board.getBoard()[1][0].getValue()== getActivePlayer().mark && board.getBoard()[2][0].getValue()== getActivePlayer().mark||
        board.getBoard()[0][1].getValue()== getActivePlayer().mark && board.getBoard()[1][1].getValue()== getActivePlayer().mark && board.getBoard()[2][1].getValue()== getActivePlayer().mark||
        board.getBoard()[0][2].getValue()== getActivePlayer().mark && board.getBoard()[1][2].getValue()== getActivePlayer().mark && board.getBoard()[2][2].getValue()== getActivePlayer().mark||
        board.getBoard()[0][0].getValue()== getActivePlayer().mark && board.getBoard()[1][1].getValue()== getActivePlayer().mark && board.getBoard()[2][2].getValue()== getActivePlayer().mark||
        board.getBoard()[0][2].getValue()== getActivePlayer().mark && board.getBoard()[1][1].getValue()== getActivePlayer().mark && board.getBoard()[2][0].getValue()== getActivePlayer().mark
        ){
          getActivePlayer().points++
          board.printBoard()
          alert(`${getActivePlayer().name} wins!`)
          alert(`Starting new game.`)
          board.resetBoard()
        }

        else if(board.getBoard()[0][0].getValue() !== 0 && board.getBoard()[0][1].getValue() !== 0 && board.getBoard()[0][2].getValue() !== 0 &&
        board.getBoard()[1][0].getValue()!== 0 && board.getBoard()[1][1].getValue()!== 0 && board.getBoard()[1][2].getValue()!== 0 && 
        board.getBoard()[2][0].getValue()!== 0 && board.getBoard()[2][1].getValue()!== 0 && board.getBoard()[2][2].getValue()!== 0  
        ){
          board.printBoard()
          alert(`It's a tie!`)
          alert(`Starting new game.`)
          board.resetBoard()
        }

        else {      
          switchPlayerTurn();
          printNewRound();
        }
      }
    };
  
    printNewRound();
  
    return {
      playRound,
      getActivePlayer,
      getPlayers,
      changeName,
      getBoard: board.getBoard
    };
}


function DisplayController () {
  const board = Gameboard ();
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const playerOnePoints = document.querySelector('#player-one-points')
  const playerTwoPoints = document.querySelector('#player-two-points')
  const buttonNameOne = document.querySelector('#button-name-one')
  const buttonNameTwo = document.querySelector('#button-name-two')
  const buttonNewGame = document.querySelector('#new-game')
  const playerOne = game.getPlayers()[0]
  const playerTwo = game.getPlayers()[1]

  buttonNameOne.addEventListener('click', (e) => {
    const playerOneName = document.getElementById('player-one-name').value
    game.changeName(0, playerOneName);
    document.getElementById('player-one-name').value = ''
    updateScreen();
  })
  
  buttonNameTwo.addEventListener('click', (e) => {
    const playerTwoName = document.getElementById('player-two-name').value
    game.changeName(1, playerTwoName);
    document.getElementById('player-two-name').value = ''
    updateScreen();
  })

  buttonNewGame.addEventListener('click', (e) => {
    playerOne.points = '0'
    playerTwo.points = '0'
    updateScreen();
  }) 

  const updateScreen = () =>{
    boardDiv.textContent= '';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent= `${activePlayer.name}'s turn`;
    playerOnePoints.textContent= `${playerOne.name} ${playerOne.points} points`
    playerTwoPoints.textContent= `${playerTwo.name} ${playerTwo.points} points`

    
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement('button');
        cellButton.classList.add("cell");
        cellButton.dataset.column = columnIndex;
        cellButton.dataset.row = rowIndex;
        const content = () => {
          if(cell.getValue()==1){
            return 'X'
          }
          else if(cell.getValue()==2){
            return 'O'
          }
          else{
            return ' '
          }
        }
        cellButton.textContent = content();
        boardDiv.appendChild(cellButton);
      })
    })
  }

  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    const selectedRow = e.target.dataset.row;
    game.playRound(selectedColumn, selectedRow);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();

}

DisplayController();