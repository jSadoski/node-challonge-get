const fetch = require('node-fetch');

const apiUrl = 'api.challonge.com/v1/';

async function retrieve(user, key, method) {
    const response = await fetch(
        `https://${user}:${key}@${apiUrl}${method}.json`
    );

    return await response.json();
}
