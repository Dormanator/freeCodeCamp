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



 //         OBJECT ITERATION           \\
//                                      \\

function whatIsInAName(collection, source) {
    var arr = [];
    // for each object we are looking for a key value match
    // get a list of the keys so we can check for them in teh objects of teh collection to use in object exploration
    let keys = Object.keys(source);
    // establish counter
    let n;

    // iterate through collection objects
    for (let i = 0, x = collection.length; i < x; i++) {
            // reset counter for each object inspected
            n = 0;
        // on each collection object check for the source object's key value pairs
        for (let j = 0, y = keys.length; j < y; j++) {
            if(collection[i][keys[j]] === source[keys[j]]){
                // increment counter when key value pairs match
                n++;
            }
        }

        // if the counter equals the number of keys on the source object then push the collection object to teh array
        // we have establish all the key value pairs in the source object exist in teh colelction objects
        if (n === keys.length) {
            arr.push(collection[i]);
        }
    }

    // return the array
    return arr;
}
// console.log(whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 }));



 //         SEARCH AND REPLACE         \\
//                                      \\

function myReplace(str, before, after) {
    // search for capital first letter on original word
    if(before.search(/^[A-Z]/) !== -1){
        // create arr version of after
        after = after.split('');
        // replace the first array element with an upper case version
        after[0] = after[0].toUpperCase();
        // turn after back into a string
        after = after.join('');
    }
    // replace the original word with the new word, capitalized if needed
    return str.replace(before, after);
  }
  // console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));
  // console.log(myReplace("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped"));



 //             PIG LATIN              \\
//                                      \\
function translatePigLatin(str) {
    // counter to keep track of consonant cluster length, starting form teh begining of the string
    let n = 0;
    // while the current letter is not a vowel, keep track of teh length of the consonant clust
    while (str[n].search(/[aeiou]/) === -1) {
        n++;
    }
    // create prefix and suffix based on consonant cluster
    let prefix = str.slice(0, n),
        suffix = str.slice(n);
    // if there was no consonant cluster, no prefix was removed and we can add 'way'
    if (!prefix) {
        str = suffix + 'way';
    // else move the consonant prefix to the end and add 'ay'
    } else {
        str = suffix + prefix + 'ay';
    }

    return str;
}
// console.log(translatePigLatin("our"));



 //             DNA PAINRING           \\
//                                      \\

function pairElement(str) {
    // convert loca var to array
    str = str.split('');
    // for each letter in teh array
    str = str.map( x => {
        // store it in a subarray
        x = [x];
        // find its matching pair and assign it to a second var
        let y;

        switch(x[0]){
            case 'A':
                y = 'T';
                break;
            case 'T':
                y = 'A';
                break;
            case 'G':
                y = 'C'
                break;
            case 'C':
                y = 'G';
                break;
        }
        // push the pair into the sub array
        x.push(y);

        return x;

    });
    // return the new 2d array with pairs added
    return str;
}
// console.log(pairElement("GCG"));



 //          MISSING LETTERS           \\
//                                      \\
function fearNotLetter(str) {
  // convert the string to an array of asci characters
  str = str.split('').map( x => x.charCodeAt(0) );

  // iterate through array
  // && ascii codes, based on min and max, to find the missing ascii value
    for (let i = 0, x = str[0], y = str[str.length-1]; x < y; i++, x++) {
      // if an ascii value is missing return it as char
      // we found the missing value
      if(str[i] !== x){
        return String.fromCharCode(x);
      }
    }

    // if we made it here none was missing
    return undefined;
}
// console.log(fearNotLetter("abcdefghjklmno"));



 //                BOO WHO             \\
//                                      \\
function booWho(bool) {
  // What is the new fad diet for ghost developers? The Boolean.
  return (typeof bool === 'boolean');
}
// console.log(booWho(null));



 //           SORTED UNION             \\
//                                      \\
function uniteUnique(arr) {
  // convert the arguments into one array
  arr = [...arguments];
  // reduce teh subarrays with the arg array
  // dealing with accumulator and current arrays
  return arr.reduce( (a, b) => {
    // merge the cureent array into the accumulated array
    // the current array is filtered as its added to teh accumulator array
    return a.concat(b.filter( x => {
      // the values alread in teh accumualted array are not added form teh current array
      return (!a.includes(x));
    }));
  });
}
// console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));



 //           CONVERTED HTML           \\
//                                      \\
function convertHTML(str) {
  // create parellel arrays for symbols and corresopnding html to replace with
let symbol = ['&', '<', '>', '"', "'"],
    html = ['&amp;', '&lt;', '&gt;', '&quot;','&apos;'];

    // iterate through each symbol
    for (let i = 0, x = symbol.length; i < x; i++) {
        
        // don't do if we don't have to
        if (str.includes(symbol[i])) {
        // create pattern to find all symbols in word and replace with corresponding html array value
        const pattern = new RegExp(symbol[i], 'g');
        str = str.replace(pattern, html[i]);
        }
    }

  return str;
}
// console.log(convertHTML("Dolce & Gabbana"));


 //            SPINAL CASE             \\
