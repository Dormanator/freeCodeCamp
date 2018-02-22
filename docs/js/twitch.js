/****************************************************
 * 
 * 
 *        CALL API WHEN TWITCH SECTION IS OPENED
 * 
 * 
 ****************************************************/
// call twitch api on section click to ensure the screen is being displayed and the width and height of teh sections can be queried for teh bg image
document.getElementById('twitch_tv').addEventListener( 'click', () => {
    let twitchContent = document.getElementById('twitch_tv_content');
    // check to make sure api is only called when displaying section not closing it
    // don't want to max out our 30 API calls per minute or try to get elements not being displayed
    if (twitchContent.style.display === 'none') {
        twitchInitalize();
        // have teh api call reoccure every 60 second to check online status and update bg images
        setInterval( () => {
            twitchInitalize();
        }, 60000);
    }
});

/****************************************************
 * 
 * 
 *              PAGE LOAD FUNCTION
 * 
 * 
 ****************************************************/
function twitchInitalize () {
    // indicate js is working
    let nameSection = document.getElementsByClassName('name-section');
    for (let i = 0, x = nameSection.length; i < x; i++) {
        nameSection[i].textContent = 'initalizing...'
    }

    // user array to get detail and stream status of
    const twitchUsers = ['freecodecamp', 'lirik', 'TrumpSC', 'preachlfw'];
    // call async Twitch API fetch function to get user information and then stream status
    getTwitchAPI('users', twitchUsers);
    getTwitchAPI('streams', twitchUsers);
}

/****************************************************
 * 
 * 
 *              ASYNC FETCH FUNCTION
 * 
 * 
 ****************************************************/
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

/****************************************************
 * 
 * 
 *              APPEND USER DATA
 * 
 * 
 ****************************************************/
function twitchUserAppend(data) {
    // get elements associated with proper classes
    let nameSection = document.getElementsByClassName('name-section'),
        infoSection = document.getElementsByClassName('bottom-screen-info'),
        externalLinks = document.querySelectorAll('.bottom-screen-btn a'),
        screenSection = document.getElementsByClassName('screen-section');

    // iterate through user data and append to proper elements
    for (let i = 0, x = data.length; i < x; i++) {
        nameSection[i].textContent = data[i].name;
        infoSection[i].textContent = data[i].bio;
        externalLinks[i].href = `https://twitch.tv/${data[i].name}`;

        // if using mobile version set as background image as users logo
        if (document.documentElement.clientWidth <= 740) {
            screenSection[i].style.backgroundImage = `url('${data[i].logo}')`;
        }
    }
}

/****************************************************
 * 
 * 
 *              APPEND STATUS DATA
 * 
 * 
 ****************************************************/
function twitchStatusAppend(data) {
    // get elements associated with proper classes
    let statusSection = document.getElementsByClassName('status-section'),
        gameSection = document.getElementsByClassName('game-section'),
        linkIcon = document.getElementsByClassName('twitch-link-icon'),
        // getscreen section to calc H x W and set bg image
        screenSection = document.getElementsByClassName('screen-section');

    // iterate through user status data
    for (let i = 0, x = data.length; i < x; i++) {
    
        // if users are offline set element value
        if (data[i].stream === null) {
            // set offline text and make sure live icon link is not displayed
            statusSection[i].textContent = 'Offline';
            linkIcon[i].className = 'fa fa-external-link fa-2x twitch-link-icon';

        // else set proper element online values
        } else {
            // calculate H x W for screen bg images
            let height = screenSection[i].clientHeight,
                width = screenSection[i].clientWidth;

            statusSection[i].innerHTML = `<div class="twitch-live"></div>${data[i].stream.stream_type}`;
            // get status-section child and add twitch-live style
            gameSection[i].textContent = data[i].stream.game;
            linkIcon[i].className = 'fa fa-eye fa-2x twitch-link-icon';
            // if not using mobile version set as background image with proper size based on screen-section size 
            if (document.documentElement.clientWidth > 740) {
                screenSection[i].style.backgroundImage = `url('https://static-cdn.jtvnw.net/previews-ttv/live_user_${data[i].stream.channel.name}-${width}x${height}.jpg')`;
            }
        }
    }
}