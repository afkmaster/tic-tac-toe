$(window).load(function() {
  //Player A = turn % 2 == 0, places X
  //Player B = turn % 2 == 1, places O
  var turn = 0;
  var moveCount = 0;
  var board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
  var row = 0;
  var col = 0;
  var lastMove = new Array();
  function updatePlayerTurn() {
    var playerName = (turn % 2 == 0) ? "Player A" : "Player B";
    $("#player-name").text(playerName);
  }
  function reset() {
    undoLastMove();
    $("input").each(function() { 
      $(this).attr("value", " ");
    });
    turn = 0;
    moveCount = 0;
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    lastMove = new Array();
  }
  function updateBoard(square) {
    var marker = (turn % 2 == 0) ? "X" : "O";
    if (square.value != " ") {
      alert('Please choose another square');
    }
    else {
      $(square).attr("value", marker);
      row = square.parentNode.id;
      col = square.name;
      board[row][col] = marker;
      turn++;
      moveCount++;
    }
  }
  function checkWinner() {
    if (moveCount > 4) {
      for(var i = 0; i < board.length; i++) {
        //check rows
        if (board[i][0] == "X" && board[i][1] == "X" && board[i][2] == "X") {
          alert("Winner: Player A");
          reset();
          return
        }
        if (board[i][0] == "O" && board[i][1] == "O" && board[i][2] == "O") {
          alert("Winner: Player B");
          reset();
          return
        }
        //check columns
        if (board[0][i] == "X" && board[1][i] == "X" && board[2][i] == "X") {
          alert("Winner: Player A");
          reset();
          return
        }
        if (board[0][i] == "O" && board[1][i] == "O" && board[2][i] == "O") {
          alert("Winner: Player B");
          reset();
          return
        }
      }
      //check diagnols
      if (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") {
        alert("Winner: Player A");
        reset();
        return
      }
      if (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O") {
        alert("Winner: Player B");
        reset();
        return
      }
      if (board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X") {
        alert("Winner: Player A");
        reset();
        return
      }
      if (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O") {
        alert("Winner: Player B");
        reset();
        return
      }
    }
    if (moveCount == 9) {
      alert("Draw");
      reset();
    } 
  }
  function undoLastMove() {
    turn--;
    moveCount--;
    board[row][col] = " ";
    var move = lastMove.pop();
    $(move).attr("value", " ");
    if (lastMove.length == 0) {
      $(.undo).css("display", "none");
    }
  }
  $("input").click(function() {
    updateBoard(this);
    checkWinner();
    updatePlayerTurn();
    lastMove.push(this);
    $(".undo").css("display", "block");
  });
  $(".undo").click(function() {
    undoLastMove();
    updatePlayerTurn();
  });
});