//                                      \\
function spinalCase(str) {
    // add spaces before capital letters in strings to seperate out the words
    // change to lower cased string with spaces and underscores replaces with dashes
    return str.replace(/(\B[A-Z])(?!\s)/g, ' $1').toLowerCase().replace(/[\s_]+/g, '-');
}
// console.log(spinalCase('This IsSpinalTap'));



 //        SUM ODD FIBONACCIS          \\
//                                      \\
function sumFibs(num) {
    // create an array with the first fib number - 1
    let fibs = [1];
    // create a var to store teh next fib number - 1 comes next again
    let currentFib = 1;

    // begin to go through fib numbers up to or equal to the input number
    for (let i = 0; currentFib <= num; i++) {
        // push each current fib number into the fib array before we create the next
        fibs.push(currentFib);
        // the next fib number is created by adding the current fib number to the one the came before it
        currentFib += fibs[i];
    }
    // filter out the fib numbers that are even and sum the odd numbers
    return fibs.filter( x => x % 2 !== 0).reduce( (a,b) => a + b);
}
// console.log(sumFibs(10));



 //           SUM ALL PRIMES           \\
//                                      \\
function sumPrimes(num) {
    
    let prime = [];
    // iterate through each value from 2 to input
    for (let i = 2; i <= num; i++) {
        let counter = 0;
        // for each value we then want to check to ensure its only divisible by itself and 1
        // but we need to test it against other possibilities 
        for (let j = 2; j <= num; j++) {
            
            if (i !== j && i % j === 0) {
                // if a number is divisble by anything other than itself, increase the count - it's not prime!
                counter++;
            }
        }
        // if teh count is 0 the number is prime
        if(counter === 0) {
            prime.push(i);
        }
    }
    // return teh array of prime numbers summed
    return prime.reduce( (a,b) => a + b );
} 
// console.log(sumPrimes(977));



 //      Smallest Common Multiple      \\
//                                      \\
function smallestCommons(arr) {
    // find our max and min values so we can explore this range of values
    let min = arr[0] < arr[1] ? arr[0] : arr[1],
        max = arr[0] > arr[1] ? arr[0] : arr[1],
        lcm;

    // iterate through range of values from loest to higest that must be multiples to find teh lcm
    // using its relationship to teh gcd: lcm(a, b) = (a * b) / gcd(a, b)
    for (let i = min; i < max; i++) {
        // if this is the first iteration establish a baseline lcm 
        //by finding the lcm of the first 2 numbers in teh range by diving their product by their gcd
        if (i === min) {
            lcm = (i * (i + 1)) / gcd(i, i + 1);
        // else multiply the current val of lcm by the next number in the range and divide by their gcd
        } else {
            lcm = (lcm * (i + 1)) / gcd(lcm, i + 1);
        }

    }

    return lcm;

    // classic euclidan function gcd(a,b) a = b * q + r = (b, r) 
    function gcd(x, y) {
        // once we have a remainder of 0 we found our gcd
        // otherwise use the remainder as teh new divisor, and the old divisor as the numerator
        return (y === 0) ? x : gcd(y, x % y);
    }
}
// console.log(smallestCommons([1,13]));



 //           FINDERS KEEPERS          \\
//                                      \\
function findElement(arr, func) {
    // apply filter function provided
    let num = arr.filter(func);
    // return first value that passed the test
    return num[0];
}
// console.log(findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; }));



 //               DROP IT              \\
//                                      \\
function dropElements(arr, func) {
    let dropCount = 0;
    // iterate through array
    for (let i = 0, x = arr.length; i < x; i++) {
        // increase drop count to keep track of elements that return false
        if (!func(arr[i])) {
            dropCount++;
        // when we encounter a true value we stop looking and slice off teh elements that return false
        } else {
            break;
        }
    }
    
    return arr.slice(dropCount);
}
// console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));



 //             STEAMROLLER            \\
//                                      \\
function steamrollArray(arr) {
    // reduce elements into single array while recusivley merging subarrays at teh current position, if they exist, before merging the current value
    return arr.reduce( (accum, current) => accum.concat( Array.isArray(current) ? steamrollArray(current) : current ), [] );
}
// console.log(steamrollArray([1, [2], [3, [[4]]]]));



 //             BINARY AGENTS          \\
//                                      \\
function binaryAgent(str) {
    // convert string to array of binary values to convert
    let arr = str.split(' ').map( x => {
        // convert binary values to decimal and then to chars
       return x = String.fromCharCode(parseInt(x, 2));
    });
    // return array joined array with no spaces in between values
    return arr.join('');
}  
// console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"));



 //        EVERYTHING BE TRUE          \\
//                                      \\
function truthCheck(collection, pre) {
    // check every array value
    return collection.every( obj => {
        // to make sure they have the property && it has a non falsy value
        return obj.hasOwnProperty(pre) && obj[pre]
    });
}
// console.log(truthCheck([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex"));



 //         ARGUMENTS OPTIONAL         \\
//                                      \\
function addTogether() {
    return false;
  }
  
console.log(addTogether(2,3));
  