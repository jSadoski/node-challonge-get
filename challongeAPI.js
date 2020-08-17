/**
 * @file Endpoint for every GET method of Challonge API v1.
 * See https://api.challonge.com/v1 for methods and parameters.
 * @author Joe Sadoski <jdsadoski@gmail.com>
 *
 * @requires node-fetch
 * @exports Class API
 *
 * @license GPL-3.0-or-later
 */

const fetch = require('node-fetch');

const apiUrl = 'https://api.challonge.com/v1/';

exports.API = API;

/**
 * Base class for Challonge API.
 */
class API {
  /**
   * Creates an instance of API.
   *
   * @param {String} key The API key.
   * @constructs
   * @memberof API
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Gets a tournament or tournaments. Use .index() or .show()
   *
   * @returns {Tournament}
   */
  get tournaments() {
    return new Tournament(this.key);
  }

  /**
   * Gets participants of the given tournament. Use .index()) or .show()
   *
   * @returns {Participant} An object containing .index() and .show()
   */
  get participants() {
    return new Participant(this.key);
  }

  /**
   * Gets matches for a given tournament. Use .index() and .show()
   *
   * @returns {Match} An object containing .index() and .show()
   */
  get matches() {
    return new Match(this.key);
  }

  /**
   * Gets match attachments. Use .index() and .show()
   *
   * @returns {Attachment} An object containing .index() and .show()
   * @todo Create/find test tournament with attachments to test
   */
  get matchAttachments() {
    return new Attachment(this.key);
  }
}

/**
 * Base class for API Methods
 */
class APIMethod {
  /**
   * Creates an instance of APIMethod.
   * @param {String} key Your API key
   * @memberof APIMethod
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieves the API endpoint for a given method.
   *
   * @param {String} method The Challonge API method that comes after the base URL
   * @param {Map} [params=[]] The parameters to be passed to the method (passed as a query string parameter)
   * @returns {Promise} A Promise containing the response object, typically an Array of object types.
   * @memberof APIMethod
   */
  retrieve = async (method, params = []) => {
    const queryString =
      params.forEach((value, key, map) => key + '=' + value) ?? '';
    const url = `${apiUrl}${method}.json?api_key=${this.key}&${queryString}`;

    return await fetch(url, { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return `'${url}' returned: ${res.status}: ${res.statusText}`;
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };
}

/**
 * The Tournament method endpoint
 *
 * @class Tournament
 * @extends {APIMethod}
 */
class Tournament extends APIMethod {
  /**
   * Creates an instance of Tournament.
   * @param {String} key Your API key
   * @memberof Tournament
   */
  constructor(key) {
    super(key, key);
  }

  /**
   * Retrieves a set of tournaments created by the account which owns the API key.
   *
   * @param {String} state all, pending, in_progress, ended
   * @param {String} t_type	single_elimination, double_elimination, round_robin, swiss
   * @param {Date} created_after	!NOT IMPLEMENTED YET! YYYY-MM-DD
   * @param {Date} created_before	!NOT IMPLEMENTED YET! YYYY-MM-DD
   * @param {String} subdomain	A Challonge subdomain you've published tournaments to.
   * @returns {Promise} A Promise which will contain an Array of tournament objects (JSON)
   * @todo Implement created_before
   * @todo Implement created_after
   */
  index = async (
    state = null,
    t_type = null,
    created_after = null,
    created_before = null,
    subdomain = null
  ) => {
    const method = 'tournaments';
    const params = new Map();
    if (state !== null) {
      params.set('state', state);
    }
    if (t_type !== null) {
      params.set('type', t_type);
    }
    if (created_after !== null) {
      params.set('created_after', created_after);
    }
    if (created_before !== null) {
      params.set('created_before', created_before);
    }
    if (subdomain !== null) {
      params.set('subdomain', subdomain);
    }

    return await this.retrieve(method, params);
  };

  /**
   * Retrieves a tournament.
   *
   * @param {String} tournament Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim).
   * @param {boolean} [include_participants=false]	Includes an array of associated participant records
   * @param {boolean} [include_matches=false]	Includes an array of associated match records
   * @returns {Promise} A Promise which will have the tournament object (JSON)
   */
  show = async (
    tournament,
    include_participants = false,
    include_matches = false
  ) => {
    const method = `tournaments/${tournament}`;
    const params = new Map();
    if (include_participants !== null) {
      params.set('include_participants', include_participants);
    }
    if (include_matches !== null) {
      params.set('include_matches', include_matches);
    }

    const response = await this.retrieve(method);

    // Challonge API returns an anonymous object
    // containing the tournament object
    return response.tournament;
  };
}

/**
 * The Participant
 *
 * @class Participant
 * @extends {APIMethod}
 */
class Participant extends APIMethod {
  constructor(key) {
    super(key);
  }

  /**
   * Returns all the participants of the given tournament.
   *
   * @returns {Promise} A Promise which will contain an Array of participant objects (JSON)
   */
  index = async (tournament) => {
    const method = `tournaments/${tournament}/participants`;
    const response = await this.retrieve(method);
    return response;
  };

  /**
   * Returns a participant at the given ID
   *
   * @param {String} participant_id The participant's unique ID
   * @returns {Promise} A promise which will contain a participant object (JSON)
   */
  show = async (tournament, participant_id) => {
    const method = `tournaments/${tournament}/participants/${participant_id}`;
    const response = await this.retrieve(method);

    // Challonge API returns an anonymous object
    // containing the tournament object
    return response.participant;
  };
}

/**
 * The Match method endpoint
 *
 * @class Match
 * @extends {APIMethod}
 */
class Match extends APIMethod {
  constructor(key) {
    super(key);
  }

  /**
   * Returns all the matches for the given tournament.
   *
   * @returns {Promise} Will contain an Array containing
   *  match objects (JSON).
   *
   */
  index = async (tournament) => {
    const method = `tournaments/${tournament}/matches`;
    const response = await this.retrieve(method);
    return response;
  };

  /**
   * Returns a match for the given tournament and match_id
   *
   * @param {String} match_id The match's unique ID
   * @todo add include_attachments parameter
   * @returns {Promise} Will contain a match object (JSON)
   *
   */
  show = async (tournament, match_id) => {
    const method = `tournaments/${tournament}/matches/${match_id}`;
    const response = await this.retrieve(method);
    return response.match;
  };
}

/**
 * The Attachment method endpoint
 *
 * @class Attachment
 * @extends {APIMethod}
 */
class Attachment extends APIMethod {
  /**
   * Creates an instance of Attachments.
   * @param {*} key
   * @memberof Attachments
   */
  constructor(key) {
    super(key);
  }

  /**
   * Retrieve a match's attachments.
   *
   * @param {String} tournament
   * @param {String} match
   * @returns {Promise} A Promise containing an Array with attachment objects (JSON)
   */
  index = async (tournament, match) => {
    const method = `tournaments/${tournament}/matches/${match}/attachments`;
    const response = await this.retrieve(method);
    return response;
  };
  /**
   * Retrieve a match's attachments.
   *
   * @param {String} tournament Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim)
   * @param {String} attachment_id The match's unique ID
   * @returns {Promise} A Promise containing the attachment (JSON)
   */
  show = async (tournament, attachment_id) => {
    const method = `tournaments/${tournament}/matches/${match}/attachments/${attachment_id}`;
    const response = await this.retrieve(method);
    return response.attachment;
  };
}
