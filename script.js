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
    
    const placeMark = (column, row, player) => {
        if(board[column][row].getValue() !== 0){
          return false;
        }
        else {
        board[column][row].addMark(player);
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

      if(board.placeMark(column, row, getActivePlayer().mark)==false){
        console.log(`You can't place a mark here, try another space`)
        return
      }

      else{
        console.log(
          `Placing ${getActivePlayer().name}'s mark into column ${column}, row ${row}`
        );
        board.placeMark(column, row, getActivePlayer().mark);

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
          console.log(`${getActivePlayer().name} wins! ${getActivePlayer().name} has ${getActivePlayer().points} points.`)
          console.log(`Starting new game.`)
          board.resetBoard()
        }

        else if(board.getBoard()[0][0].getValue() !== 0 && board.getBoard()[0][1].getValue() !== 0 && board.getBoard()[0][2].getValue() !== 0 &&
        board.getBoard()[1][0].getValue()!== 0 && board.getBoard()[1][1].getValue()!== 0 && board.getBoard()[1][2].getValue()!== 0 && 
        board.getBoard()[2][0].getValue()!== 0 && board.getBoard()[2][1].getValue()!== 0 && board.getBoard()[2][2].getValue()!== 0  
        ){
          board.printBoard()
          console.log(`It's a tie!`)
          console.log(`Starting new game.`)
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
      getActivePlayer
    };
}


const game = GameController();

