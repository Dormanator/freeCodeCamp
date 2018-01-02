quotePageLoad();
/****************************************************
 * 
 * 
 *              PAGE LOAD FUNCTION
 * 
 * 
 ****************************************************/
function quotePageLoad () {
    genBlur(document.getElementById('quote'), document.getElementById('author'));
    api();
}

/****************************************************
 * 
 * 
 *              RANDOM QUOTE BUTTON
 * 
 * 
 ****************************************************/
document.getElementById('btn_quote').addEventListener('click', (x) => {
    x.preventDefault;
    let num = genRan();
    api(num);
});

// generate a 6 digit random number
function genRan(){
    let num = Math.floor(Math.random() * 1000000);
    return num.toString();
}

/****************************************************
 * 
 * 
 *              LOADING INDICATOR
 * 
 * 
 ****************************************************/
function loadingIndicator (object) {
    // check the current content of teh button, apply loading indicator if appropriate else set to original text
    if (object.textContent === 'New Quote') {    
        object.innerHTML = '<span class="loading">.</span ><span class="loading">.</span><span class="loading">.</span>';
    } else {
        object.innerHTML = 'New Quote';
    }
}

/****************************************************
 * 
 * 
 *              BLUR QUOTE AND AUTHOR
 * 
 * 
 ****************************************************/
function genBlur(quote, author){

    if (quote.classList.contains('blur') && author.classList.contains('blur')){
        quote.classList.remove('blur');
        author.classList.remove('blur');
    }

    // reseting animation state to allow consecutive blurs
    void quote.offsetWidth;
    void author.offsetWidth;
    
    quote.classList.add('blur');
    author.classList.add('blur');

    if (quote.classList.contains('blur-land') && author.classList.contains('blur-land')){
        quote.classList.remove('blur-land');
        author.classList.remove('blur-land');
    }
}

/****************************************************
 * 
 * 
 *              CLEAN JSONP DATA FOR DISPLAY
 * 
 * 
 ****************************************************/

// take the api response object and returns the quote ready to by removing extra spaces and adding quotation marks
function quoteClean (input) {
    return '"' + input.quoteText.replace(/\s+$/, '') + '"';
}

// the the api object and check if an author is given, sets up alternate text in case missing
function authorCheck (input) {
    return input.quoteAuthor == '' ? 'Unknown' : input.quoteAuthor;
}

/****************************************************
 * 
 * 
 *              CALLBACK FUNCTION
 * 
 * 
 ****************************************************/
function grab(response){
    // once we get a response blur the existing quote and author before we append new ones and remove teh loading indicator
    genBlur(document.getElementById('quote'), document.getElementById('author'));
    loadingIndicator(document.getElementById('btn_quote'));

    document.getElementById('quote').textContent = quoteClean(response);
    document.getElementById('author').textContent = authorCheck(response);
    // update tweet button with new twitter link on api load
    document.getElementById('tweet_href').setAttribute('href', tweetPrepare(response) );
    // update source button with new link forismatic link on api load
    document.getElementById('src_href').setAttribute('href', response.quoteLink );
}

/****************************************************
 * 
 * 
 *        JSONP CALL AND APEND/REMOVE FROM HEAD
 * 
 * 
 ****************************************************/
function api(randNum){
    // add loading inidcator here
    loadingIndicator(document.getElementById('btn_quote'));
    // setting up jsonp to get random quotes
    const API = document.createElement('script');
    API.src = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=' + randNum + '&format=jsonp&lang=en&jsonp=grab';
    // appending jsonp script to head
    document.getElementsByTagName('head')[0].appendChild(API);
    // un blur random quote once loaded
    document.getElementsByTagName('head')[0].removeChild(API);
}

/****************************************************
 * 
 * 
 *              PREPARE QUOTE FOR TWEET
 * 
 * 
 ****************************************************/
function tweetPrepare(input){
    let quote = quoteClean(input),
        author = authorCheck(input),
        tweet = '';
    // if > 140 char trim to 135 - author and add '..."-'
    if ((quote.length + author.length + 1) > 139) {
        tweet = quote.slice(0,(135 - author.length)) + '..."-' + author; 
    } else {
        tweet = quote + '-' + author;
    }
    // replace spaces with '%20'
    tweet = "https://twitter.com/intent/tweet?text=" + tweet.replace(/\s/g, '%20');
    return tweet;
}