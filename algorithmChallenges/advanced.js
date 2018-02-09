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

    // create a var to keep track of teh change to return
    let changeToReturn = (cash - price);
        // create a cipher that corresponds to the format of cash in drawer input so we can see if the value fits in our change to give
    const changeCipher = [.01, .05, .10, .25, 1, 5, 10, 20, 100];

    // find amount in drawer that can be used as change (demoniations less than or equal to then what we need to return) and correct for float decimal fragments
    let amount = cid.filter( (cidAmount , i) => {
                        return changeCipher[i] <= changeToReturn;
                    })
                    .reduce( (accu, curr) => {
                        return accu += curr[1];
                    }, 0).toFixed(2);

    // if we can end this quick we will...
    // check teh amount if drawer can sustain the change to return
    if (changeToReturn > amount) {
        return 'Insufficient Funds';
    // and check to see if we are closing out the register with this amount of change
    } else if (amount - changeToReturn === 0) {
        return 'Closed';
    }

    // otherwise, lets build our return amount
    // create a var filled with change amounts we are giving back
    let change = [];

    // iterate through the money in the drawer backwards to find the largest values we can give them back first
    for (let i = changeCipher.length - 1; i >= 0; i--) {

        // create a temproary variable that will indicate if we are giving back any money from the drawer for this amount (.01,...,100)
        let amount = 0;

        // while the change in drawer is not empty for this amount AND the value can fit into the change we have left to return
        while (cid[i][1] !== 0 && (changeToReturn - changeCipher[i]).toFixed(2) >= 0) {

            // remove the current amount from the cash in drawer
            cid[i][1] -= changeCipher[i];
            // remove the curret amount from the change we have left to return
            changeToReturn -= changeCipher[i];
            // increment the amount of cash to give back at this value
            amount += changeCipher[i];
        
        }

        // if we are giving back change in this amount add it to the array of change we are returning
        if (amount > 0) {
            change.push([cid[i][0], amount]);
        } 
    }

        return change;
}
// console.log( checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) );



 //          INVENTORY UPDATE          \\
//                                      \\
function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    // function to updated existing items and merge on new items
    const updatedInv = updateProducts(arr1, arr2);
    // function to alphabetize inventory by product name -- BROKENNNN!
    const sortedInv = sortProducts(updatedInv);

    return sortedInv;
}

function updateProducts (arr1, arr2) {
    // let's iterate through one array so we can compare it to the other inventory array
    for (let i = 0, x = arr1.length; i < x; i++) {
        // and for each product name in arr1 we look at, we will look for its existence in arr2, so we iterate through arr2
        for (let j = 0; j < arr2.length; j++) {
            // if we encounter a product from the current inventory array in the new inventory array
            if (arr1[i][1] === arr2[j][1]) {
                // then we will add the number of new inventory into teh current inventory
                arr1[i][0] += arr2[j][0];
                // and delete the product entry from the new inventory since its been acounted for
                // plus, this will give us less items to check for as we continue to check the new inventory
                // for the products in the current inventory, thus shortening our runtime
                arr2.splice(j, 1);
            }
        }
    }
    // push our arr1 and arr2 outputs into our temp array to return both
    arr1 = arr1.concat(arr2);
    return arr1;
}

function sortProducts (arr) {
    // since we are sorting alphabetically we want to compare each item in teh array and the value that follows it
    return arr.sort( (a, b) => {
        // when the first value is already smaller than the next return -1 to indicate it preceeds teh value
        if (a[1] < b[1]) {
            return -1;
        // when the first value is larger than the next return 1 to indicate it follow the value
        } else if (a[1] > b[1]) {
            return 1;
        // otherwise the values must be equal so no need to rearrange them, return 0
        } else {
            return 0;
        }
    });
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

console.log(updateInventory(curInv, newInv));