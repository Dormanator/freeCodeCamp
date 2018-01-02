pageLoadWiki();

/****************************************************
 * 
 * 
 *              PAGE LOAD FUNCTION
 * 
 * 
 ****************************************************/
function pageLoadWiki () {
    // start rotating link
    rotateRandom();
    
    // store container and default warning prompt in variable
    let container = document.getElementById('search_form'),
        warning = document.getElementById('warning'),
        // create input field
        input = document.createElement('INPUT');

    input.id = 'search_field';
    input.className = 'search-input';
    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', 'Search Wikipedia');
    input.setAttribute('autocomplete', 'false');

    // replace warnign message with input field
    container.replaceChild(input, warning);

    // show search icon label
    document.getElementById('search_label').style.display = 'block';
}

/****************************************************
 * 
 * 
 *              ROTATE RANDOM WIKI TEXT
 * 
 * 
 ****************************************************/
function rotateRandom () {
    // create var to iterate through animation
    let i = 0;
    // get container random wiki option list
    const options = document.getElementById('rotate_options');

    // set timed interval to continuosly rotate the list
    setInterval(() => {
        // incremet each pass through so we can continuously rotate the list down and back
        i++;
        // rotate the list down on the x-axis by 60 deg since there are 6 items in the list
        options.style.webkitTransform = 'rotateX(' + (i * -60) + 'deg)';
        options.style.transform = 'rotateX(' + (i * -60) + 'deg)';
        // set the correct data state using 'i' and making sure its always a value between 1-6
        options.setAttribute('data-state', (i % 6) + 1);
    }, 600)
}

/****************************************************
 * 
 * 
 *              EVENT LISTENER ON INPUT FIELD
 * 
 * 
 ****************************************************/
document.getElementById('search_form').addEventListener( 'submit', input => {
    input.preventDefault();

    // grab user search parameters in input_field and remove leading and trailing spaces
    let search = input.target[0].value.replace( /^[ \s]+|[ \s]+$/g ,'');
    
    // validate input is 30 character or less and adjust search parameters 
    if (search.length <= 29) {
        // if valid input set search parameters with trimmed input
        input.target[0].value = search;
        // prepare for API use by replace spaces with '%20'
        search = search.replace( /\s/g ,'%20');
    } else {
        // if input was not valid warn the user
        alert('Your search input must be 30 characters or less');
        // clear the invalid input
        input.target[0].value = '';
        // and return to stop API
        return;
    }
    
    document.getElementById('search_field').blur();
    // call fetchAPI and get search results based on input
    fetchAPI(search);
});

/****************************************************
 * 
 * 
 *              CALL FETCH ON API
 * 
 * 
 ****************************************************/
function fetchAPI ( search = '' ) {
    // store necessary data for API call
    const API = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + search,
          HEADER = new Headers({
          'Api-User-Agent' : 'Example/1.0'
          });

    // call fetch on API and display loading indicator
    fetch( API, {
        method: 'POST',
        headers: HEADER
        // check to make sure results are okay then return and parsed data
    }, searchIndicator(document.getElementById('search_results')) 
        ).then( results => {
        if ( results.ok ) {
            return results.json();
        }
        // if not okay throw a more specific error
        throw new Error( 'Uh oh. There was an error: ' + results.statusText );
        // if everythign went well we pass results to be appended to search result container div
    } ).then( results => appendResults(results)
        // if we encounter any errors along the way we catch them and send them to the console
      ).catch( error => console.log(error) );
}

/****************************************************
 * 
 * 
 *              ADD API RESULTS TO PAGE
 * 
 * 
 ****************************************************/
function appendResults ( input ) {
    let container = document.getElementById('search_results');

    // clear the search container before appending new results
    container.innerHTML = '';
    
    // iterate through each result
    for (let i = 0, n = input[1].length; i < n; i++) {

        // create object to store title, content, and link for each result on each iteration - mostly for clarity when inserting into html
        let result = {
            title: input[1][i],
            content: input[2][i],
            link: input[3][i]
        };

        // add HTML into search result container on each iteration that includes title, content, and link
        container.innerHTML += `<li class="result">
                                    <a href="${result.link}" target="_blank">
                                        <h3>${result.title}</h3>
                                        <p>${result.content}</p>
                                    </a>
                                </li>`;
    }

    // activate icon to allow search results to be cleared
    allowClear(container);
}

/****************************************************
 * 
 * 
 *              FUNCTIONS TO CLEAR SEARC RESULTS
 * 
 * 
 ****************************************************/
function allowClear( container ) {
    // save icon for clear results to var
    let clearIcon = document.getElementById('close_results');

    // if teh search container is not empty then show the icon to allow the results to be cleared, else do not show the icon
    if (container.innerHTML !== '') {
        clearIcon.style.display = 'block';
    } else {
        clearIcon.style.display = 'none';
    }
}

document.getElementById('close_results').addEventListener( 'click', click => {
    // store results container for mainpulation and status checking
    let container = document.getElementById('search_results');

    // clear search input from search field
    document.getElementById('search_form')['0'].value = '';

    // clear search results of the search results container
    container.innerHTML = '';

    // make sure the clear icon is hidden if the results were clear properly
    allowClear(container);
});

/****************************************************
 * 
 * 
 *              FETCH INDICATOR
 * 
 * 
 ****************************************************/
function searchIndicator (object) {
    // we just need to add the indicator in since the search contianer will be cleared when teh results are appended
    object.innerHTML = '<div class="searching">Searching<div class="search-indicator"></div></div>';
}