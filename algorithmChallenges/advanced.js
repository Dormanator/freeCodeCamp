 //         TELEPHONE NUMBERS          \\
//                                      \\
function telephoneCheck(str) {
    // can start with country code and space, just code, or no code ^(1\s|1)?
    // can have parenthese around 3 first digits or not \(\d{3}\) | \d{3}
    // and followed by nothing, a space, or a dash [-\s]?
    // 3 digits occur again \d{3}
    // followed by nothing, a space, or a dash [-\s]?
    // and then followed by 4 digits at the end \d{4}$
    const teleRegExp = /^(1\s|1)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/
    return teleRegExp.test(str);
}



 //         RECORD COLLECTION          \\
//                                      \\
function updateRecords(id, prop, value) {
    // create local copy of object to be modified
    let collectionEdit = collection;
    // if the value given is empty delete the property
    if (value === '') {
        delete collectionEdit[id][prop];
    // if the property being edited is not tracks simply set the new value
    } else if (prop !== 'tracks') {
        collectionEdit[id][prop] = value;
    // if the object has a tracks property then just push on the value as a new track
    } else if (collectionEdit[id].hasOwnProperty('tracks') ) {
        collectionEdit[id].tracks.push(value);
    // else create a new tracks property and set is as a new array will the given track value
    } else {
        collectionEdit[id].tracks = [value];
    }
  
  return collectionEdit;
}
// console.log(updateRecords(2548, "artist", ""));



 //      SYMMETRIC DIFFERENCE          \\
//                                      \\
function sym(args) {
    // first we create a real array from our args
    args = [].slice.call(arguments);

    // then we use reduce to add elements from all the subarrays into one
    return args.reduce( (accu, curr) => {
        // we want a copy of teh current and accumenlated values to filter against as we manipulate the local vars
        const accuCopy = accu.slice();
        const currCopy = curr.slice();
        
        // we return the values of the accumulated array that are not in the current array and remove duplicates (the different ones)
        return accu.filter( (x, i, self) => !currCopy.includes(x) && self.indexOf(x) === i)
                   // with the values from the current array that were not in the accumulated array and are not duplicates (the different ones) concated to it
                   .concat( curr.filter( (x, i, self) => !accuCopy.includes(x) && self.indexOf(x) === i ));
    
    });
}
// console.log(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));



 //              EXACT CHANGE          \\
//                                      \\
function checkCashRegister(price, cash, cid) {
    let change;
    // Here is your change, ma'am.
    return change;
}
  
  // Example cash-in-drawer array:
  // [["PENNY", 1.01],
  // ["NICKEL", 2.05],
  // ["DIME", 3.10],
  // ["QUARTER", 4.25],
  // ["ONE", 90.00],
  // ["FIVE", 55.00],
  // ["TEN", 20.00],
  // ["TWENTY", 60.00],
  // ["ONE HUNDRED", 100.00]]
  
  checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
