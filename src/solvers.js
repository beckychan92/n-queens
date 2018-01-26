/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.findSolution = function(row, n, board, validator, callback) {
  // if all rows exhausted, this is a valid solution.
  if (row === n) {
    return callback();
  }

  // iterate over possible decisions
  for (var i = 0; i < n; i++) {
    // place a piece
    board.togglePiece(row, i);
    // recurse into remaining problem
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);
      if (result) {
        return result; // EJECT
      }
    }
    // unplace a piece
    board.togglePiece(row, i);
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = new Board({n:n}); //fixme, should be an arr
  // need to push n rows of n elem arr, with rooks placed on the appropriate spots of each rows
  // need to generate a board first and then loop through to place the rooks
  // use for loop to push the rows in 
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
        solution.togglePiece(r, c); 
      if(solution.hasRowConflictAt(r) || solution.hasColConflictAt(c)) {
        solution.togglePiece(r, c); 
      }
    } 
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //fixme, should be an arr
  // need to push n rows of n elem arr, with rooks placed on the appropriate spots of each rows
  // need to generate a board first and then loop through to place the rooks
  // use for loop to push the rows in 
  // var majorNum = solution._getFirstRowColumnIndexForMajorDiagonalOn()


  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });
  // If no solution exists, return the original unaltered board
  solution = solution || board.rows();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
  
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n:n});
  function countQ(row) {
    if(row === n) {
      solutionCount++;
    } else {
      for(var i = 0; i < n; i++) {
        board.togglePiece(row, i);
        if(!board.hasAnyQueenConflictsOn(row, i)){
          countQ(row + 1)
        }
        board.togglePiece(row, i);
      }
    }
  }
  countQ(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0;
  var countNRooksRecur = function (row) {
    if(row === n) {
      solutionCount++; 
      return; 
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(i)) {
        countNRooksRecur(row+1); 
      }
      board.togglePiece(row, i); 
    }
  } 
  countNRooksRecur(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};