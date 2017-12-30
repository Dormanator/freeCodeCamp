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
    let newArr = [];
    let tempArr = [];

    // Same, same; but different.
    newArr = arr1.filter( x => arr2.indexOf(x) === -1 );
    tempArr = arr2.filter(x => arr1.indexOf(x) === -1);
    return newArr.concat(tempArr);
  }
  // console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));



 //       BASE 10 to ROMAN NUMERAL     \\
//                                      \\  

function convertToRoman(num) {
    let numerals = [ 'X', 'IX', 'V', 'IV', 'I' ];
    let numbers = [ 10, 9, 5, 4, 1];
    
    let roman = num.toString(10).split('').map( x => {
        let roman = '';
        x = parseInt(x);
        // go through our string of numbers with comparable roman numerals for each value in the array
        for (let i = 0; i < numbers.length; i++) {
            // while the current number is greater than or equal to the current value in teh array
            while (x >= numbers[i]) {
            // use the comparable roman numeral and subract its decimal value from the value in the array
            roman += numerals[i];
            x -= numbers[i];

            }
        }
        // return our roman numeral string as teh new value in teh array
        return roman;
    });

    // we now need to check that each roman numeral value is correct based on its position 1, 10, 100, 1000
    if (roman[3] !== undefined) {
        roman[0] = roman[0].replace(/[I]/g, 'M');
        roman[1] = roman[1].replace(/[X]/g, 'M'). replace(/[V]/g, 'D').replace(/[I]/g, 'C');
        roman[2] = roman[2].replace(/[X]/g, 'C'). replace(/[V]/g, 'L').replace(/[I]/g, 'X');
    } else if (roman[2] !== undefined) {
        roman[0] = roman[0].replace(/[X]/g, 'M'). replace(/[V]/g, 'D').replace(/[I]/g, 'C');
        roman[1] = roman[1].replace(/[X]/g, 'C'). replace(/[V]/g, 'L').replace(/[I]/g, 'X');
    } else if(roman[1] !== undefined){
        roman[0] = roman[0].replace(/[X]/g, 'C'). replace(/[V]/g, 'L').replace(/[I]/g, 'X');

    }

    return roman.join('');
}
   //console.log(convertToRoman(798));



 //         OBJECT EXPLORATION         \\
//                                      \\  

function whatIsInAName(collection, source) {
    // What's in a name?
    var arr = [];
    // Only change code below this line
    // for each object we are looking for a key value match
    for(let i = 0; i < source.length; i++) {
        // get a list of the keys so we can check for them in teh objects of teh collection array before exploring values - prevent errors
        let keys = Object.keys(source[i]);
    }
    // Only change code above this line
    return arr;
}
  
  whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });
  