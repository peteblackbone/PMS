var OAuth = require('oauth').OAuth

const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "rmutlPMS";
const scope = 'read,write';
const expiration = 'never';

// Be sure to include your key and secret in 🗝.env ↖️ over there.
// You can get your key and secret from Trello at: https://trello.com/app-key
const key = 'b96742cbd311d72d20ae7a96a10476f2';
const secret = 'e3dd1fdd405d39f4f031e887f5978e446e8fc29c225f7e0fb72b8233fcb344fb';

// Trello redirects the user here after authentication
const loginCallback = `http://localhost:3000/callback`;

// You should have {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets = {};

const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1")

