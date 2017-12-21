genBlur(document.getElementById('quote'), document.getElementById('author'));
api();


// function to power random quote button
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

// function called by teh API
function grab(response){
    // once we get a response blur the existing quote and author before we append new ones
    genBlur(document.getElementById('quote'), document.getElementById('author'));

    document.getElementById('quote').textContent = quoteClean(response);
    document.getElementById('author').textContent = authorCheck(response);
    // update tweet button with new twitter link on api load
    document.getElementById('tweet_href').setAttribute('href', tweetPrepare(response) );
    // update source button with new link forismatic link on api load
    document.getElementById('src_href').setAttribute('href', response.quoteLink );
}

// injecting the ranom number into the jsonp link to obtain random quote
function api(randNum){
    // setting up jsonp to get random quotes
    const API = document.createElement('script');
    API.src = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=' + randNum + '&format=jsonp&lang=en&jsonp=grab';
    // appending jsonp script to head
    document.getElementsByTagName('head')[0].appendChild(API);
    // un blur random quote once loaded
    document.getElementsByTagName('head')[0].removeChild(API);
}

// prepare quote for tweet
function tweetPrepare(input){
    let quote = quoteClean(input);
    let author = authorCheck(input);
    let tweet = '';
    // if > 140 char trim to 135 - author and add '..."-'
    if ((quote.length + author.length + 1) > 139) {
        tweet = quote.slice(0,(135 - author.length)) + '..."-' + author; 
    } else {
        tweet = quote + '-' + author;
    }
    // replace spaces with '%'
    // concat to end of link "https://twitter.com/intent/tweet?text=Hello%20world"
    tweet = "https://twitter.com/intent/tweet?text=" + tweet.replace(/\s/g, '%20');
    return tweet;
}

// blur the quote and author when adding a new quote
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

// take the api response object and returns the quote ready to by removing extra spaces and adding quotation marks
function quoteClean (input) {
    return '"' + input.quoteText.replace(/\s+$/, '') + '"';
}

// the the api object and check if an author is given, sets up alternate text in case missing
function authorCheck (input) {
    return input.quoteAuthor == '' ? 'Unknown' : input.quoteAuthor;
}