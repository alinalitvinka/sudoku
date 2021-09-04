module.exports = function solveSudoku(matrix) {
  function checkStr(arr) {
    arr.forEach(elem => {
      if (elem.filter(a => a == 0).length == 1) {
        for(let i = 1; i<=9; i++) {
          if (elem.indexOf(i) < 0) {
            elem[elem.indexOf(0)] = i;
          }
        }
      }
      if (elem.filter(a => a == 0).length == 2) {
        let num = [];
        for(let i = 1; i<=9; i++) {
          if (elem.indexOf(i) < 0) {
            num.push(i);
          }
        }
        for(let i=0;i<9;i++) {
          if (matrix[i][elem.indexOf(0)] == num[0]) {
            elem[elem.lastIndexOf(0)] = num[0];
            elem[elem.indexOf(0)] = num[1];
          } else if (matrix[i][elem.indexOf(0)] == num[1]) {
            elem[elem.lastIndexOf(0)] = num[1];
            elem[elem.indexOf(0)] = num[0];
          } else if (matrix[i][elem.lastIndexOf(0)] == num[0]) {
            elem[elem.indexOf(0)] = num[0];
            elem[elem.lastIndexOf(0)] = num[1];
          } else if (matrix[i][elem.lastIndexOf(0)] == num[1]) {
            elem[elem.indexOf(0)] = num[1];
            elem[elem.lastIndexOf(0)] = num[0];
          }
        }
      }
    });
    return arr;
  }
  const rotateMatrix = arr => {
    return (arr[0].map((x,i) => arr.map(x => x[i])));
  }
  function transformMatrix(arr) {
    let array = [];
    for (let k = 0; k < 9; k++) {
      array.push([]);
      let row = Math.floor(k/3)*3;
      let col = Math.floor(k%3)*3;
      array[k] = arr[row].slice(col,col+3).concat(arr[row+1].slice(col,col+3)).concat(arr[row+2].slice(col,col+3));
    }
    return array;
  }
  function find0(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  }
  let a = true;
  do {
    matrix = rotateMatrix(matrix);
    matrix = checkStr(matrix);
    matrix = rotateMatrix(matrix);
    matrix = checkStr(matrix);
    matrix = transformMatrix(matrix);
    matrix = checkStr(matrix);
    matrix = transformMatrix(matrix);
  } while(a == false);
  return matrix;
}