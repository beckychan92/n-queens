/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


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

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
    var solution = new Board({n:n}); //fixme, should be an arr
  // need to push n rows of n elem arr, with rooks placed on the appropriate spots of each rows
  // need to generate a board first and then loop through to place the rooks
  // use for loop to push the rows in 
  // var majorNum = solution._getFirstRowColumnIndexForMajorDiagonalOn()
  if (n === 0) {
    return solution; 
  }
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
        var majorNum = solution._getFirstRowColumnIndexForMajorDiagonalOn(r, c);
        var minorNum = solution._getFirstRowColumnIndexForMinorDiagonalOn(r, c);
        solution.togglePiece(r, c); 
      if(solution.hasRowConflictAt(r) || solution.hasColConflictAt(c) || solution.hasMajorDiagonalConflictAt(majorNum) || solution.hasMinorDiagonalConflictAt(minorNum)) {
        solution.togglePiece(r, c); 
      }
    } 
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
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
