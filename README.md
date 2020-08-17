# challonge-get

Node.js endpoint for every Challonge API v1 GET method. See https://api.challonge.com/v1 for methods and parameters.

Currently, only authenticated (HTTPS) API requests are implemented. From [Challonge API](https://api.challonge.com/v1):

> All interactions with the API require a Challonge account with a verified email address and API key. You can generate one from your [developer settings page](https://challonge.com/settings/developer).

## Usage

Install packages. From within the project directory:

```bash
npm install
```

To use in a script, create a new API instance:

```javascript
const challonge = require('./challongeAPI');
api = new challonge.API(<api_key>)
```

Then you can access different endpoints of the API with

`api.<tournaments|participants|matches|matchAttachments>.<index()|show()>`

```javascript
async () => {
  /** Retrieve a set of tournaments created with your account. */
  const tournaments = await api.tournaments.index('all');

  /**
   * Retrieve a tournament with the
   * given Tournament ID (e.g. 10230)
   * or URL (e.g. 'single_elim' for challonge.com/single_elim)
   */
  const tournament = await api.tournaments.show('10230');

  /** Retrieve all the participants for tournament 10230 */
  const participants = await api.participants.index('10230');

  /** Retrieve a participant with ID 183240 */
  const participant = await api.participants.show(
    '10230',
    '183240'
  );

  /** Retrieve all the matches for a tournament with ID 10230 */
  const matches = await api.matches.index('10230');

  /** Retrieve a match with ID 273421*/
  const match = await api.matches.show('10230', '273421');
```

_! Match Attachments are not available at this time - further testing is required !_

Each method has an `.index()` and an `.show()` method. `.index()` returns an Array of JSON objects matching the search criteria (determined by the type of object it's called on). `.show()` returns an individual JSON object by it's search criteria, typically a unique ID.

**Note that these functions are `async`!**

See code comments or the [JSDoc](./JSDOC.md) for more details on function parameters.

### Errors

challonge-get does not handle `node-fetch` errors, it passes them up to the calling function.

## Tests

Install dev depenancies:

```bash
npm install --dev
```

Create a .credentials.json in the `./tests` folder:

```json
{
  "user": <your username>,
  "key": <your api key>
}
```

Run tests:

```bash
npm test
```

Note that there is no error handling at the moment, and Challonge (seems?) to have a rate limit (but it's not known). Calls may fail when done in rapid succession.

## Contributing

challonge-get is open for contributions. Please use the issue tracker to report any problems or make a pull request and I'll get to it as soon as I can. Thanks!
