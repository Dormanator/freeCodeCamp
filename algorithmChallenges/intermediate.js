 // SUM ALL NUMBERS IN A RANGE \\
//                              \\
function sumAll(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    for (let i = min + 1; i < max; i++) {
        arr.push(i);
    }
    
  return arr.reduce( (a,b) => {
      return a + b;
  }, 0);
}
// console.log(sumAll([1, 4]));

 // COMPARE 2 ARRAYS AND FIND UNIQUE VALUES \\
//                                           \\
function diffArray(arr1, arr2) {
    var newArr = [];
    // Same, same; but different.
    return newArr;
  }
  
  diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);