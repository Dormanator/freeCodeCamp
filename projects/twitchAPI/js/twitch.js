twitchInitalize();

// runs on page-load to start API calls and eliminate polluting the global scope
function twitchInitalize () {
    // user array to get detail and stream status of
    const twitchUsers = ['freecodecamp', 'lirik', 'preachlfw', 'SyntaxSe7en']; //  'dunkstream',
    // call async Twitch API fetch function to get user information and then stream status
    getTwitchAPI('users', twitchUsers);
    getTwitchAPI('streams', twitchUsers);
}

// function to fetch specified user data in mass promise
async function getTwitchAPI (type, names) {
    // store API verification ID
    const CLIENT_ID = '?client_id=jl9f26ph41bzop9hpcpdzftzg75v0xp';
    // create a promise that resolves once all user API queries are resolved
    // in teh promise we manipulate the local array of users via map to hold the return JSON for each user
    return await Promise.all(names.map(async (name) => {
        // await a fetch response and store it for each user
        const response = await fetch(`https://api.twitch.tv/kraken/${type}/${name}${CLIENT_ID}`);
        // once response is recieved check for that it's valid, if so parse to JSON and return as new array value
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        //otherwise throw error
        throw new Error( 'An error was encountered: ' + results.statusText );
        // once the promise has been resolved fully, pass the manipulated local array to the proper function so it can be appended to the site
    })).then( data => {
        if (type === 'users') {
            twitchUserAppend(data);
        } else {
            twitchStatusAppend(data);
        }
        // if any errors occured print them to console
    }).catch( err => {
        console.log(err); 
    });
}

// function to append API results to site
function twitchUserAppend(data) {
    // get elements associated with proper classes
    let nameSection = document.getElementsByClassName('name-section');
    let infoSection = document.getElementsByClassName('bottom-screen-info');
    let externalLinks = document.getElementsByClassName('bottom-screen-btn');

    // iterate through user data and append to proper elements
    for (let i = 0; i < data.length; i++) {
        nameSection[i].textContent = data[i].name;
        infoSection[i].textContent = data[i].bio;
        externalLinks[i].innerHTML = `<a href="https://twitch.tv/${data[i].name}" target="_blank"><i class="fa fa-external-link fa-2x" aria-hidden="true"></i></a>`;
    }
}

function twitchStatusAppend(data) {
    // get elements associated with proper classes

    // get size of screen sections so set image size of live preview

    // iterate through user status data
    for (let i = 0; i < data.length; i++) {
        // if users are offline set element value
        if (data[i].stream === null) {
            console.log('Offline');
        // else set proper element online values
        } else {
            console.log(data[i].stream.stream_type);
            console.log(data[i].stream.game);
            // set as background image with proper size via style
            console.log(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${data[i].stream.channel.name}-{width}x{height}.jpg`);
        }
    }
}

/* DO WITH CSS INSTEAD???

// function to capitalize appended test for style
function capitalizeFirst(word) {
    let letter = word.charAt(0).toUpperCase();

    return letter + word.slice(1)
}

console.log(capitalizeFirst('test'));

*/