async function twitchInitalize () {
    const twitchUsers = ['freecodecamp', 'lirik', 'preachlfw'];
    const data = { users: [], streams: [] };

    for (let user of twitchUsers) {
        data.users.push(twitchAPI('users', user));
        data.streams.push(twitchAPI('streams', user));
    }

 
        console.log(await data.users.freecodecamp); // iterate and have functions called by these eventually that append them as they come in
        console.log(await data.streams.lirik);

    
}

twitchInitalize();
 
 async function twitchAPI (type, name) {
    // create headers
    const CLIENT_ID = '?client_id=jl9f26ph41bzop9hpcpdzftzg75v0xp';
    // iterate through users and make calls
  
        let response;
        // await response of fetch using API and headers
        try {
            response = await fetch(`https://api.twitch.tv/kraken/${type}/${name}${CLIENT_ID}`);
        } catch (err) {
            console.log(err);
            return;
        }

        // parse into json
        return response.json();
 }


