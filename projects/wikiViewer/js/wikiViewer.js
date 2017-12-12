pageLoad();

// https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=Test%20word
// https://en.wikipedia.org/wiki/Special:Random

// if JS loads correctly insert elements
function pageLoad () {
    
    // store container and default warning prompt in variable
    let container = document.getElementById('search_wiki');
    let warning = document.getElementById('warning');
    
    // create input field
    let input = document.createElement('INPUT');
    console.log(input);
    input.id = 'search_field';
    input.className = 'search-input';
    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', 'Search Wikipedia');

    // replace warnign message with input field
    container.replaceChild(input, warning);

}

// monitor enter press when input_field is focus
// grab user search parameters in input_field
// call fetchAPI and to get search results based on input
// have fetchAPI pass response to append results if success
// call fetchFailed if err from API fetc


function fetchAPI () {
    
}

function appendResults () {

}

function fetchFailed () {

}