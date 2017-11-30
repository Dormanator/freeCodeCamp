//#### reverse a string ####\\
function reverseString(str) {
    return str.split('').reverse().join('');
}
//console.log(reverseString("hello world"));



//#### factorialize a number ####\\
function factorialize(num) {
    var fac = 1;
    if (num > 0){
        for (i = num; i > 0; i-- ) {
            fac *= i;
        }
    } else {
        for (i = num; i < 0; i++ ) {
            fac *= i;
        }
    }
    return fac;
}
//console.log(factorialize(5));



//#### check for palindromes ####\\
function palindrome(str) {
    // replace special charcters and convert to lower case -  \W_ Nonalphanumeric characters and underscores
    str = str.replace(/[\W_]/gi,'').toLowerCase();
    console.log(str);
    // test for palindromes - could use reverse string method or for loop
    /*
    for( var i = 0; i < Math.floor(str.length/2); i++ ) {
        console.log(str.charAt(i));
        console.log(str.charAt(str.length - 1 - i));
    
        if (str.charAt(i) !== str.charAt(str.length - 1 - i)) {return false;}
    }*/
    if (str.split('').reverse().join('') === str)
        return true;
    else
        return false;
}
//console.log(palindrome("_eye"));

 

//#### Find the Longest Word in a String ####\\
function findLongestWord(str) {
    //split string into array of word, map array of words into array of word legths
    str = str.split(' ').map(function(x){return x.length;});
    //return max value in array of word lengths
    return Math.max.apply(null, str);
}
//console.log(findLongestWord("The quick brown fox jumped over the lazy dog"));



//#### Title Case a Sentence ####\\
function titleCase(str) {
    //make each word lowerCase
    str = str.toLowerCase()
        //split them into an array
        .split(' ')
        //replace th first letter of each word with an uppercase version
        .map(x => x.replace(x[0],x[0].toUpperCase()));
        //convert back to string
    return str.join(' ');
}
//console.log(titleCase("I'm a little tea pot"));



//#### Return Largest Numbers in sub-Arrays ####\\
function largestOfFour(arr) {
    // applying the Math.max method to each sub-array in the array via map
    // which uses each sub-array into the greatest number in that array
    return arr.map(x => Math.max.apply(null,x));
}
//console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]));



//#### Confirm the Ending ####\\
function confirmEnding(str, target) {
    // return based on test of equality between target at the end of string
    // indexs for substring determined by the length of target and end of string
    return target === str.substr( (str.length - target.length),str.length );
}
//console.log(confirmEnding("Bastian", "ian"));



//#### Repeat a string repeat a string ####\\
function repeatStringNumTimes(str, num) {
    var repeat = '';
    if (num === '0') return '';
    for (var i = 0; i < num; i++) {
        repeat += str;
    }
    return repeat;
}
//console.log(repeatStringNumTimes("abc", 3));



//#### Truncate a string ####\\
function truncateString(str, num) {
    if (num <= 3) {
        return str.slice(num) + '...'; 
    } else {
        return num >= str.length? str : str.slice(num-3) + '...';
    }
}
//console.log(truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length));



//#### Chunky Monkey ####\\
function chunkArrayInGroups(arr, size) {
   //create new array to hold grouped values
    var group = [];
    // set the position fo the original array we are looking at to track the begining of groups
    var position = 0;
    // go through the array until the end based on position tracker
    while(position < arr.length) {
        // based on the position start of teh group and teh group size copy the vales into the new array
        // also increase the position we are looking at based on the size, this will grab the leftover values at the end too
        group.push(arr.slice(position, position+=size));
    }
    return group;
}
//console.log(chunkArrayInGroups(["a", "b", "c", "d", "e"], 3));



//#### Slasher ####\\
function slasher(arr, howMany) {
    // it doesn't always pay to be first
    return arr.slice(howMany,arr.length);
}
//console.log(slasher([1, 2, 3], 2));
  


//#### Mutations ####\\
function mutation(arr) {
    // change array to lower case
    arr = arr.map(x => x.toLowerCase());
    // loop to go through each of the letters in teh second word
    for (var i = 0; i < arr[1].length; i++) {
        // if any of the letters from the second word aren't in the first return false
        if (arr[0].indexOf(arr[1][i]) === -1) return false;
    }
    // else return true
    return true;
  }

  function mutation2(arr) {
    // return second word lowercase, 
    return arr[1].toLowerCase()
       // each letter in an array
      .split('')
       // and for every letter in the subarrays
      .every(function(letter) {
                // test each letter in the subbaray to verify it is in the first word when its lowercase
        return arr[0].toLowerCase()
                     .indexOf(letter) !== -1;
    });
}
//console.log(mutation(["hello", "hey"]));
//console.log(mutation(["Alien", "line"]));



//#### Falsy Bouncer ####\\
function bouncer(arr) {
    // return a filtered Array
    return arr = arr.filter(function(x){
        // filter out array values that return false in an if statement
        if (x) return x;
    });
}
//console.log(bouncer([7, "ate", "", false, 9]));



//#### Seek and Destroy ####\\
function destroyer(arr) {
    // sort through each of the arguments
    for (var i = 1; i < arguments.length; i++) {
        // filter out values from the array that equal the arguments
        arr = arr.filter( x => x !== arguments[i]);
    }
    return arr;
} 
//console.log(destroyer([1, 2, 3, 1, 2, 3], 3, 2));


//#### Where do I belong ####\\
function getIndexToIns(arr, num) {
    // push num in to array
    arr.push(num);
    // sort it and find index of num and return
    return arr.sort( function(a,b){ return a - b; }).indexOf(num);
} 
//console.log(getIndexToIns([2, 5, 10], 15));


//#### Caesars Cipher ####\\
function rot13(str) { // LBH QVQ VG!
    var arr = [];
    // iterate through str and push charCodes to array
    for (var i = 0; i < str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    // manipulate array A:65 Z:90 Z/M Y/L
    return arr.map(function(x){
        // if the charCode is for " .!?" do no adjust it
        if (x === 32 || x === 33 || x === 46 || x === 63) return String.fromCharCode(x);
        // if the charCode can be shifted up by 13 and still be a valid char A-M, translate it to the new char
        else if ( x > 64 && x < 78) return String.fromCharCode(x + 13);
        // else the charCode needs to be shifted down by 13, translate it to the new char
        else return String.fromCharCode(x - 13);
                            //rejoin array as string
                            }).join('');
} 
//console.log(rot13("! . ?"));
  